
/**
 * Main JavaScript file for Waraha Group website
 */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Handle navbar scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-links a');
  
  menuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
  
  // Scroll to section handlers
  const scrollDown = document.getElementById('scroll-down');
  scrollDown.addEventListener('click', function() {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  });
  
  const scrollTop = document.getElementById('scroll-top');
  scrollTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Email button click handler
  const mailBtn = document.getElementById('mail-btn');
  mailBtn.addEventListener('click', function() {
    window.location.href = 'mailto:info@warahagroup.com';
  });
  
  // Intersection Observer for animated elements
  const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  };
  
  // Create observer for scroll animations
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(animateOnScroll, options);
  
  // Observe service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
    card.style.transitionDelay = `${index * 100}ms`;
    observer.observe(card);
  });
  
  // Observe benefit cards
  const benefitCards = document.querySelectorAll('.benefit-card');
  benefitCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
    card.style.transitionDelay = `${index * 100}ms`;
    observer.observe(card);
  });
  
  // Observe about section elements
  const philosophy = document.getElementById('philosophy');
  const vision = document.getElementById('vision');
  
  if (philosophy) {
    philosophy.style.opacity = '0';
    philosophy.style.transform = 'translateX(-20px)';
    philosophy.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
    observer.observe(philosophy);
  }
  
  if (vision) {
    vision.style.opacity = '0';
    vision.style.transform = 'translateX(20px)';
    vision.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
    observer.observe(vision);
  }
  
  // Add 'visible' class CSS
  const style = document.createElement('style');
  style.textContent = `
    .visible {
      opacity: 1 !important;
      transform: translate(0, 0) !important;
    }
  `;
  document.head.appendChild(style);
});
