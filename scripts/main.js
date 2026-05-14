// Page Load - Hide Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 800);
});

// FAQ Toggle Function
function toggleFaq(button) {
    const content = button.nextElementSibling;
    const arrow = button.querySelector('svg');
    
    // Toggle current FAQ
    content.classList.toggle('hidden');
    arrow.classList.toggle('rotate-180');
    
    // Optional: Close other FAQs
    const allFaqs = document.querySelectorAll('#faq .hidden, #faq div:not(.hidden)');
    allFaqs.forEach(faq => {
        if (faq !== content && !faq.classList.contains('hidden')) {
            faq.classList.add('hidden');
            const otherArrow = faq.previousElementSibling.querySelector('svg');
            if (otherArrow) otherArrow.classList.remove('rotate-180');
        }
    });
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
