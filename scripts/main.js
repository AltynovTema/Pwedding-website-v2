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
    
    // Initialize Gallery Carousel
    initGalleryCarousel();
    
    // Initialize Background Music
    initBackgroundMusic();
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

// Form Handling with Validation and Email Integration
document.getElementById('rsvpForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[name="Имя"]').value;
    const phone = this.querySelector('input[name="Телефон"]').value;
    const attendance = this.querySelector('select[name="Присутствие"]').value;
    
    // Basic validation
    if (!name || !phone || !attendance) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }
    
    // Phone validation - accept any format with at least 10 digits
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
        alert('Пожалуйста, введите корректный номер телефона (10-15 цифр)');
        return;
    }
    
    // Show loading modal
    const loadingModal = document.getElementById('loadingModal');
    loadingModal.classList.remove('hidden');
    setTimeout(() => {
        loadingModal.querySelector('div').classList.remove('scale-95');
        loadingModal.querySelector('div').classList.add('scale-100');
    }, 10);
    
    // Send to Formspree in background (fire and forget - don't wait for response)
    sendToEmail(formData).then(() => {
        console.log('✅ Form sent successfully');
    }).catch((error) => {
        console.log('⚠️ Background send error (form still submitted):', error.message);
    });
    
    // Always show success after 1 second (don't wait for server response)
    setTimeout(() => {
        loadingModal.classList.add('hidden');
        showSuccessModal(name);
        
        // Reset form
        this.reset();
        document.getElementById('guestNamesSection').classList.add('hidden');
        document.getElementById('guestNamesContainer').innerHTML = '';
    }, 1000);
});

// Dynamic Guest Names Fields
const guestCountSelect = document.getElementById('guestCount');
if (guestCountSelect) {
    guestCountSelect.addEventListener('change', function() {
        const count = parseInt(this.value);
        const guestNamesSection = document.getElementById('guestNamesSection');
        const guestNamesContainer = document.getElementById('guestNamesContainer');
        
        if (count > 1) {
            guestNamesSection.classList.remove('hidden');
            guestNamesContainer.innerHTML = '';
            
            for (let i = 1; i < count; i++) {
                const inputDiv = document.createElement('div');
                inputDiv.innerHTML = `
                    <input type="text" name="Имя гостя ${i}" class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-candle placeholder-candle/30 focus:outline-none focus:border-gold transition-colors" placeholder="Имя гостя ${i}">
                `;
                guestNamesContainer.appendChild(inputDiv);
            }
        } else {
            guestNamesSection.classList.add('hidden');
            guestNamesContainer.innerHTML = '';
        }
    });
}

// Phone Input Mask
const phoneInput = document.querySelector('input[name="Телефон"]');
if (phoneInput) {
    phoneInput.setAttribute('placeholder', '+7(___)___-__-__');
    phoneInput.setAttribute('maxlength', '18');
    phoneInput.value = '+7'; // Set default value
    
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // If starts with 8, replace with 7
        if (value.startsWith('8')) {
            value = '7' + value.slice(1);
        }
        
        // If doesn't start with 7, add it
        if (!value.startsWith('7') && value.length > 0) {
            value = '7' + value;
        }
        
        // Ensure we always have at least 7
        if (value.length === 0) {
            value = '7';
        }
        
        let formattedValue = '';
        
        if (value.length > 0) {
            formattedValue = '+7';
        }
        
        if (value.length > 1) {
            formattedValue += '(' + value.substring(1, 4);
        }
        
        if (value.length >= 4) {
            formattedValue += ')' + value.substring(4, 7);
        }
        
        if (value.length >= 7) {
            formattedValue += '-' + value.substring(7, 9);
        }
        
        if (value.length >= 9) {
            formattedValue += '-' + value.substring(9, 11);
        }
        
        e.target.value = formattedValue;
    });
    
    // Handle backspace - allow deleting digits but keep format
    phoneInput.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace') {
            const currentValue = this.value;
            
            // Don't allow deleting +7
            if (currentValue.length <= 3) {
                e.preventDefault();
                return;
            }
            
            // Get cursor position
            const cursorPos = this.selectionStart;
            
            // If trying to delete a formatting character, move cursor back and delete the digit before it
            const charToDelete = currentValue[cursorPos - 1];
            if (['(', ')', '-'].includes(charToDelete)) {
                e.preventDefault();
                // Move cursor back and remove the previous digit
                const newValue = currentValue.slice(0, cursorPos - 2) + currentValue.slice(cursorPos);
                this.value = newValue;
                this.setSelectionRange(cursorPos - 2, cursorPos - 2);
                
                // Trigger input event to reformat
                this.dispatchEvent(new Event('input'));
            }
        }
    });
    
    // Prevent removing +7
    phoneInput.addEventListener('blur', function(e) {
        if (e.target.value === '' || e.target.value === '+') {
            e.target.value = '+7';
        }
    });
}

