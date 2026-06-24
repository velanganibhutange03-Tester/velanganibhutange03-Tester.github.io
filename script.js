// ============================================
// Smooth Scrolling & Navigation
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Mobile Menu Toggle
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ============================================
// Navbar Background on Scroll
// ============================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// Form Submission Handler
// ============================================

function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    // Validate form
    if (!data.name || !data.email || !data.subject || !data.message) {
        alert('Please fill in all fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Show success message
    const btn = form.querySelector('.btn');
    const originalText = btn.textContent;
    btn.textContent = 'Message Sent! ✓';
    btn.style.background = '#27ae60';

    // Reset form
    form.reset();

    // Restore button after 3 seconds
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 3000);
}

// ============================================
// Scroll Reveal Animation
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards and other elements
document.querySelectorAll('.project-card, .skill-category, .education-item, .info-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ============================================
// Active Navigation Link
// ============================================

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Counter Animation (for stats)
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const stats = entry.target.querySelectorAll('.stat h3');
            stats.forEach(stat => {
                const value = parseInt(stat.textContent);
                animateCounter(stat, value);
            });
            entry.target.classList.add('animated');
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsContainer = document.querySelector('.about-stats');
if (statsContainer) {
    statsObserver.observe(statsContainer);
}

// ============================================
// Scroll to Top Button
// ============================================

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        if (!document.querySelector('.scroll-to-top')) {
            const btn = document.createElement('button');
            btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            btn.className = 'scroll-to-top';
            btn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: #3366cc;
                color: white;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 20px;
                z-index: 999;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            btn.onmouseover = () => {
                btn.style.transform = 'translateY(-3px)';
                btn.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
            };
            btn.onmouseout = () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
            };
            btn.onclick = scrollToTop;
            document.body.appendChild(btn);
        }
    }
});

// ============================================
// Initialize on Load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
});