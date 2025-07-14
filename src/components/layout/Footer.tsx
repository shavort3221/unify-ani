
import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/50 py-8 sm:py-12 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-sans font-bold text-foreground">
              TheUnitConverter
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              A sleek, modern unit conversion tool designed with simplicity and precision in mind.
            </p>
            <div className="flex space-x-4 sm:space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors touch-manipulation p-1">
                <Github size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors touch-manipulation p-1">
                <Twitter size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors touch-manipulation p-1">
                <Linkedin size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-1 block">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-1 block">About Units</a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-1 block">Conversion Formulas</a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-1 block">API</a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold text-foreground">Subscribe</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Stay updated with our latest features and conversion tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-3 sm:py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base touch-manipulation"
              />
              <button className="bg-primary text-primary-foreground px-6 py-3 sm:py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base touch-manipulation whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 sm:mt-12 pt-6 text-center text-muted-foreground">
          <p className="text-xs sm:text-sm">© {currentYear} TheUnitConverter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
