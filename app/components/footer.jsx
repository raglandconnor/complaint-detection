import Link from 'next/link';
import { Section, Container } from '@/components/craft';

export default function Footer() {
  return (
    <footer className="not-prose mt-56 border-t">
      <Section>
        <Container className="grid gap-6">
          <div className="grid gap-6">
            <Link href="/">
              <h1 className="text-2xl">[app name]</h1>
            </Link>
            <div className="mb-6 flex flex-col gap-4 text-sm text-muted-foreground underline underline-offset-4 md:mb-0 md:flex-row">
              <Link href="/">Home</Link>
              <Link href="/login">Login</Link>
              <Link href="/signup">Sign Up</Link>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground md:flex-row">
            <p className="mr-2">Created by: </p>
            <p>
              <a
                href="https://www.linkedin.com/in/lhkhoi95/"
                className="underline hover:text-slate-700"
                target="_blank"
              >
                Khoi Ly
              </a>
            </p>

            <p>
              <a
                href="https://nisargoza.github.io/dev/"
                className="underline hover:text-slate-700"
                target="_blank"
              >
                Nisarg Oza
              </a>
            </p>
            <p>
              <a
                href="https://www.raglandconnor.com/"
                className="underline hover:text-slate-700"
                target="_blank"
              >
                Connor Ragland
              </a>
            </p>
            <p>
              <a
                href="/"
                className="underline hover:text-slate-700"
                target="_blank"
              >
                Angel Martinez
              </a>
            </p>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
