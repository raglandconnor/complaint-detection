import * as React from 'react';

// cn util
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Layout = ({ children, className }) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('scroll-smooth antialiased focus:scroll-auto', className)}
    >
      {children}
    </html>
  );
};

const Main = ({ children, className, id }) => {
  return (
    <main
      className={cn(
        // `Main` Specific Styles
        'max-w-none prose-p:m-0',
        // General Prose
        'prose:font-sans prose prose-neutral dark:prose-invert xl:prose-lg',
        // Prose Headings
        'prose-headings:font-normal',
        // Prose Strong
        'prose-strong:font-semibold',
        // Inline Links
        'prose-a:text-foreground/75 prose-a:underline prose-a:decoration-primary/50 prose-a:underline-offset-2 prose-a:transition-all',
        // Inline Link Hover
        'hover:prose-a:text-foreground hover:prose-a:decoration-primary',
        // Blockquotes
        'prose-blockquote:not-italic',
        // Pre and Code Blocks
        'prose-pre:border prose-pre:bg-muted/25 prose-pre:text-foreground',
        className
      )}
      id={id}
    >
      {children}
    </main>
  );
};

const Section = ({ children, className, id }) => {
  return (
    <section className={cn('py-8 md:py-12', className)} id={id}>
      {children}
    </section>
  );
};

const Container = ({ children, className, id }) => {
  return (
    <div className={cn('mx-auto max-w-5xl', 'p-6 sm:p-8', className)} id={id}>
      {children}
    </div>
  );
};

const Article = ({ children, className, id }) => {
  return (
    <article
      className={cn(
        // General Prose
        'prose:font-sans prose prose-neutral max-w-none dark:prose-invert xl:prose-lg',
        // Prose Headings
        'prose-headings:font-normal',
        // Prose Paragraphs
        'prose-p:mb-0',
        // Prose Strong
        'prose-strong:font-semibold',
        // Prose Images
        'prose-img: prose-img:m-0',
        // Inline Links
        'prose-a:text-foreground/75 prose-a:underline prose-a:decoration-primary/50 prose-a:underline-offset-2 prose-a:transition-all',
        // Inline Link Hover
        'hover:prose-a:text-foreground hover:prose-a:decoration-primary',
        // Blockquotes
        'prose-blockquote:not-italic',
        // Pre and Code Blocks
        'prose-pre:border prose-pre:bg-muted/25',
        className
      )}
      id={id}
    >
      {children}
    </article>
  );
};

export { Layout, Main, Section, Container, Article };
