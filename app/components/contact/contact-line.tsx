import { Mail } from 'lucide-react';
import { profile } from '~/content/profile';
import { Action } from '../ui/action';
import { Container } from '../ui/container';

/** Quiet closing line for inner pages; the full contact panel lives on Home only. */
export function ContactLine() {
  return (
    <section aria-labelledby="contact-line-heading" className="no-print pt-8 pb-20 sm:pb-24">
      <Container>
        <div className="flex flex-col gap-5 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="contact-line-heading" className="font-display text-subheading font-semibold">
            Want to work together? <span className="text-accent">Get in touch.</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Action href={`mailto:${profile.email}`} size="sm">
              <Mail aria-hidden="true" className="size-4" strokeWidth={1.75} />
              Email me
            </Action>
            <Action to="/contact" variant="secondary" size="sm">
              Contact page
            </Action>
          </div>
        </div>
      </Container>
    </section>
  );
}
