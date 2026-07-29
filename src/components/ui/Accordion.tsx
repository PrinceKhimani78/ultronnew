'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Disclosure list, built on Radix.
 *
 * Radix rather than a hand-rolled `useState` toggle because the keyboard
 * contract is genuinely intricate — arrow-key roving focus, Home/End, correct
 * `aria-expanded` and `aria-controls` wiring, and a trigger that is a real
 * `<button>` inside a heading. Reimplementing that is how accordions end up
 * inaccessible.
 *
 * Height animation is CSS, driven by the `--radix-accordion-content-height`
 * variable Radix sets. It animates `height`, which does trigger layout — the one
 * deliberate exception to the transform/opacity rule in PROJECT.md, because the
 * alternative (a transform-based fake) misreports the element's size to
 * assistive technology and to the scroll container.
 */

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn('border-line border-b', className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    // Radix requires the trigger to sit inside a heading element so the list is
    // navigable by heading in a screen reader.
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'group flex flex-1 items-start justify-between gap-6 py-6 text-left',
          'font-display text-lg leading-snug font-medium tracking-tight',
          'ease-house hover:text-brand transition-colors',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          aria-hidden="true"
          className="text-ink-muted ease-house mt-1 h-5 w-5 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden"
      {...props}
    >
      <div
        className={cn(
          'text-ink-muted max-w-2xl pb-6 leading-relaxed',
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
