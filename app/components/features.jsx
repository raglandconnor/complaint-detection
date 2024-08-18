import { Section, Container } from '@/components/craft';
import Link from 'next/link';

import { BookText, BrainCircuit, Building2, ArrowRight } from 'lucide-react';

const featureText = [
  {
    icon: <BookText className="h-6 w-6" />,
    title: 'Store complaints',
    description:
      'All you need to do is input customer service requests and complaints, and they will automatically be stored for you.',
    cta: '',
  },
  {
    icon: <BrainCircuit className="h-6 w-6" />,
    title: 'Summarize complaints',
    description:
      'Using artificial intelligence, complaints will be extracted and summarized for you.',
    cta: '',
  },
];

const singleFeatureText = [
  {
    icon: <Building2 className="h-6 w-6" />,
    title: 'Increase the efficiency of your business',
    description:
      'Using our software, your customer service department will experience a significant increase in productivity and customers will be happier.',
    cta: '',
  },
];

const Feature = () => {
  return (
    <Section>
      <Container className="not-prose">
        <div className="flex flex-col gap-6">
          <div className="mt-6 grid gap-6 md:mt-12 md:grid-cols-2">
            {featureText.map(
              ({ icon, title, description, href, cta }, index) => (
                <div
                  className="flex flex-col justify-between gap-6 rounded-lg border p-6 transition-all hover:-mt-2 hover:mb-2"
                  key={index}
                >
                  <div className="grid gap-4">
                    {icon}
                    <h4 className="text-xl text-primary">{title}</h4>
                    <p className="text-base opacity-75">{description}</p>
                  </div>
                  {cta && (
                    <div className="flex h-fit items-center text-sm font-semibold">
                      <p>{cta}</p> <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </div>
              )
            )}
          </div>
          <div>
            {singleFeatureText.map(
              ({ icon, title, description, href, cta }, index) => (
                <div
                  className="flex flex-col justify-between gap-6 rounded-lg border bg-muted/25 p-6 transition-all hover:-mt-2 hover:mb-2"
                  key={index}
                >
                  <div className="grid gap-4">
                    {icon}
                    <h4 className="text-xl text-primary">{title}</h4>
                    <p className="text-base opacity-75">{description}</p>
                  </div>
                  {cta && (
                    <div className="flex h-fit items-center text-sm font-semibold">
                      <p>{cta}</p> <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Feature;
