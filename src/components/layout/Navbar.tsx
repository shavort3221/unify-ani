
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, User, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check if user prefers dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSignOut = () => {
    signOut().then(() => {
      navigate('/');
    });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Converter', href: '#converter' },
    { name: 'About', href: '#about' }
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Close mobile menu after navigation
    }
  };

  const authLinks = isSignedIn
    ? [
        { name: 'Dashboard', href: '/dashboard', icon: <User size={16} className="mr-1" /> },
        { name: 'Sign Out', onClick: handleSignOut }
      ]
    : [
        { name: 'Sign In', href: '/sign-in', icon: <LogIn size={16} className="mr-1" /> },
        { name: 'Sign Up', href: '/sign-up' }
      ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 md:px-12',
        isScrolled ? 'py-2 sm:py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-sm' : 'py-3 sm:py-5'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between min-h-[48px]">
        <a 
          href="#" 
          className="flex items-center text-lg sm:text-xl md:text-2xl font-sans font-bold text-foreground transition-all hover-lift"
        >
          <img 
            src="/lovable-uploads/eaf6fae9-0c13-4c84-8240-280c1c69018b.png" 
            alt="Revino Logo" 
            className={cn(
              "h-8 sm:h-10 mr-2 transition-all",
            )}
            style={{ 
              objectFit: 'contain', 
              filter: isDarkMode ? 'invert(1) brightness(1.5)' : 'none' 
            }}
          />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 hidden sm:inline">
            TheUnitConverter
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 sm:hidden">
            Unify
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="text-foreground/80 hover:text-blue-500 dark:hover:text-blue-400 font-medium text-sm xl:text-base animate-smooth nav-item-hover"
            >
              {link.name}
            </a>
          ))}
          
          <div className="h-5 w-px bg-gray-300 dark:bg-gray-700 mx-1 xl:mx-2"></div>
          
          {authLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={link.onClick}
              className="flex items-center text-foreground/80 hover:text-blue-500 dark:hover:text-blue-400 font-medium text-sm xl:text-base animate-smooth nav-item-hover"
            >
              {link.icon && link.icon}
              {link.name}
            </a>
          ))}
          
          <button
            onClick={toggleDarkMode}
            className="ml-2 xl:ml-4 p-2 rounded-full bg-secondary hover:bg-blue-100 dark:hover:bg-blue-900/30 animate-button hover-lift"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-secondary hover:bg-blue-100 dark:hover:bg-blue-900/30 animate-button touch-manipulation"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full bg-secondary hover:bg-blue-100 dark:hover:bg-blue-900/30 animate-button touch-manipulation"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-sm z-40 animate-smooth flex flex-col pt-20 px-6 lg:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                handleSmoothScroll(e, link.href);
              }}
              className="text-foreground text-xl font-medium animate-smooth hover:text-blue-500 dark:hover:text-blue-400 py-2 touch-manipulation"
            >
              {link.name}
            </a>
          ))}
          
          <div className="h-px w-full bg-gray-200 dark:bg-gray-800 my-4"></div>
          
          {authLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                if (link.onClick) {
                  e.preventDefault();
                  link.onClick();
                }
                setIsMenuOpen(false);
              }}
              className="flex items-center text-foreground text-xl font-medium animate-smooth hover:text-blue-500 dark:hover:text-blue-400 py-2 touch-manipulation"
            >
              {link.icon && <span className="mr-3">{link.icon}</span>}
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
