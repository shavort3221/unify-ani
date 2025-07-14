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
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn("flex gap-2 bg-muted/30 p-1 rounded-lg", className)}
      {...props}
    />
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
      // Filled button for active, outline for inactive
      "px-4 py-2 rounded-md font-medium text-sm transition focus-ring",
      "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md",
      "data-[state=inactive]:bg-transparent data-[state=inactive]:text-foreground data-[state=inactive]:border data-[state=inactive]:border-input hover:bg-accent hover:text-accent-foreground",
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
