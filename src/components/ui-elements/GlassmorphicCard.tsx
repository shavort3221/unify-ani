
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'highlighted' | 'subtle' | 'colorful';
  size?: 'sm' | 'md' | 'lg';
  borderGlow?: boolean;
  colorScheme?: 'primary' | 'secondary' | 'accent' | 'gradient';
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({ 
  children, 
  className,
  hover = false,
  variant = 'default',
  size = 'md',
  borderGlow = false,
  colorScheme = 'primary'
}) => {
  return (
    <div
      className={cn(
        "backdrop-blur-lg rounded-xl transition-all duration-300",
        {
          // Size variants
          "p-4": size === 'sm',
          "p-6": size === 'md',
          "p-8": size === 'lg',
          
          // Style variants
          "bg-white/90 dark:bg-gray-900/80": variant === 'default',
          "bg-white/95 dark:bg-gray-900/90 shadow-md": variant === 'highlighted',
          "bg-white/80 dark:bg-gray-900/70": variant === 'subtle',
          "bg-gradient-to-br from-sky-50 to-sky-100/80 dark:from-sky-950/40 dark:to-sky-900/30": variant === 'colorful',
          
          // Hover effects - enhanced
          "hover:shadow-lg hover:-translate-y-1 hover:shadow-sky-500/10 dark:hover:shadow-sky-400/5": hover,
          
          // Border glow effect by color scheme
          "border": borderGlow,
          "border-sky-500/10 hover:border-sky-500/30 dark:border-sky-400/10 dark:hover:border-sky-400/30": borderGlow && colorScheme === 'primary',
          "border-cyan-500/10 hover:border-cyan-500/30 dark:border-cyan-400/10 dark:hover:border-cyan-400/30": borderGlow && colorScheme === 'secondary',
          "border-purple-500/10 hover:border-purple-500/30 dark:border-purple-400/10 dark:hover:border-purple-400/30": borderGlow && colorScheme === 'accent',
          "border-gradient-to-r from-sky-500/10 to-cyan-500/10 hover:from-sky-500/30 hover:to-cyan-500/30": borderGlow && colorScheme === 'gradient',
          
          // Color schemes with subtle background tints
          "bg-sky-50/50 dark:bg-sky-950/20": variant !== 'colorful' && colorScheme === 'primary',
          "bg-cyan-50/50 dark:bg-cyan-950/20": variant !== 'colorful' && colorScheme === 'secondary',
          "bg-purple-50/50 dark:bg-purple-950/20": variant !== 'colorful' && colorScheme === 'accent',
          "bg-gradient-to-br from-sky-50/50 via-cyan-50/30 to-sky-50/40 dark:from-sky-950/30 dark:via-cyan-950/20 dark:to-sky-950/10": variant !== 'colorful' && colorScheme === 'gradient',
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassmorphicCard;
