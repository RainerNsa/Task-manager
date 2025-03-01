// src/components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthProvider';
import { Button } from '@/components/UI/Button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { auth } from '@/lib/firebase';
import { LoginModal } from '@/components/LoginModal';

export default function Navbar() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <Image
                  className="h-8 w-auto"
                  src="/public/file.svg"
                  alt="Logo"
                  width={32}
                  height={32}
                  priority
                />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {!loading && (
                <>
                  {user ? (
                    <Button onClick={handleLogout}>Logout</Button>
                  ) : (
                    <Button onClick={() => setIsLoginModalOpen(true)}>Login</Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Render the LoginModal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}