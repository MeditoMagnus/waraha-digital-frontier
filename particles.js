
/**
 * Particle background system for Waraha Group website
 */
class ParticleSystem {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 80;
    
    const container = document.getElementById('particles-container');
    container.appendChild(this.canvas);
    
    this.resize();
    this.init();
    
    window.addEventListener('resize', this.resize.bind(this));
    this.animate();
  }
  
  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    
    // Reinitialize particles when resized
    if (this.particles.length) {
      this.init();
    }
  }
  
  init() {
    // Clear existing particles
    this.particles = [];
    
    // Create new particles
    const particleCount = Math.min(this.width * 0.05, this.particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = this.width;
      if (particle.x > this.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.height;
      if (particle.y > this.height) particle.y = 0;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(159, 158, 161, ${particle.opacity})`;
      this.ctx.fill();
      
      // Connect particles that are close to each other
      for (let j = index + 1; j < this.particles.length; j++) {
        const otherParticle = this.particles[j];
        const distance = Math.sqrt(
          Math.pow(particle.x - otherParticle.x, 2) +
          Math.pow(particle.y - otherParticle.y, 2)
        );
        
        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.strokeStyle = `rgba(159, 158, 161, ${0.1 * (1 - distance / 100)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    });
    
    requestAnimationFrame(this.animate.bind(this));
  }
}

// Initialize the particle system when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem();
});
