import { Clock, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { BandEyebrow } from '@/components/ui/BandEyebrow';
import { SITE, WHATSAPP_URL } from '@/content/site';

const CONTACT_METHODS = [
  {
    icon: Mail,
    label: 'EMAIL US',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: Phone,
    label: 'PHONE & WHATSAPP',
    value: SITE.telephone,
    href: WHATSAPP_URL,
  },
  {
    icon: MapPin,
    label: 'OFFICE LOCATION',
    value: `${SITE.address.locality}, ${SITE.address.country}`,
    href: undefined,
  },
  {
    icon: Linkedin,
    label: 'LINKEDIN',
    value: 'Ultron Financials',
    href: SITE.social.linkedin,
  },
  {
    icon: Clock,
    label: 'BUSINESS HOURS',
    value: 'Mon – Fri: 9:00 AM – 6:00 PM (GST)',
    href: undefined,
  },
] as const;

export function DirectContactInfo() {
  return (
    <Section tone="raised" className="border-y border-[#035551]/10 py-16 lg:py-24">
      <Container width="wide">
        <div className="flex flex-col items-center text-center">
          <BandEyebrow>DIRECT CONTACT</BandEyebrow>

          <h2 className="font-display mt-3 text-[clamp(1.75rem,3.8vw,40px)] leading-tight font-bold tracking-[-0.017em] text-black">
            Prefer to Speak With Us Directly?
          </h2>
        </div>

        <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {CONTACT_METHODS.map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="card-shadow-center flex h-full flex-col items-center justify-center rounded-[16px] bg-[#FDFBEE] p-6 text-center transition-all duration-300 hover:shadow-lg">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#035551] text-[#FDFBEE]">
                  <Icon className="h-5 w-5 stroke-[2]" />
                </span>
                <span className="mt-4 text-[12px] font-bold tracking-wider text-[#035551] uppercase">
                  {item.label}
                </span>
                <span className="mt-1 text-[15px] font-semibold text-black break-words">
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
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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
