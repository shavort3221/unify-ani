
import React, { useEffect, useRef } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

// Component for animated background effects
const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create bubbles
    const createBubbles = () => {
      const container = containerRef.current;
      if (!container) return;
      
      // Remove old bubbles to prevent memory issues
      const oldBubbles = container.querySelectorAll('.bubble');
      if (oldBubbles.length > 50) {
        for (let i = 0; i < oldBubbles.length - 50; i++) {
          oldBubbles[i].remove();
        }
      }
      
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      
      // Random properties
      const size = Math.random() * 50 + 10;
      const left = Math.random() * 100;
      const xDist = (Math.random() - 0.5) * 200;
      const xFinal = xDist * 2;
      const duration = Math.random() * 8 + 6;
      
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.bottom = '-50px';
      bubble.style.setProperty('--x-dist', `${xDist}px`);
      bubble.style.setProperty('--x-final', `${xFinal}px`);
      bubble.style.setProperty('--duration', `${duration}s`);
      
      container.appendChild(bubble);
      
      // Remove bubble after animation completes
      setTimeout(() => {
        if (bubble.parentNode === container) {
          container.removeChild(bubble);
        }
      }, duration * 1000);
    };
    
    // Create raindrops
    const createRaindrops = () => {
      const container = containerRef.current;
      if (!container) return;
      
      // Remove old raindrops to prevent memory issues
      const oldRaindrops = container.querySelectorAll('.raindrop');
      if (oldRaindrops.length > 100) {
        for (let i = 0; i < oldRaindrops.length - 100; i++) {
          oldRaindrops[i].remove();
        }
      }
      
      const raindrop = document.createElement('div');
      raindrop.className = 'raindrop';
      
      // Random properties
      const left = Math.random() * 100;
      const duration = Math.random() * 0.8 + 0.8;
      const delay = Math.random() * 2;
      
      raindrop.style.left = `${left}%`;
      raindrop.style.setProperty('--duration', `${duration}s`);
      raindrop.style.animationDelay = `${delay}s`;
      
      container.appendChild(raindrop);
      
      // Remove raindrop after animation completes
      setTimeout(() => {
        if (raindrop.parentNode === container) {
          container.removeChild(raindrop);
        }
      }, (duration + delay) * 1000);
    };
    
    // Create effects at intervals
    const bubbleInterval = setInterval(createBubbles, 800);
    const raindropInterval = setInterval(createRaindrops, 200);
    
    return () => {
      clearInterval(bubbleInterval);
      clearInterval(raindropInterval);
    };
  }, []);
  
  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0" />;
};

// AI Grid Background with animated circles
const AIGridBackground = () => {
  return (
    <div className="absolute inset-0 ai-grid pointer-events-none z-0 opacity-50">
      <div className="ai-circle w-[300px] h-[300px] top-1/4 left-[10%]" style={{ animationDelay: '0s' }}></div>
      <div className="ai-circle w-[400px] h-[400px] bottom-1/3 right-[15%]" style={{ animationDelay: '-5s' }}></div>
      <div className="ai-circle w-[200px] h-[200px] top-2/3 left-[25%]" style={{ animationDelay: '-10s' }}></div>
      <div className="ai-circle w-[350px] h-[350px] top-1/3 right-[30%]" style={{ animationDelay: '-15s' }}></div>
    </div>
  );
};

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const heroElements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    heroElements?.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      heroElements?.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  return (
    <section id="home" ref={heroRef} className="min-h-screen flex flex-col justify-center relative pt-24 pb-32 px-6 md:px-12 overflow-hidden">
      <AnimatedBackground />
      <AIGridBackground />
      
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-0 right-0 bottom-0 h-[60%] bg-gradient-to-t from-sky-500/5 to-transparent dark:from-sky-900/10"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <div className="animate-on-scroll opacity-0" style={{ transitionDelay: '100ms' }}>
          <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-sky-500/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400 font-medium mb-4 hover-lift">
            <Sparkles size={16} className="animate-pulse" />
            Simple • Precise • Elegant
          </span>
        </div>
        
        <h1 className="animate-on-scroll opacity-0 text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-balance" style={{ transitionDelay: '200ms' }}>
          <span className="animated-gradient-text">
            Convert Units with
          </span> 
          <br />
          <span className="relative animated-gradient-text">
            Precision & Elegance
            <svg className="absolute -bottom-2 left-0 w-full h-2 text-sky-500/50 dark:text-sky-400/50" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10C47.5 4 93 1.5 138.5 2C184 2.5 229.5 4 275 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </span>
        </h1>
        
        <p className="animate-on-scroll opacity-0 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto" style={{ transitionDelay: '300ms' }}>
          A beautifully designed unit converter that transforms complex calculations into a seamless experience. Fast, accurate, and intuitive.
        </p>
        
        <div className="animate-on-scroll opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 mb-16" style={{ transitionDelay: '400ms' }}>
          <a 
            href="#converter" 
            className="px-6 py-3 rounded-lg btn-gradient text-white font-medium animate-button hover:shadow-lg hover:shadow-sky-500/20"
          >
            Start Converting
          </a>
          <a 
            href="#about" 
            className="px-6 py-3 rounded-lg glass text-foreground font-medium hover:bg-white/40 dark:hover:bg-white/10 animate-button"
          >
            Learn More
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-pulse-subtle">
        <a href="#converter" className="flex flex-col items-center text-foreground hover:text-sky-500 dark:hover:text-sky-400 animate-smooth">
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown size={20} className="text-sky-500 dark:text-sky-400 animate-pulse-subtle" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
