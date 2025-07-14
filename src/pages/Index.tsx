
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import UnitConverter from '@/components/converters/UnitConverter';
import DailyChallenge from '@/components/features/DailyChallenge';

const Index = () => {
  // Add scroll animation observer
  useEffect(() => {
    // Always scroll to top on initial load
    window.scrollTo(0, 0);
    
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
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
      observer.observe(el);
    });
    
    // Track conversion events (will be implemented in the UnitConverter component)
    const handleConversionComplete = (event: CustomEvent) => {
      const { conversionData } = event.detail;
      
      // Save conversion to local history
      const existingHistory = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
      const newHistory = [
        {
          id: Date.now(),
          date: new Date().toISOString().split('T')[0],
          ...conversionData
        },
        ...existingHistory
      ].slice(0, 100); // Keep only the most recent 100 conversions
      
      localStorage.setItem('conversionHistory', JSON.stringify(newHistory));
    };
    
    window.addEventListener('conversion-complete', handleConversionComplete as EventListener);
    
    return () => {
      animatedElements.forEach(el => {
        observer.unobserve(el);
      });
      window.removeEventListener('conversion-complete', handleConversionComplete as EventListener);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="hero relative py-8 sm:py-12 md:py-20 bg-gradient-to-b from-primary/10 to-background flex flex-col items-center text-center">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg className="w-full h-full opacity-20 sm:opacity-30 animate-float" viewBox="0 0 1440 320"><path fill="#38bdf8" fillOpacity="0.2" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 px-4">Convert Units with Precision</h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">A beautifully designed unit converter that transforms complex calculations into a seamless experience. Fast, accurate, and intuitive.</p>
          <div className="flex flex-col gap-3 sm:gap-4 justify-center px-4 w-full max-w-sm sm:max-w-none sm:flex-row">
            <a
              className="rounded-md px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold bg-sky-500 text-white shadow-lg hover:bg-sky-600 focus:ring-2 focus:ring-sky-300 active:scale-95 transition-all duration-200 touch-manipulation text-center"
              onClick={e => {
                e.preventDefault();
                document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' });
              }}
              href="#converter"
              role="button"
              tabIndex={0}
            >
              Start Converting
            </a>
            <a
              className="rounded-md px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold border border-sky-400 text-sky-400 bg-transparent hover:bg-sky-50/10 hover:text-white focus:ring-2 focus:ring-sky-300 active:scale-95 transition-all duration-200 touch-manipulation text-center"
              onClick={e => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              href="#features"
              role="button"
              tabIndex={0}
            >
              See Features
            </a>
          </div>
        </section>
        
        <section id="converter" className="py-8 sm:py-12 px-4 sm:px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <UnitConverter />
          </div>
        </section>
        
        <section id="features" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-12 bg-secondary/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold mb-6 sm:mb-8 text-center animate-on-scroll opacity-0">
              Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 items-center">
              <div className="animate-on-scroll opacity-0 sm:col-span-2 lg:col-span-1" style={{ transitionDelay: '100ms' }}>
                <div className="aspect-video rounded-xl overflow-hidden bg-secondary/50 flex items-center justify-center p-4">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 text-center">
                    Fast & Accurate
                  </div>
                </div>
              </div>
              <div className="animate-on-scroll opacity-0" style={{ transitionDelay: '200ms' }}>
                <div className="aspect-video rounded-xl overflow-hidden bg-secondary/50 flex items-center justify-center p-4">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 text-center">
                    Intuitive Interface
                  </div>
                </div>
              </div>
              <div className="animate-on-scroll opacity-0 sm:col-span-2 lg:col-span-1" style={{ transitionDelay: '300ms' }}>
                <div className="aspect-video rounded-xl overflow-hidden bg-secondary/50 flex items-center justify-center p-4">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 text-center">
                    Free to Use
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="challenge" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold mb-6 text-center animate-on-scroll opacity-0">
              Daily Challenge
            </h2>
            <DailyChallenge />
          </div>
        </section>
        
        <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 animate-on-scroll opacity-0">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold mb-4">
                About TheUnitConverter
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
                We created TheUnitConverter with a simple mission: to make unit conversions elegant, 
                intuitive, and precise.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="animate-on-scroll opacity-0" style={{ transitionDelay: '100ms' }}>
                <div className="aspect-video rounded-xl overflow-hidden bg-secondary/50 flex items-center justify-center p-4">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 text-center">
                    TheUnitConverter
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 sm:space-y-6 animate-on-scroll opacity-0 px-4 sm:px-0" style={{ transitionDelay: '200ms' }}>
                <p className="text-sm sm:text-base">
                  In a world of complex calculations and confusing unit conversions, we wanted to build 
                  something that embodied simplicity and elegance while delivering precise results.
                </p>
                <p className="text-sm sm:text-base">
                  Our team of designers and developers worked to create a conversion tool that feels 
                  intuitive and looks beautiful, making the conversion process a delightful experience.
                </p>
                <p className="text-sm sm:text-base">
                  We believe that tools should be both functional and aesthetically pleasing. 
                  That's why we've paid attention to every detail, from the smooth animations to 
                  the clean interface.
                </p>
                <p className="font-medium text-sm sm:text-base">
                  Whether you're a student, professional, or just someone who needs to convert units occasionally,
                  TheUnitConverter is designed to make your life easier.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0 animate-card">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold mb-6">
              Ready to Convert?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto px-4 sm:px-0">
              Start using our beautifully designed converter for all your unit conversion needs.
              It's fast, accurate, and completely free.
            </p>
            <a 
              href="#converter" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 animate-button touch-manipulation text-sm sm:text-base"
            >
              Try the Converter
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
