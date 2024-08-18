'use client';

import { MainNav } from './components/main-nav';
import { UserNav } from './components/user-nav';

export function Navbar() {
  return (
    <div className="border-b bg-white bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-40">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
}
