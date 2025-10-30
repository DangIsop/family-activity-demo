# Claude API Prompt for Activity Recommendations

## Prompt Template

```
You are a helpful family activity advisor. Based on the information provided below and the venue data from Google Places, recommend exactly 5 family-friendly activities.

USER PREFERENCES:
- City/Location: {{CITY}}
- Children's Ages: {{KIDS_AGES}}
- Availability: {{AVAILABILITY}}
- Maximum Distance: {{MILES_RANGE}} miles
- Other Preferences: {{OTHER_PREFERENCES}}

AVAILABLE VENUES:
{{VENUES_DATA}}

INSTRUCTIONS:
1. Analyze the venues and select the 5 best options that match the family's needs
2. Consider the children's ages when selecting appropriate activities
3. Consider the availability timeframe (e.g., weekend vs weekday, morning vs afternoon)
4. Prioritize venues within the specified distance
5. Factor in any additional preferences mentioned

FORMAT YOUR RESPONSE EXACTLY AS FOLLOWS:

**[Emoji] [Activity Title]**
[2-4 sentence description including what makes it great for this family, what kids can do there, and any relevant practical details like hours or cost if known]

**[Emoji] [Activity Title]**
[2-4 sentence description including what makes it great for this family, what kids can do there, and any relevant practical details like hours or cost if known]

**[Emoji] [Activity Title]**
[2-4 sentence description including what makes it great for this family, what kids can do there, and any relevant practical details like hours or cost if known]

**[Emoji] [Activity Title]**
[2-4 sentence description including what makes it great for this family, what kids can do there, and any relevant practical details like hours or cost if known]

**[Emoji] [Activity Title]**
[2-4 sentence description including what makes it great for this family, what kids can do there, and any relevant practical details like hours or cost if known]

Choose emojis that match each activity (e.g., 🎨 for art museums, 🌳 for parks, 🦁 for zoos, 🎢 for amusement parks, etc.)
```

## Input Fields Reference

### Required Fields
- **CITY**: User's city/location (e.g., "San Francisco, CA", "Austin, Texas")
- **KIDS_AGES**: Children's ages (e.g., "3 and 6", "8, 10, and 12", "5")
- **AVAILABILITY**: When they're free (e.g., "Saturday afternoon", "weekday evenings", "Sunday mornings")
- **MILES_RANGE**: Maximum driving distance (e.g., "10", "25", "5")

### Optional Fields
- **OTHER_PREFERENCES**: Additional preferences or interests (e.g., "outdoor activities", "educational", "free or low-cost", "loves dinosaurs")

## Venues Data Format

The `{{VENUES_DATA}}` will be populated with results from Google Places API, formatted as:

```
1. [Venue Name]
   - Type: [Place type]
   - Address: [Address]
   - Rating: [Rating]
   - Distance: [Distance from center]

2. [Venue Name]
   - Type: [Place type]
   - Address: [Address]
   - Rating: [Rating]
   - Distance: [Distance from center]

[... more venues ...]
```

## Example Usage

### Input Example:
- City: "Seattle, WA"
- Kids Ages: "4 and 7"
- Availability: "Saturday afternoon"
- Miles Range: "15"
- Other Preferences: "outdoor activities, not too expensive"

### Expected Output Format:
```
**🌲 Discovery Park Loop Trail**
Perfect for your 4 and 7-year-old on a Saturday afternoon! This easy 2.8-mile loop offers beach access, lighthouse views, and plenty of spots for kids to explore nature. The trail is stroller-friendly for when little legs get tired, and parking is free.

**🎨 Seattle Children's Museum**
An indoor wonderland that's ideal for both age groups with hands-on exhibits about culture, art, and science. Your kids can build in the construction zone, play in the mini neighborhood, and explore the global village. Admission is $14/child with adults free.

**🦆 Green Lake Park**
A local favorite with a flat 2.8-mile path perfect for biking or walking, plus two playgrounds designed for different age groups. Your kids will love feeding the ducks, playing on the sandy beach area, and the park has clean restrooms and snack vendors nearby.

**🚂 Woodland Park Zoo**
While it's a classic, the zoo's new Nature Play Area is perfect for your active kids to climb, dig, and explore after seeing the animals. The Zoomazium indoor play space is great if weather turns, and at this age they'll especially love the penguin feeding time at 2:30pm on Saturdays.

**🏃 Magnuson Park Off-Leash Dog Area & Playground**
A unique combo spot where kids can watch dogs play in one of Seattle's largest off-leash areas, then burn energy at the nearby playground and climbing rocks. It's completely free, has picnic areas, and the open fields are perfect for bringing a soccer ball or frisbee.
```

## Notes for Implementation

1. **API Call Structure**: Send this prompt to Claude Messages API with the user's form data interpolated
2. **Venues Data**: First query Google Places API for family-friendly venues, then format and insert into the prompt
3. **Error Handling**: If no venues found, ask Claude to suggest general activity types for that location
4. **Response Parsing**: Claude will return markdown-formatted text that can be displayed directly in the frontend
