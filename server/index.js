require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { searchFamilyVenues } = require('./places');
const { getActivityRecommendations } = require('./claude');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// API endpoint for activity search
app.post('/api/search', async (req, res) => {
    try {
        const { city, ages, availability, distance, preferences } = req.body;

        // Validate required fields
        if (!city || !ages || !availability || !distance) {
            return res.status(400).json({
                error: 'Missing required fields. Please provide city, ages, availability, and distance.'
            });
        }

        console.log(`🔍 Searching for activities in ${city} within ${distance} miles...`);

        // Step 1: Search for venues using Google Places API
        const venues = await searchFamilyVenues(city, parseInt(distance));
        console.log(`✅ Found ${venues.length} venues from Google Places`);

        // Step 2: Get recommendations from Claude
        const activities = await getActivityRecommendations({
            city,
            ages,
            availability,
            distance,
            preferences
        }, venues);
        console.log(`✅ Generated ${activities.length} recommendations from Claude`);

        // Return the activities
        res.json({
            success: true,
            activities
        });
    } catch (error) {
        console.error('❌ Error in /api/search:', error.message);
        res.status(500).json({
            error: 'Failed to find activities. Please try again.',
            details: error.message
        });
    }
});

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Family Activity Finder running at http://localhost:${PORT}`);
    console.log(`📂 Serving files from: ${path.join(__dirname, '../public')}`);
});
