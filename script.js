// Smooth scrolling for navigation links
function scrollTo(section) {
    const element = document.getElementById(section);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.style.display = 'none';
        }
    });
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Clear previous error messages
        clearErrors();
        
        // Validation flags
        let isValid = true;
        
        // Validate Name
        if (name === '') {
            showError('nameError', 'Name is required');
            isValid = false;
        } else if (name.length < 2) {
            showError('nameError', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate Email
        if (email === '') {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('emailError', 'Please enter a valid email');
            isValid = false;
        }
        
        // Validate Message
        if (message === '') {
            showError('messageError', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showError('messageError', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // If valid, show success message
        if (isValid) {
            const successMsg = document.getElementById('successMessage');
            successMsg.textContent = 'Message sent successfully! We will contact you soon.';
            successMsg.style.color = '#51cf66';
            
            // Reset form
            contactForm.reset();
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                successMsg.textContent = '';
            }, 5000);
            
            console.log('Form submitted with:', { name, email, message });
        }
    });
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show error messages
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Helper function to clear all error messages
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards and features for animation
document.querySelectorAll('.service-card, .feature, .gallery-item').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// Add active state to navbar links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#d4a574';
        } else {
            link.style.color = '#ffffff';
        }
    });
});

// Responsive navigation menu
function handleResize() {
    if (window.innerWidth > 768) {
        if (navMenu) {
            navMenu.style.display = 'flex';
        }
    } else {
        if (navMenu) {
            navMenu.style.display = 'none';
        }
    }
}

window.addEventListener('resize', handleResize);
handleResize();

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const homeSection = document.querySelector('.home');
    const heroOverlay = document.querySelector('.hero-overlay');
    
    if (homeSection && window.innerWidth > 768) {
        const scrollPosition = window.scrollY;
        if (heroOverlay) {
            heroOverlay.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
        }
    }
});

// Log when page is ready
console.log('Vibey Ventures website loaded successfully!');
