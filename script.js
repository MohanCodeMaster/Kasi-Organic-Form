// Custom JavaScript for Kasi Naturals

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.btn:contains("Add to Cart")');
    
    document.querySelectorAll('.product-item .btn-success').forEach(button => {
        button.addEventListener('click', function() {
            // Get product name from the card
            const productCard = this.closest('.product-item');
            const productName = productCard.querySelector('h4').textContent;
            
            // Show success message
            showNotification(`${productName} added to cart!`, 'success');
            
            // Add animation to button
            this.innerHTML = '<i class="bi bi-check-circle me-2"></i>Added!';
            this.classList.remove('btn-success');
            this.classList.add('btn-outline-success');
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.innerHTML = '<i class="bi bi-cart-plus me-2"></i>Add to Cart';
                this.classList.remove('btn-outline-success');
                this.classList.add('btn-success');
            }, 2000);
        });
    });

    // Heart icon functionality
    document.querySelectorAll('.bi-heart').forEach(heart => {
        heart.addEventListener('click', function() {
            if (this.classList.contains('bi-heart')) {
                this.classList.remove('bi-heart');
                this.classList.add('bi-heart-fill');
                this.style.color = '#dc3545';
                
                // Get product name
                const productCard = this.closest('.product-item');
                const productName = productCard.querySelector('h4').textContent;
                showNotification(`${productName} added to wishlist!`, 'info');
            } else {
                this.classList.remove('bi-heart-fill');
                this.classList.add('bi-heart');
                this.style.color = '';
            }
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!firstName || !lastName || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'warning');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'warning');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Newsletter subscription
    const newsletterForm = document.querySelector('footer .input-group');
    if (newsletterForm) {
        const button = newsletterForm.querySelector('button');
        const input = newsletterForm.querySelector('input');
        
        button.addEventListener('click', function() {
            const email = input.value.trim();
            
            if (!email) {
                showNotification('Please enter your email address.', 'warning');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'warning');
                return;
            }
            
            // Simulate subscription
            this.innerHTML = '<i class="bi bi-check-circle"></i>';
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            input.value = '';
            
            setTimeout(() => {
                this.innerHTML = '<i class="bi bi-envelope"></i>';
            }, 2000);
        });
        
        // Allow Enter key to submit
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                button.click();
            }
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe product cards and other elements
    document.querySelectorAll('.product-item, .product-card').forEach(card => {
        observer.observe(card);
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
});

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Shopping cart functionality (basic)
let cart = [];

function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
}

function updateCartDisplay() {
    // This would update a cart counter in the navbar
    // For now, we'll just log to console
    console.log('Cart updated:', cart);
}

// Lazy loading for images (if we add real product images later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const navbarToggler = document.querySelector('.navbar-toggler');
            navbarToggler.click();
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handler
const debouncedScrollHandler = debounce(function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);