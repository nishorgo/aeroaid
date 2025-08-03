'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthSession, useSignOut } from "@/lib/utils/auth-utils";
import { Menu, X } from 'react-feather';

const MenuDropdown = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthSession();
  const signOut = useSignOut();

  const handleLogout = () => {
    signOut();
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-neutral-300 font-semibold tracking-widest bg-slate-800 px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMenuOpen && (
        <div className="absolute top-full right-0 mt-2 w-36 bg-white rounded-lg shadow-lg overflow-hidden z-50">
          {user ? (
            <>
              <Link 
                href="/profile" 
                className="block px-4 py-2 text-gray-700 hover:bg-yellow-200 font-semibold tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                PROFILE
              </Link>
              <Link 
                href="/history" 
                className="block px-4 py-2 text-gray-700 hover:bg-yellow-200 font-semibold tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                HISTORY
              </Link>
              <Link 
                href="/invitations" 
                className="block px-4 py-2 text-gray-700 hover:bg-yellow-200 font-semibold tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                INVITATIONS
              </Link>
              <Link 
                href="/requests" 
                className="block px-4 py-2 text-gray-700 hover:bg-yellow-200 font-semibold tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                REQUESTS
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-yellow-200 font-semibold tracking-wide"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/signup" 
                className="block px-4 py-2 text-gray-700 hover:bg-yellow-200 font-semibold tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                SIGN UP
              </Link>
              <Link 
                href="/login" 
                className="block px-4 py-2 text-gray-700 hover:bg-yellow-200 font-semibold tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                LOGIN
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
