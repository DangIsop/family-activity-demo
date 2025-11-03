const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

/**
 * Format venues data for Claude prompt
 */
function formatVenuesForPrompt(venues) {
    if (!venues || venues.length === 0) {
        return "No specific venues found. Please provide general activity recommendations for this location.";
    }

    return venues.map((venue, index) => {
        let venueInfo = `${index + 1}. ${venue.name}
   - Type: ${venue.type}
   - Address: ${venue.address}
   - Rating: ${venue.rating}/5 (${venue.userRatingsTotal} reviews)
   - Distance: ${venue.distance} miles`;

        // Add opening hours if available
        if (venue.openingHours) {
            if (venue.openingHours.openNow !== undefined) {
                venueInfo += `\n   - Currently: ${venue.openingHours.openNow ? 'OPEN' : 'CLOSED'}`;
            }
            if (venue.openingHours.weekdayText && venue.openingHours.weekdayText.length > 0) {
                venueInfo += `\n   - Hours: ${venue.openingHours.weekdayText.join(', ')}`;
            }
        }

        return venueInfo;
    }).join('\n\n');
}

/**
 * Call Claude API to get activity recommendations
 */
async function getActivityRecommendations(userInputs, venues) {
    try {
        const venuesData = formatVenuesForPrompt(venues);

        const prompt = `You are a helpful family activity advisor. Based on the information provided below and the venue data from Google Places, recommend exactly 5 family-friendly activities.

USER PREFERENCES:
- City/Location: ${userInputs.city}
- Children's Ages: ${userInputs.ages}
- Availability: ${userInputs.availability}
- Maximum Distance: ${userInputs.distance} miles
- Other Preferences: ${userInputs.preferences || 'None specified'}

AVAILABLE VENUES:
${venuesData}

INSTRUCTIONS:
1. Analyze the venues and select the 5 best options that match the family's needs
2. Consider the children's ages when selecting appropriate activities
3. Consider the availability timeframe (e.g., weekend vs weekday, morning vs afternoon)
4. USE THE ACTUAL OPENING HOURS DATA when available - check if venues are open during the user's availability
5. Prioritize venues within the specified distance
6. Factor in any additional preferences mentioned

FORMAT YOUR RESPONSE EXACTLY AS FOLLOWS (use this exact structure):

Each activity should be formatted as a JSON object with these fields:
- emoji: a single emoji that represents the activity
- title: the activity/venue name (do NOT include times in the title)
- description: 2-4 sentences about the activity
- location: the venue name or area
- distance: distance in format "X miles" or "X.X miles"
- time: specific time information if known (e.g., "10:00 AM - 5:00 PM", "All Day", "Closes at 6:00 PM"). Use actual opening hours data when available. If no specific hours known, use "Hours vary" or "Check schedule"

Return ONLY a valid JSON array with exactly 5 activities. Do not include any other text before or after the JSON array.

Example format:
[
  {
    "emoji": "🌳",
    "title": "Golden Gate Park",
    "description": "Perfect for your kids to run around and explore nature. The park offers playgrounds, gardens, and plenty of open space.",
    "location": "Golden Gate Park",
    "distance": "2.5 miles",
    "time": "Open 24 hours"
  }
]`;

        const message = await anthropic.messages.create({
            model: 'claude-3-opus-20240229',
            max_tokens: 2000,
            messages: [{
                role: 'user',
                content: prompt
            }]
        });

        // Extract the response text
        const responseText = message.content[0].text;

        // Parse the JSON response
        let activities;
        try {
            activities = JSON.parse(responseText);
        } catch (parseError) {
            // If JSON parsing fails, try to extract JSON from the response
            const jsonMatch = responseText.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                activities = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('Failed to parse Claude response as JSON');
            }
        }

        // Validate we have 5 activities
        if (!Array.isArray(activities) || activities.length === 0) {
            throw new Error('Claude did not return valid activities array');
        }

        // Ensure each activity has required fields
        activities = activities.slice(0, 5).map(activity => ({
            emoji: activity.emoji || '🎯',
            title: activity.title || 'Activity',
            description: activity.description || 'No description available',
            location: activity.location || 'Location not specified',
            distance: activity.distance || 'Distance unknown',
            time: activity.time || 'Hours vary'
        }));

        return activities;
    } catch (error) {
        console.error('Error calling Claude API:', error.message);
        throw error;
    }
}

module.exports = {
    getActivityRecommendations
};
