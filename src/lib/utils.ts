import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Conditional class names with Tailwind conflict resolution.
 *
 * `clsx` flattens the conditionals; `twMerge` then resolves collisions so a
 * caller's `px-8` beats a component's default `px-4` instead of both landing in
 * the class list and letting stylesheet order decide.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * `absoluteUrl` lives in `lib/seo.ts`, not here. This module is imported by
 * Client Components for `cn()`, and pulling the validated environment into that
 * graph would drag server config into the browser bundle.
 */
