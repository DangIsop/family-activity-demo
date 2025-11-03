const axios = require('axios');

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GEOCODING_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const PLACES_NEARBY_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const PLACE_DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

/**
 * Convert city name to latitude/longitude coordinates
 */
async function geocodeCity(city) {
    try {
        const response = await axios.get(GEOCODING_URL, {
            params: {
                address: city,
                key: GOOGLE_PLACES_API_KEY
            }
        });

        // Log the API status for debugging
        console.log(`📍 Geocoding API status for "${city}": ${response.data.status}`);

        // Check Google API status
        if (response.data.status === 'OK' && response.data.results && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            console.log(`✅ Found coordinates: ${location.lat}, ${location.lng}`);
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            // Handle different error statuses
            let errorMessage;
            switch (response.data.status) {
                case 'ZERO_RESULTS':
                    errorMessage = `No location found for "${city}". Try adding country (e.g., "Dublin, Ireland")`;
                    break;
                case 'REQUEST_DENIED':
                    errorMessage = `Google API access denied. Error: ${response.data.error_message || 'Check if Geocoding API is enabled and API key is valid'}`;
                    break;
                case 'INVALID_REQUEST':
                    errorMessage = `Invalid request for "${city}". Please check the city name.`;
                    break;
                case 'OVER_QUERY_LIMIT':
                    errorMessage = `Google API rate limit exceeded. Please try again later.`;
                    break;
                default:
                    errorMessage = `Could not geocode "${city}". Status: ${response.data.status}`;
            }

            if (response.data.error_message) {
                console.error(`❌ Google API Error: ${response.data.error_message}`);
            }

            throw new Error(errorMessage);
        }
    } catch (error) {
        // If it's an axios error, log more details
        if (error.response) {
            console.error('❌ Geocoding HTTP error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('❌ Geocoding network error: No response received');
        }

        console.error('❌ Geocoding error:', error.message);
        throw error;
    }
}

/**
 * Search for family-friendly venues near a location
 */
async function searchFamilyVenues(city, distanceMiles) {
    try {
        // Convert city to coordinates
        const coordinates = await geocodeCity(city);

        // Convert miles to meters (Google Places uses meters)
        const radiusMeters = Math.round(distanceMiles * 1609.34);

        // Family-friendly place types
        const placeTypes = [
            'park',
            'museum',
            'zoo',
            'aquarium',
            'amusement_park',
            'library',
            'tourist_attraction'
        ];

        const allVenues = [];

        // Search for each place type
        for (const type of placeTypes) {
            try {
                const response = await axios.get(PLACES_NEARBY_URL, {
                    params: {
                        location: `${coordinates.lat},${coordinates.lng}`,
                        radius: radiusMeters,
                        type: type,
                        key: GOOGLE_PLACES_API_KEY,
                        fields: 'opening_hours'
                    }
                });

                if (response.data.results) {
                    // Map results to our format
                    const venues = response.data.results.slice(0, 5).map(place => ({
                        name: place.name,
                        type: type,
                        address: place.vicinity || 'Address not available',
                        rating: place.rating || 'No rating',
                        userRatingsTotal: place.user_ratings_total || 0,
                        location: place.geometry.location,
                        distance: calculateDistance(
                            coordinates.lat,
                            coordinates.lng,
                            place.geometry.location.lat,
                            place.geometry.location.lng
                        ),
                        openingHours: place.opening_hours ? {
                            openNow: place.opening_hours.open_now,
                            weekdayText: place.opening_hours.weekday_text || []
                        } : null
                    }));

                    allVenues.push(...venues);
                }
            } catch (error) {
                console.error(`Error searching for ${type}:`, error.message);
                // Continue with other types even if one fails
            }
        }

        // Sort by rating and distance, then return top results
        allVenues.sort((a, b) => {
            // Prioritize higher ratings
            if (b.rating !== a.rating) {
                return (b.rating || 0) - (a.rating || 0);
            }
            // Then by distance (closer is better)
            return a.distance - b.distance;
        });

        // Return top 20 venues for Claude to analyze
        return allVenues.slice(0, 20);
    } catch (error) {
        console.error('Error searching venues:', error.message);
        throw error;
    }
}

/**
 * Calculate distance between two coordinates in miles using Haversine formula
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3959; // Earth's radius in miles
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}

module.exports = {
    searchFamilyVenues
};
