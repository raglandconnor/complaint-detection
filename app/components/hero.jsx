import Link from 'next/link';
import Image from 'next/image';

import Balancer from 'react-wrap-balancer';

import { Section, Container } from '@/components/craft';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <Section>
      <Container className="flex flex-col items-center text-center">
        {/* <Image
          src={'/public'}
          width={172}
          height={72}
          alt="Company Logo"
          className="not-prose mb-6 dark:invert md:mb-8"
        /> */}
        <h1 className="!mb-4 text-4xl lg:text-5xl">
          <Balancer>Zeal - AI Complaint Detection</Balancer>
        </h1>
        <h3 className="text-muted-foreground text-xl lg:text-2xl">
          <Balancer>
            Improve your customer service with our AI-powered complaint
            detection service.
          </Balancer>
        </h3>
        <div className="not-prose mt-6 flex gap-2 md:mt-12">
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button variant={'ghost'} asChild>
            <Link href="/#features">Learn More -{'>'}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
