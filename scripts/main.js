// Page Load - Hide Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 800);
    
    // Initialize Venue Map
    initVenueMap();
});

// FAQ Toggle Function
function toggleFaq(button) {
    const content = button.nextElementSibling;
    const arrow = button.querySelector('svg');
    
    // Check if this FAQ is currently open
    const isOpen = !content.classList.contains('hidden');
    
    // Close all FAQs first
    const allContents = document.querySelectorAll('#faq .bg-candle > div:not(button)');
    const allArrows = document.querySelectorAll('#faq .bg-candle button svg');
    
    allContents.forEach(c => c.classList.add('hidden'));
    allArrows.forEach(a => a.classList.remove('rotate-180'));
    
    // If it was closed, open it
    if (!isOpen) {
        content.classList.remove('hidden');
        arrow.classList.add('rotate-180');
    }
}

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.remove('opacity-0', 'pointer-events-none');
        backToTopButton.classList.add('opacity-100');
    } else {
        backToTopButton.classList.add('opacity-0', 'pointer-events-none');
        backToTopButton.classList.remove('opacity-100');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Countdown Timer
const weddingDate = new Date('August 9, 2026 15:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;

    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById('countdown').innerHTML = '<div class="col-span-4 text-2xl font-serif">Свадьба уже началась!</div>';
    }
}

const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Waypoint Animations for Story Section
const waypointObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Add animation class based on element's class
            if (element.classList.contains('wp1') || element.classList.contains('wp3') || 
                element.classList.contains('wp5') || element.classList.contains('wp8')) {
                element.classList.add('animated', 'fadeInLeft');
            } else if (element.classList.contains('wp2') || element.classList.contains('wp4') || 
                       element.classList.contains('wp6') || element.classList.contains('wp9')) {
                element.classList.add('animated', 'fadeInRight');
            } else if (element.classList.contains('wp7')) {
                element.classList.add('animated', 'fadeInUp');
            }
            
            waypointObserver.unobserve(element);
        }
    });
}, { threshold: 0.25 });

// Observe all waypoint elements
document.querySelectorAll('.wp1, .wp2, .wp3, .wp4, .wp5, .wp6, .wp7, .wp8, .wp9').forEach(el => {
    waypointObserver.observe(el);
});

// Form Handling with Validation
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const attendance = this.querySelector('select').value;
    
    // Basic validation
    if (!name || !email || !attendance) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Пожалуйста, введите корректный email');
        return;
    }
    
    // Show success modal
    const modal = document.getElementById('successModal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.querySelector('div').classList.remove('scale-95');
        modal.querySelector('div').classList.add('scale-100');
    }, 10);
    
    // Log form data (in production, send to server)
    console.log('RSVP Submission:', {
        name,
        email,
        attendance,
        timestamp: new Date().toISOString()
    });
    
    this.reset();
});

// Navbar Scroll Effect with Active Section Highlighting
let lastScroll = 0;
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    const currentScroll = window.scrollY;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        nav.classList.add('shadow-md');
    } else {
        nav.classList.remove('shadow-md');
    }
    
    // Hide/show navbar on scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
    
    // Highlight active section in navigation
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (currentScroll >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-gold');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-gold');
        }
    });
});

// Calendar Functions
function addToCalendar(type) {
    const event = {
        title: 'Свадьба Артёма и Алёны',
        description: 'Мы с нетерпением ждём встречи с вами в наш важный день! Сбор гостей в 15:00.',
        location: 'Queen\'s Lake, Коттеджный посёлок Княжье Озеро, вл1, Московская область, Россия',
        startTime: '20260809T150000',
        endTime: '20260809T230000'
    };

    if (type === 'google') {
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startTime}/${event.endTime}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
        window.open(url, '_blank');
    } else if (type === 'apple') {
        downloadICS();
    }
}

function downloadICS() {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//RU
BEGIN:VEVENT
DTSTART:20260809T150000
DTEND:20260809T230000
SUMMARY:Свадьба Артёма и Алёны
DESCRIPTION:Мы с нетерпением ждём встречи с вами в наш важный день! Сбор гостей в 15:00.
LOCATION:Queen's Lake\, Коттеджный посёлок Княжье Озеро\, вл1\, Московская область\, Россия
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT24H
DESCRIPTION:Напоминание о свадьбе Артёма и Алёны
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'wedding-artem-alena.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Calendar Buttons Initialization (not needed - using custom buttons)
// function initCalendarButtons() { ... }

// Venue Map Initialization
function initVenueMap() {
    // Check if Yandex Maps API is loaded
    if (typeof ymaps === 'undefined') {
        console.warn('Yandex Maps API not loaded - map will not display');
        const mapContainer = document.getElementById('venue-map');
        if (mapContainer) {
            mapContainer.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f5f5f5; color: #666; text-align: center; padding: 20px;"><div><p style="font-size: 48px; margin-bottom: 10px;">🗺️</p><p>Карта загружается...</p></div></div>';
        }
        return;
    }
    
    // Coordinates for Queen's Lake, Княжье Озеро
    const venueCoords = [55.815556, 37.048020];
    
    ymaps.ready(function() {
        try {
            var myMap = new ymaps.Map("venue-map", {
                center: venueCoords,
                zoom: 14,
                controls: ['zoomControl', 'fullscreenControl']
            });
            
            // Disable scroll zoom initially
            myMap.behaviors.disable('scrollZoom');
            
            // Create a custom placemark
            var myPlacemark = new ymaps.Placemark(venueCoords, {
                hintContent: 'Queen\'s Lake',
                balloonContent: '<div style="padding: 10px;">' +
                               '<strong style="font-size: 16px; color: #7BA3B8;">Queen\'s Lake</strong><br>' +
                               '<p style="margin: 8px 0; color: #666;">Коттеджный посёлок Княжье Озеро, вл1<br>Московская область, Россия</p>' +
                               '<p style="margin: 8px 0;"><strong>Сбор гостей:</strong> 15:00</p>' +
                               '<p style="margin: 8px 0;"><strong>Тел:</strong> <a href="tel:+74959682727">+7 (495) 968-27-27</a></p>' +
                               '<a href="https://queens-lake-1736520512.clients.site" target="_blank" ' +
                               'style="display: inline-block; margin-top: 8px; padding: 8px 16px; background-color: #7BA3B8; ' +
                               'color: white; text-decoration: none; border-radius: 6px; font-weight: 500;">Сайт площадки</a>' +
                               '</div>'
            }, {
                preset: 'islands#redDotIcon',
                iconColor: '#E8A0A0'
            });
            
            myMap.geoObjects.add(myPlacemark);
            
            // Click on overlay to enable map interaction
            const mapOverlay = document.getElementById('map-overlay');
            if (mapOverlay) {
                mapOverlay.addEventListener('click', function() {
                    this.style.opacity = '0';
                    this.style.pointerEvents = 'none';
                    myMap.behaviors.enable('scrollZoom');
                    myMap.behaviors.enable('drag');
                });
            }
            
            // Auto-open balloon after 2 seconds
            setTimeout(function() {
                myPlacemark.balloon.open();
            }, 2000);
            
        } catch (error) {
            console.error('Error initializing map:', error);
        }
    });
}
