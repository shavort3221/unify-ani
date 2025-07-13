
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  easing?: (t: number) => number;
}

// Easing functions
const easings = {
  linear: (t: number) => t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeOutCubic: (t: number) => 1 + (--t) * t * t,
  easeOutQuart: (t: number) => 1 - (--t) * t * t * t,
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
};

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 800,
  className,
  decimals = 2,
  prefix = '',
  suffix = '',
  easing = easings.easeOutQuart
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const startValueRef = useRef(0);
  const requestRef = useRef<number | null>(null);
  
  const formatValue = (val: number) => {
    return val.toFixed(decimals);
  };
  
  useEffect(() => {
    startValueRef.current = displayValue;
    startTimeRef.current = null;
    
    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);
      
      const nextValue = startValueRef.current + (value - startValueRef.current) * easedProgress;
      setDisplayValue(nextValue);
      
      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [value, duration, easing]);
  
  return (
    <span className={cn('tabular-nums transition-colors', className)}>
      {prefix}{formatValue(displayValue)}{suffix}
    </span>
  );
};

export default AnimatedNumber;
