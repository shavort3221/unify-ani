import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useRef, useLayoutEffect, useState } from 'react';

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [underlineProps, setUnderlineProps] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const active = container.querySelector('[data-state="active"]') as HTMLElement;
    if (active) {
      const { offsetLeft, offsetWidth } = active;
      if (
        underlineProps.left !== offsetLeft ||
        underlineProps.width !== offsetWidth
      ) {
        setUnderlineProps({ left: offsetLeft, width: offsetWidth });
      }
      const children = Array.from(container.children);
      const newIndex = children.indexOf(active);
      if (activeIndex !== newIndex) {
        setActiveIndex(newIndex);
      }
    }
    // Only run when the children or underlineProps/activeIndex change
  }, [props.children, underlineProps.left, underlineProps.width, activeIndex]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <TabsPrimitive.List ref={ref} {...props} />
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute bottom-0 h-1 rounded bg-primary"
        style={{ left: underlineProps.left, width: underlineProps.width }}
      />
    </div>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background animate-tab focus-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-background/50 hover:text-foreground/80 relative overflow-hidden",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  // AnimatePresence for tab content
  return (
    <AnimatePresence mode="wait" initial={false}>
      <TabsPrimitive.Content forceMount ref={ref} {...props} asChild>
        <motion.div
          key={props.value}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className={cn("mt-2 ring-offset-background focus-ring animate-fade-in", className)}
        >
          {children}
        </motion.div>
      </TabsPrimitive.Content>
    </AnimatePresence>
  )
})
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
