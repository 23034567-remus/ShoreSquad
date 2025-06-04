// ShoreSquad Main Application JavaScript

// Constants
const API_KEY = 'YOUR_WEATHER_API_KEY'; // Replace with actual API key
const MAP_KEY = 'YOUR_MAP_API_KEY';     // Replace with actual API key

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
        // Placeholder for weather API integration
        console.log('Weather data fetch pending API integration');
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
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
