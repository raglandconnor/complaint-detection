'use client';

import Link from 'next/link';
import { UserNav } from './components/user-nav';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <div className="border-b">
      <div className="relative flex h-16 items-center px-4">
        <div className="w-screen flex items-center space-x-4">
          <a href="/" className="font-semibold text-2xl">
            Title
          </a>
        </div>
        <div className="absolute flex flex-row gap-2 items-center right-4">
          <Link href="/login">
            <Button variant="secondary">Log In</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
          <div className="ml-2">
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
}
