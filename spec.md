# Family Activity Finder - Specification

## Overview
A web application that helps parents discover local family-friendly activities based on their preferences and availability.

## Requirements

### User Inputs
1. City/Location
2. Children's ages (multiple ages supported)
3. Availability (e.g., "Saturday afternoon", "weekday evenings")
4. Maximum driving distance (in miles)
5. Additional preferences (optional text field for specific interests)

### Output
- 5 activity recommendations
- Each recommendation includes:
  - Bold title
  - Relevant emoji
  - 2-4 sentence description
  - Basic details (location, type of activity)

## Tech Stack

### Frontend
- **HTML** - Form structure
- **CSS** - Styling and layout
- **JavaScript** - Form handling and API communication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web server framework

### APIs
- **Claude Messages API** - Intelligent activity analysis and recommendation generation
- **Google Places API** - Activity and venue discovery
  - Documentation: https://developers.google.com/maps/documentation/places/web-service/op-overview

## Design Guidelines

### Principles
- **Simple and clean** - Minimal UI, easy to scan
- **Mobile-friendly** - Responsive design for on-the-go parents
- **Fast** - Quick form submission and results

### UI Components
- Single-page layout
- Clear form with labeled inputs
- Loading indicator while searching
- Results displayed as cards with clear hierarchy

### Visual Style
- Family-friendly color palette (warm, inviting)
- Readable fonts (16px+ body text)
- Adequate spacing between elements
- Emoji for visual interest without clutter

## Milestones

### Milestone 1: UI Setup with Dummy Data
**Goal:** Create working frontend with static demo results

- [ ] Create project structure (folders for frontend/backend)
- [ ] Build HTML form with all 5 input fields
- [ ] Style form with CSS (responsive, clean design)
- [ ] Create results display area
- [ ] Generate 5 dummy activity recommendations (hardcoded)
- [ ] Add JavaScript to handle form submission and display dummy results
- [ ] Test responsive design on mobile and desktop

**Deliverable:** Functional UI that displays sample activities when form is submitted

### Milestone 2: API Integration
**Goal:** Connect to Claude and Google Places APIs for real recommendations

- [ ] Set up Express backend server
- [ ] Create API endpoint to receive form data from frontend
- [ ] Integrate Google Places API:
  - Search for family-friendly venues based on location and distance
  - Filter by relevant place types (parks, museums, playgrounds, etc.)
- [ ] Integrate Claude Messages API:
  - Send venue data + user preferences to Claude
  - Prompt Claude to analyze and select best 5 activities
  - Request formatted output (bold titles, emoji, descriptions)
- [ ] Connect frontend to backend endpoint
- [ ] Handle loading states and errors gracefully
- [ ] Test with various inputs and locations

**Deliverable:** Fully functional app generating real, personalized activity recommendations

### Milestone 3: Polish and Deployment
**Goal:** Production-ready application

- [ ] Add environment variable configuration for API keys
- [ ] Improve error handling and user feedback
- [ ] Add input validation
- [ ] Optimize API usage (caching if needed)
- [ ] Final UI polish and testing
- [ ] Create README with setup instructions
- [ ] Deploy to hosting platform (Vercel, Railway, or similar)

**Deliverable:** Live, deployed application ready for users

## API Requirements

### API Keys Needed
1. **Anthropic API Key** - For Claude Messages API
   - Sign up at: https://console.anthropic.com/
2. **Google Places API Key** - For venue/activity search
   - Enable at: https://console.cloud.google.com/

### Environment Variables
```
ANTHROPIC_API_KEY=your_claude_api_key
GOOGLE_PLACES_API_KEY=your_google_api_key
PORT=3000
```

## Future Enhancements (Post-Launch)
- Save favorite activities
- Share recommendations via link
- Filter by budget/cost
- Weather-aware suggestions
- User accounts and history
