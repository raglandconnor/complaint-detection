'use client';

import { UserNav } from './components/user-nav';

export function Navbar() {
  return (
    <div className="border-b">
      <div className="relative flex h-16 items-center px-4">
        <div className="w-screen flex items-center space-x-4">
          <a href="/" className="font-semibold text-2xl">
            Title
          </a>
        </div>
        <div className="absolute right-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
}
