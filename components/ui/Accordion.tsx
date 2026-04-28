'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Plus, Minus } from 'lucide-react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b border-rule', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

export const AccordionTrigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'group flex flex-1 items-start justify-between gap-6 py-8 text-start text-lg font-display leading-[1.3] text-paper transition-colors duration-300 hover:text-champagne data-[state=open]:text-champagne md:text-xl',
        className,
      )}
      {...props}
    >
      <span className="flex-1">{children}</span>
      <span
        aria-hidden="true"
        className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-champagne"
      >
        <Plus
          className="h-4 w-4 transition-opacity duration-300 group-data-[state=open]:opacity-0"
          strokeWidth={1}
        />
        <Minus
          className="absolute h-4 w-4 opacity-0 transition-opacity duration-300 group-data-[state=open]:opacity-100"
          strokeWidth={1}
        />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-base text-bone/80 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('max-w-prose pb-10 pe-12 leading-relaxed', className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = 'AccordionContent';
