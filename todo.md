# Milestone 1: UI Setup with Dummy Data ✅ COMPLETED

## Project Setup ✅
- [x] Create project folder structure
  - [x] `/public` folder for frontend files
  - [x] `/public/css` for stylesheets
  - [x] `/public/js` for JavaScript files
  - [x] `/server` folder for backend (prepare for Milestone 2)
- [x] Create `package.json` for project dependencies
- [x] Create `.gitignore` file
- [x] Create `.env.example` for API key templates

## HTML Structure ✅
- [x] Create `index.html` in `/public` folder
- [x] Add basic HTML boilerplate (doctype, head, body)
- [x] Create page header/title section (with logo and New Search button)
- [x] Build form with all input fields:
  - [x] City/Location input (text field)
  - [x] Kids ages input (text field with placeholder examples)
  - [x] Availability input (text field)
  - [x] Distance range input (slider instead of number field)
  - [x] Other preferences input (textarea)
  - [x] Submit button + Clear button
- [x] Create results container (initially hidden)
- [x] Add loading indicator element (initially hidden)
- [x] Add empty state for before first search

## CSS Styling ✅
- [x] Create `style.css` in `/public/css` folder
- [x] Link CSS file to HTML
- [x] Set up side-by-side layout (form left, results right)
- [x] Style the form:
  - [x] Form container with padding and max-width
  - [x] Input field styling (borders, padding, focus states)
  - [x] Label styling with emoji icons
  - [x] Submit and Clear button styling (color, hover effects)
  - [x] Distance slider with custom styling
- [x] Style the results section:
  - [x] Activity card layout with numbered badges
  - [x] Title styling (bold, appropriate size)
  - [x] Description text styling
  - [x] Location and distance metadata
  - [x] Spacing between cards
  - [x] "SORTED BY RELEVANCE" badge
- [x] Add responsive design:
  - [x] Mobile breakpoint (max-width: 768px)
  - [x] Adjust form width and padding for mobile
  - [x] Stack elements vertically on small screens
- [x] Style loading indicator (spinner)

## JavaScript Functionality ✅
- [x] Create `app.js` in `/public/js` folder
- [x] Link JavaScript file to HTML
- [x] Add form submission event listener
- [x] Prevent default form submission behavior
- [x] Create function to show loading state
- [x] Create function to hide loading state
- [x] Create dummy data array with 5 sample activities:
  - [x] Each activity has: emoji, title, description, location, distance
  - [x] Make descriptions 2-4 sentences each
  - [x] Use variety of activity types (transit, festival, museum, dance, hiking)
- [x] Create function to display results:
  - [x] Clear previous results
  - [x] Loop through activities
  - [x] Create HTML elements for each activity with numbered badges
  - [x] Insert emoji, title, description, and metadata
  - [x] Append to results container
- [x] Wire up form submission to display dummy results:
  - [x] Show loading indicator
  - [x] Simulate API delay (setTimeout 2 seconds)
  - [x] Display dummy activities
  - [x] Hide loading indicator
- [x] Add distance slider interactivity
- [x] Add New Search button functionality
- [x] Add Clear button functionality

## Testing ✅
- [x] Test form submission shows dummy results
- [x] Test loading indicator appears and disappears
- [x] Test all form fields accept input
- [x] Test responsive design on mobile size (resize browser)
- [x] Test responsive design on tablet size
- [x] Test responsive design on desktop
- [x] Verify text is readable (font size, contrast)
- [x] Test with different dummy data to ensure layout works
- [x] Check for any console errors in browser dev tools

## Polish ✅
- [x] Ensure consistent spacing throughout
- [x] Check emoji display across browsers
- [x] Add placeholder text to all input fields with examples
- [x] Add basic form validation (required fields)
- [x] Verify button cursor changes on hover
- [x] Add hover effects to activity cards

## Documentation
- [ ] Add comments to JavaScript code
- [ ] Add comments to CSS for major sections
- [ ] Take screenshot of completed UI for reference

---

**Completion Criteria:** ✅ When form is submitted, 5 dummy activity recommendations appear with emoji, numbered badges, titles, descriptions, and location/distance metadata. UI works on mobile and desktop with side-by-side layout.

---

# Milestone 2: API Integration

## Backend Setup
- [ ] Install required dependencies:
  - [ ] `@anthropic-ai/sdk` for Claude API
  - [ ] `axios` for Google Places API requests
  - [ ] `dotenv` for environment variables
  - [ ] `cors` for cross-origin requests
- [ ] Create `.env` file with API keys
- [ ] Update `server/index.js` to load environment variables

## Google Places API Integration
- [ ] Create `server/places.js` helper module
- [ ] Implement function to search for family-friendly venues:
  - [ ] Convert city to lat/lng coordinates (geocoding)
  - [ ] Search for relevant place types (parks, museums, zoos, libraries, etc.)
  - [ ] Filter results by distance radius
  - [ ] Return formatted venue data (name, type, address, rating, distance)
- [ ] Handle API errors gracefully
- [ ] Test with various cities and distances

## Claude API Integration
- [ ] Create `server/claude.js` helper module
- [ ] Implement function to call Claude Messages API:
  - [ ] Load prompt template from `prompt.md`
  - [ ] Interpolate user inputs (city, ages, availability, distance, preferences)
  - [ ] Format Google Places venue data
  - [ ] Send to Claude API
  - [ ] Parse and return formatted recommendations
- [ ] Handle API errors gracefully
- [ ] Test with various user inputs

## Backend API Endpoint
- [ ] Create POST `/api/search` endpoint in `server/index.js`
- [ ] Parse request body (user form data)
- [ ] Call Google Places helper to get venues
- [ ] Call Claude helper to get recommendations
- [ ] Return JSON response with 5 activities
- [ ] Add error handling and logging
- [ ] Test endpoint with Postman or curl

## Frontend Integration
- [ ] Update `public/js/app.js` to call backend API
- [ ] Replace dummy data with real API call
- [ ] Handle loading state during API calls
- [ ] Display real recommendations from Claude
- [ ] Handle errors and display user-friendly messages
- [ ] Test end-to-end flow with real data

## Error Handling & Edge Cases
- [ ] Handle case when no venues found
- [ ] Handle case when API rate limits are hit
- [ ] Handle network errors
- [ ] Add user-friendly error messages
- [ ] Add retry logic if needed
- [ ] Validate user inputs before API calls

## Testing
- [ ] Test with multiple cities (major and small)
- [ ] Test with different kid ages
- [ ] Test with various availability inputs
- [ ] Test with different distance ranges
- [ ] Test with and without preferences
- [ ] Verify Claude returns properly formatted results
- [ ] Test error scenarios (invalid city, API down, etc.)
- [ ] Check browser console for errors
- [ ] Verify loading states work correctly

## Documentation
- [ ] Update README with API setup instructions
- [ ] Document environment variables needed
- [ ] Add instructions for getting API keys
- [ ] Document the `/api/search` endpoint

---

**Completion Criteria:** Users can enter their preferences, and the app queries Google Places API for venues, then uses Claude to intelligently recommend 5 family-friendly activities with real data.
