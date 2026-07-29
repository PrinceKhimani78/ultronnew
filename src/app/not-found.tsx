import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';

/**
 * 404. Styled rather than default, because an unstyled framework error page on
 * a firm's site reads as neglect.
 */
export default function NotFound() {
  return (
    <main id="content" className="flex flex-1 items-center">
      <Section spacing="spacious" className="w-full">
        <Container width="narrow">
          <p className="text-ink-muted text-sm tracking-[0.18em] uppercase">
            Error 404
          </p>
          <h1 className="font-display mt-6 text-[clamp(2rem,5vw,3.5rem)] leading-tight font-medium tracking-tight">
            That page does not exist.
          </h1>
          <p className="text-ink-muted mt-6 max-w-lg text-lg leading-relaxed">
            The link may be out of date, or the page may have moved. Everything
            else is where you left it.
          </p>
          <div className="mt-10">
            <Button asChild size="lg">
              <Link href="/">Back to the home page</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
