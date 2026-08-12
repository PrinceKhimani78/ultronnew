import { z } from 'zod';

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Full name must be at least 2 characters.' })
    .max(100, { message: 'Full name cannot exceed 100 characters.' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address.' })
    .max(150),
  phone: z
    .string()
    .trim()
    .min(5, { message: 'Please enter a valid phone number.' })
    .max(30, { message: 'Phone number is too long.' }),
  company: z.string().trim().max(150).optional().nullable(),
  businessType: z.string().trim().max(150).optional().nullable(),
  service: z
    .string()
    .trim()
    .min(1, { message: 'Please select a service.' })
    .max(150),
  message: z
    .string()
    .trim()
    .max(3000, { message: 'Message cannot exceed 3000 characters.' })
    .optional()
    .nullable(),
  sourcePage: z.string().trim().max(200).optional().nullable(),
  utmSource: z.string().trim().max(100).optional().nullable(),
  utmMedium: z.string().trim().max(100).optional().nullable(),
  utmCampaign: z.string().trim().max(100).optional().nullable(),
  utmTerm: z.string().trim().max(100).optional().nullable(),
  utmContent: z.string().trim().max(100).optional().nullable(),
  website: z.string().optional().nullable(), // Honeypot field
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