// Function to send form data to email via Formspree
async function sendToEmail(formData) {
    const FORMSPREE_URL = 'https://formspree.io/f/mwvygqjr';
    
    const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Formspree error: ${response.status} - ${JSON.stringify(errorData)}`);
    }
    
    return response.json();
}

// Function to show success modal with personalized message
function showSuccessModal(name) {
    const modal = document.getElementById('successModal');
    const titleElement = document.getElementById('successTitle');
    const messageElement = document.getElementById('successMessage');
    
    // Set personalized message
    titleElement.textContent = `Спасибо, ${name}!`;
    
    // Show modal
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.querySelector('div').classList.remove('scale-95');
        modal.querySelector('div').classList.add('scale-100');
    }, 10);
    
    // Start fireworks animation
    startFireworks();
}

// Function to close success modal
function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.querySelector('div').classList.remove('scale-100');
    modal.querySelector('div').classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
        stopFireworks();
    }, 300);
}

// Toggle Hotel Lists
function toggleHotelList(hotelListId) {
    const list = document.getElementById(hotelListId);
    const arrow = document.getElementById('arrow-' + hotelListId);
    
    if (list.classList.contains('hidden')) {
        list.classList.remove('hidden');
        arrow.classList.add('rotate-180');
    } else {
        list.classList.add('hidden');
        arrow.classList.remove('rotate-180');
    }
}

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

// ===== FIREWORKS ANIMATION SYSTEM =====
let fireworksAnimationId = null;
let particles = [];

function startFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const modal = canvas.parentElement;
    
    // Set canvas size to match modal
    function resizeCanvas() {
        canvas.width = modal.offsetWidth;
        canvas.height = modal.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Wedding color palette
    const colors = ['#F8C8D4', '#B8D4EA', '#D4B896', '#E8DDE8', '#FFE4EA', '#D6E8F5', '#FFF5F7', '#F0B8C0'];
    
    // Create firework particle class
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 3 + 1;
            this.vx = Math.cos(angle) * velocity;
            this.vy = Math.sin(angle) * velocity;
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.01;
            this.gravity = 0.05;
        }
        
        update() {
            this.vx *= 0.98;
            this.vy *= 0.98;
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.decay;
        }
        
        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Add sparkle effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Create explosion
    function createExplosion(x, y) {
        const particleCount = 30 + Math.random() * 20;
        for (let i = 0; i < particleCount; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(x, y, color));
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Randomly create new explosions
        if (Math.random() < 0.05) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height * 0.6;
            createExplosion(x, y);
        }
        
        // Update and draw particles
        particles = particles.filter(particle => {
            particle.update();
            particle.draw(ctx);
            return particle.alpha > 0;
        });
        
        fireworksAnimationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Create initial burst
    setTimeout(() => createExplosion(canvas.width / 2, canvas.height / 3), 100);
    setTimeout(() => createExplosion(canvas.width / 3, canvas.height / 2), 300);
    setTimeout(() => createExplosion(canvas.width * 2/3, canvas.height / 2), 500);
}

function stopFireworks() {
    if (fireworksAnimationId) {
        cancelAnimationFrame(fireworksAnimationId);
        fireworksAnimationId = null;
    }
    particles = [];
}

// ===== GALLERY CAROUSEL SYSTEM =====
function initGalleryCarousel() {
    const carousel = document.getElementById('gallery-carousel');
    const prevButton = document.getElementById('gallery-prev');
    const nextButton = document.getElementById('gallery-next');
    const dotsContainer = document.getElementById('gallery-dots');
    
    if (!carousel) return;
    
    // Photo paths
    const photos = [
        '/Pwedding-website-v2/media/photos/photo1.jpg',
        '/Pwedding-website-v2/media/photos/photo2.jpg',
        '/Pwedding-website-v2/media/photos/photo3.jpg',
        '/Pwedding-website-v2/media/photos/photo4.jpg',
        '/Pwedding-website-v2/media/photos/photo5.jpg',
        '/Pwedding-website-v2/media/photos/photo6.jpg',
        '/Pwedding-website-v2/media/photos/photo7.jpg',
        '/Pwedding-website-v2/media/photos/photo8.jpg',
        '/Pwedding-website-v2/media/photos/photo9.jpg',
        '/Pwedding-website-v2/media/photos/photo10.jpg'
    ];

    // Create slides - NO clones, just original photos
    photos.forEach((photoPath, index) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        slide.innerHTML = `<img src="${photoPath}" alt="Фото ${index + 1}" loading="lazy">`;
        carousel.appendChild(slide);
    });
    
    // Get all slides
    const slides = carousel.querySelectorAll('.gallery-slide');
    const totalSlides = photos.length;
    
    // Determine how many slides to show based on screen width
    function getSlidesToShow() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    let currentIndex = 0; // Start at first photo (will be centered)
    let slidesToShow = getSlidesToShow();
    let autoPlayInterval;
    
    // Create dots (one for each photo)
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'gallery-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = dotsContainer.querySelectorAll('.gallery-dot');
    
    // Update carousel position - center the current photo
    function updateCarousel() {
        const slideWidth = 100 / slidesToShow;
        
        // Calculate offset to center the current photo
        // For 3 photos: show [prev, current, next], so offset by 1 position
        const centerOffset = Math.floor(slidesToShow / 2);
        let offsetIndex = currentIndex - centerOffset;
        
        // Clamp to boundaries
        const maxOffset = totalSlides - slidesToShow;
        offsetIndex = Math.max(0, Math.min(offsetIndex, maxOffset));
        
        const offset = -(offsetIndex * slideWidth);
        carousel.style.transform = `translateX(${offset}%)`;
        
        // Update dots - highlight current centered photo
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update button states
        updateButtonStates();
    }
    
    // Update button visibility based on position
    function updateButtonStates() {
        // Disable prev button at start
        if (currentIndex <= 0) {
            prevButton.style.opacity = '0.5';
            prevButton.style.pointerEvents = 'none';
        } else {
            prevButton.style.opacity = '1';
            prevButton.style.pointerEvents = 'auto';
        }
        
        // Disable next button at end
        if (currentIndex >= totalSlides - 1) {
            nextButton.style.opacity = '0.5';
            nextButton.style.pointerEvents = 'none';
        } else {
            nextButton.style.opacity = '1';
            nextButton.style.pointerEvents = 'auto';
        }
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoPlay();
    }
    
    // Next slide
    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            // Rewind to beginning
            currentIndex = 0;
        }
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            // Go to end
            currentIndex = totalSlides - 1;
        }
        updateCarousel();
    }
    
    // Auto-play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // Change every 5 seconds
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }
    
    // Event listeners
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });
    
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });
    
    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newSlidesToShow = getSlidesToShow();
            if (newSlidesToShow !== slidesToShow) {
                slidesToShow = newSlidesToShow;
                currentIndex = 0; // Reset to first photo
                updateCarousel();
            }
        }, 250);
    });
    
    // Initialize position
    updateCarousel();
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartTime = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartTime = Date.now();
        stopAutoPlay();
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const touchDuration = Date.now() - touchStartTime;
        
        // Only trigger swipe if it's a quick gesture (not a long press)
        if (touchDuration < 300) {
            handleSwipe();
        }
        startAutoPlay();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetAutoPlay();
        }
    }
    
    // Start auto-play
    startAutoPlay();
}

// ===== BACKGROUND MUSIC SYSTEM =====
function initBackgroundMusic() {
    const music = document.getElementById('backgroundMusic');
    const toggleButton = document.getElementById('musicToggle');
    const iconOn = document.getElementById('musicIconOn');
    const iconOff = document.getElementById('musicIconOff');
    
    if (!music || !toggleButton) return;
    
    let isPlaying = false;
    
    // Set volume to 50% for background music
    music.volume = 0.5;
    
    // Initialize icon state (show off by default)
    iconOn.classList.add('hidden');
    iconOff.classList.remove('hidden');
    
    // Try to play music
    function playMusic() {
        music.play().then(() => {
            isPlaying = true;
            iconOn.classList.remove('hidden');
            iconOff.classList.add('hidden');
        }).catch(error => {
            // Autoplay blocked - will start on user interaction
            isPlaying = false;
            iconOn.classList.add('hidden');
            iconOff.classList.remove('hidden');
        });
    }
    
    // Toggle music on button click
    toggleButton.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (isPlaying) {
            music.pause();
            isPlaying = false;
            iconOn.classList.add('hidden');
            iconOff.classList.remove('hidden');
        } else {
            music.play().then(() => {
                isPlaying = true;
                iconOn.classList.remove('hidden');
                iconOff.classList.add('hidden');
            }).catch(error => {
                console.error('Error playing music:', error);
            });
        }
    });
    
    // Try to autoplay immediately (will likely be blocked)
    setTimeout(() => {
        playMusic();
    }, 500);
    
    // Start music on FIRST user interaction
    let startedOnInteraction = false;
    const startOnInteraction = () => {
        if (!isPlaying && !startedOnInteraction) {
            playMusic();
            startedOnInteraction = true;
        }
    };
    
    // Listen for ANY user interaction
    document.addEventListener('click', startOnInteraction, { once: true });
    document.addEventListener('touchstart', startOnInteraction, { once: true });
    document.addEventListener('scroll', startOnInteraction, { once: true });
    document.addEventListener('keydown', startOnInteraction, { once: true });
}
