// Dummy activity data for Milestone 1 - matching reference design
const dummyActivities = [
    {
        emoji: '🚃',
        title: 'Muni Heritage Weekend - Sunday 10am-4pm',
        description: 'A special event where families can ride vintage transit vehicles that are rarely seen on San Francisco streets, including vintage buses and the Blackpool Boat Tram. All rides on these special streetcars are FREE all weekend.',
        location: 'San Francisco Railway Museum',
        distance: '0.5 miles'
    },
    {
        emoji: '🇬🇷',
        title: 'Greek Food Festival - Sunday 11am-8pm',
        description: 'The annual Greek Food Festival features delicious traditional food like Spanakopita and Moussaka, plus desserts and Greek wine. Visitors can enjoy classic Zorba music, watch award-winning folk dance groups perform, and browse unique gifts from local vendors.',
        location: 'Mission District',
        distance: '1.2 miles'
    },
    {
        emoji: '🎨',
        title: 'Sunday Funnies Exhibit - Sunday 10am-5pm',
        description: 'The Cartoon Art Museum\'s 40th anniversary showcase features classic comic strips from the dawn of the comics medium to the present day, including works from legendary cartoonists like Charles M. Schulz (Peanuts) and contemporary classics like Phoebe and Her Unicorn.',
        location: 'Cartoon Art Museum',
        distance: '2 miles'
    },
    {
        emoji: '💃',
        title: 'Lindy in the Park Dance Party - Sunday 11am-2pm',
        description: 'A weekly free swing dance event near the de Young Museum when the streets of Golden Gate Park are closed to traffic. Get ready to swing in Golden Gate Park every sunny Sunday at this family-friendly dance gathering.',
        location: 'Golden Gate Park',
        distance: '3.5 miles'
    },
    {
        emoji: '🌲',
        title: 'Presidio Trails Family Hike - All Day',
        description: 'Explore the beautiful Presidio trails perfect for families with kids. Easy to moderate paths wind through forests and along coastal bluffs with stunning views of the Golden Gate Bridge. Free parking and visitor center with restrooms and picnic areas available.',
        location: 'Presidio National Park',
        distance: '4.8 miles'
    }
];

// Get DOM elements
const form = document.getElementById('activityForm');
const loadingSection = document.getElementById('loading');
const resultsSection = document.getElementById('results');
const activitiesList = document.getElementById('activitiesList');
const emptyState = document.getElementById('emptyState');
const newSearchBtn = document.getElementById('newSearchBtn');
const clearBtn = document.getElementById('clearBtn');
const distanceSlider = document.getElementById('distance');
const distanceValue = document.getElementById('distanceValue');

// Distance slider handler
distanceSlider.addEventListener('input', function(e) {
    distanceValue.textContent = e.target.value;
});

// Form submission handler
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Hide empty state and show loading
    emptyState.classList.add('hidden');
    loadingSection.classList.remove('hidden');
    resultsSection.classList.add('hidden');

    // Show new search button in header
    newSearchBtn.classList.remove('hidden');

    // Get form data
    const formData = {
        city: document.getElementById('city').value,
        ages: document.getElementById('ages').value,
        availability: document.getElementById('availability').value,
        distance: document.getElementById('distance').value,
        preferences: document.getElementById('preferences').value
    };

    try {
        // Call backend API
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch activities');
        }

        const data = await response.json();

        if (data.success && data.activities) {
            displayResults(data.activities);
        } else {
            throw new Error(data.error || 'No activities found');
        }
    } catch (error) {
        console.error('Error:', error);
        loadingSection.classList.add('hidden');
        alert('Sorry, we could not find activities. Please try again.');
        emptyState.classList.remove('hidden');
    }
});

// Display results function
function displayResults(activities) {
    // Hide loading
    loadingSection.classList.add('hidden');

    // Clear previous results
    activitiesList.innerHTML = '';

    // Create activity cards with numbered badges
    activities.forEach(function(activity, index) {
        const card = document.createElement('div');
        card.className = 'activity-card';

        // Number badge
        const numberBadge = document.createElement('div');
        numberBadge.className = 'activity-number';
        numberBadge.textContent = `#${index + 1}`;

        // Content container
        const content = document.createElement('div');
        content.className = 'activity-content';

        // Header with icon and info
        const header = document.createElement('div');
        header.className = 'activity-header';

        const icon = document.createElement('div');
        icon.className = 'activity-icon';
        icon.textContent = activity.emoji;

        const info = document.createElement('div');
        info.className = 'activity-info';

        const title = document.createElement('div');
        title.className = 'activity-title';
        title.textContent = activity.title;

        info.appendChild(title);
        header.appendChild(icon);
        header.appendChild(info);

        // Description
        const description = document.createElement('div');
        description.className = 'activity-description';
        description.textContent = activity.description;

        // Meta information (location, distance, and time)
        const meta = document.createElement('div');
        meta.className = 'activity-meta';

        const locationMeta = document.createElement('div');
        locationMeta.className = 'meta-item';
        locationMeta.innerHTML = `📍 ${activity.location}`;

        const distanceMeta = document.createElement('div');
        distanceMeta.className = 'meta-item';
        distanceMeta.innerHTML = `🚗 ${activity.distance}`;

        meta.appendChild(locationMeta);
        meta.appendChild(distanceMeta);

        // Add time information if available
        if (activity.time) {
            const timeMeta = document.createElement('div');
            timeMeta.className = 'meta-item';
            timeMeta.innerHTML = `🕐 ${activity.time}`;
            meta.appendChild(timeMeta);
        }

        // Assemble card
        content.appendChild(header);
        content.appendChild(description);
        content.appendChild(meta);

        card.appendChild(numberBadge);
        card.appendChild(content);
        activitiesList.appendChild(card);
    });

    // Show results
    resultsSection.classList.remove('hidden');
}

// New search button handler
newSearchBtn.addEventListener('click', function() {
    // Hide results and show empty state
    resultsSection.classList.add('hidden');
    emptyState.classList.remove('hidden');
    newSearchBtn.classList.add('hidden');

    // Reset form
    form.reset();
    distanceValue.textContent = '10';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Clear button handler
clearBtn.addEventListener('click', function() {
    form.reset();
    distanceValue.textContent = '10';
});
