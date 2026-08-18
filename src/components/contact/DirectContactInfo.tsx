import { Clock, Mail, MapPin, Phone } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { BandEyebrow } from '@/components/ui/BandEyebrow';
import { SITE } from '@/content/site';
import { type PublicSiteSettings } from '@/lib/cms-data';

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface DirectContactInfoProps {
  settings?: PublicSiteSettings;
}

export function DirectContactInfo({ settings = SITE }: DirectContactInfoProps) {
  const email = settings.header?.email || settings.email;
  const telephone = settings.header?.phone || settings.telephone;
  const address = settings.address;
  const linkedin = settings.social?.linkedin || SITE.social.linkedin;
  const workingHours =
    settings.workingHours || 'Mon – Fri: 9:00 AM – 6:00 PM (GST)';
  const googleMapsUrl = settings.googleMapsUrl;

  const rawWhatsapp =
    settings.cta?.whatsappNumber || settings.whatsapp || telephone;
  const whatsappUrl = `https://wa.me/${rawWhatsapp.replace(/\D/g, '')}`;

  const contactMethods = [
    {
      icon: Mail,
      label: 'EMAIL US',
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: Phone,
      label: 'PHONE & WHATSAPP',
      value: telephone,
      href: whatsappUrl,
    },
    {
      icon: MapPin,
      label: 'OFFICE LOCATION',
      value: address.streetAddress || `${address.locality}, ${address.country}`,
      href: googleMapsUrl || undefined,
    },
    {
      icon: LinkedinIcon,
      label: 'LINKEDIN',
      value: settings.name,
      href: linkedin,
    },
    {
      icon: Clock,
      label: 'BUSINESS HOURS',
      value: workingHours,
      href: undefined,
    },
  ];

  return (
    <Section
      tone="raised"
      className="border-y border-[#035551]/10 py-16 lg:py-24"
    >
      <Container width="wide">
        <div className="flex flex-col items-center text-center">
          <BandEyebrow>DIRECT CONTACT</BandEyebrow>

          <h2 className="heading-h2 mt-3 text-black">
            Prefer to Speak With Us Directly?
          </h2>
        </div>

        <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {contactMethods.map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="card-shadow-center flex h-full flex-col items-center justify-center rounded-[16px] bg-[#FDFBEE] p-6 text-center transition-all duration-300 hover:shadow-lg">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#035551] text-[#FDFBEE]">
                  <Icon className="h-5 w-5 stroke-[2]" />
                </span>
                <span className="mt-4 text-[12px] font-bold tracking-wider text-[#035551] uppercase">
                  {item.label}
                </span>
                <span className="mt-1 text-[15px] font-semibold break-words text-black">
                  {item.value}
                </span>
              </div>
            );

            return (
              <StaggerItem key={item.label} className="h-full">
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      item.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="block h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DCCB8E]"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
