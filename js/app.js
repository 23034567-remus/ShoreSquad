// ShoreSquad Main Application JavaScript

// Constants
const API_KEY = 'YOUR_WEATHER_API_KEY'; // Replace with actual API key
const MAP_KEY = 'YOUR_MAP_API_KEY';     // Replace with actual API key
const NEA_API_BASE_URL = 'https://api.data.gov.sg/v1/environment';

// Unit conversion and formatting
const formatTemperature = (temp) => `${Math.round(temp)}°C`;
const formatWindSpeed = (speed) => `${Math.round(speed)} km/h`;
const formatVisibility = (distance) => `${(distance / 1000).toFixed(1)} km`;
const formatPrecipitation = (amount) => `${amount} mm`;
const formatDate = (date) => new Date(date).toLocaleDateString('en-SG', { 
    weekday: 'short', 
    day: 'numeric',
    month: 'short'
});

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Initialize components
    setupNavigation();
    initializeMap();
    fetchWeatherData();
    loadEvents();
}

// Navigation
function setupNavigation() {
    const nav = document.querySelector('.nav-container');
    const links = document.querySelectorAll('.nav-links a');

    // Smooth scroll for navigation links
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Add scroll event listener for header transparency
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Map Functionality
function initializeMap() {
    // Placeholder for map initialization
    // Will be implemented with chosen map API (e.g., Google Maps, Mapbox)
    console.log('Map initialization pending API integration');
}

// Weather Data
async function fetchWeatherData() {
    try {
        const weatherContainer = document.querySelector('.weather-container');
        weatherContainer.innerHTML = '<div class="loading">Loading weather data...</div>';

        // Fetch 4-day forecast
        const forecastResponse = await fetch(`${NEA_API_BASE_URL}/4-day-weather-forecast`);
        const forecastData = await forecastResponse.json();

        // Fetch current temperature from realtime readings
        const tempResponse = await fetch(`${NEA_API_BASE_URL}/air-temperature`);
        const tempData = await tempResponse.json();

        // Get the current temperature for Pasir Ris (using nearest station)
        const currentTemp = tempData.items[0].readings.find(
            reading => reading.station_id === 'S106' // Pasir Ris station ID
        )?.value || null;

        const forecasts = forecastData.items[0].forecasts;
        const weatherHTML = `
            <div class="current-weather">
                <h3>Current Temperature</h3>
                <p class="temp">${formatTemperature(currentTemp)}</p>
            </div>
            <div class="forecast-grid">
                ${forecasts.map(day => `
                    <div class="forecast-card">
                        <h4>${formatDate(day.date)}</h4>
                        <div class="forecast-icon">
                            ${getWeatherIcon(day.forecast)}
                        </div>
                        <p class="forecast-text">${day.forecast}</p>
                        <p class="temp-range">
                            ${formatTemperature(day.temperature.low)} - ${formatTemperature(day.temperature.high)}
                        </p>
                        <p class="humidity">Humidity: ${day.relative_humidity.low}% - ${day.relative_humidity.high}%</p>
                    </div>
                `).join('')}
            </div>
        `;

        weatherContainer.innerHTML = weatherHTML;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherContainer.innerHTML = '<div class="error">Unable to load weather data. Please try again later.</div>';
    }
}

function getWeatherIcon(forecast) {
    // Map NEA forecast descriptions to weather icons (using emoji for now)
    const iconMap = {
        'Thundery Showers': '⛈️',
        'Light Showers': '🌦️',
        'Partly Cloudy': '⛅',
        'Cloudy': '☁️',
        'Light Rain': '🌧️',
        'Moderate Rain': '🌧️',
        'Heavy Rain': '⛈️',
        'Fair': '☀️',
        'Fair (Day)': '☀️',
        'Sunny': '☀️'
    };
    
    // Find the closest matching forecast description
    const key = Object.keys(iconMap).find(k => forecast.includes(k)) || 'Fair';
    return iconMap[key];
}

// Events Management
function loadEvents() {
    const eventsGrid = document.querySelector('.events-grid');
    
    // Sample events data - will be replaced with actual API data
    const sampleEvents = [
        {
            title: 'Weekend Beach Cleanup',
            date: '2025-06-15',
            location: 'Sunset Beach',
            participants: 25
        },
        // Add more sample events as needed
    ];

    // Render events
    sampleEvents.forEach(event => {
        const eventCard = createEventCard(event);
        eventsGrid.appendChild(eventCard);
    });
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.classList.add('event-card');
    
    card.innerHTML = `
        <h3>${event.title}</h3>
        <p>Date: ${event.date}</p>
        <p>Location: ${event.location}</p>
        <p>Participants: ${event.participants}</p>
        <button onclick="joinEvent('${event.title}')">Join Event</button>
    `;
    
    return card;
}

function joinEvent(eventTitle) {
    // Placeholder for event join functionality
    console.log(`Joined event: ${eventTitle}`);
    // Will be implemented with actual backend integration
}

// Performance Optimizations
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Handle window resize events with debouncing
window.addEventListener('resize', debounce(() => {
    // Adjust UI elements if needed
}, 250));
