import { z } from 'zod';

/**
 * The enquiry contract. One schema, parsed on both sides of the wire.
 *
 * The client uses it for inline validation; the route handler re-parses the raw
 * body with the same object. Client-side validation is a courtesy to the user,
 * never a guarantee to the server — but the *rules* should only exist once.
 */

/** Long enough to be a real enquiry, short enough to stay in a text column. */
const MESSAGE_MIN_LENGTH = 20;
const MESSAGE_MAX_LENGTH = 2_000;

/** Optional free-text: an untouched input posts `''`, which is not an error. */
const optionalText = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(''));

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Enter your full name.')
    .max(80, 'That name is too long.'),

  email: z.string().trim().toLowerCase().email('Enter a valid email address.'),

  phone: optionalText(32),
  company: optionalText(120),
  service: optionalText(120),

  message: z
    .string()
    .trim()
    .min(
      MESSAGE_MIN_LENGTH,
      'Tell us a little more — a sentence or two is enough.',
    )
    .max(MESSAGE_MAX_LENGTH, 'Please keep this under 2,000 characters.'),

  /**
   * Honeypot. Hidden from users and from assistive technology, so anything that
   * fills it is automated. Named plausibly on purpose — `honeypot` is a giveaway
   * to any bot that reads attribute names.
   */
  website: z
    .literal('', { errorMap: () => ({ message: 'Submission rejected.' }) })
    .optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactPayload = z.output<typeof contactSchema>;
