import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Calendar', path: '/calendar' },
  { label: 'Goals', path: '/goals' },
  { label: 'Strategy', path: '/strategy' },
  { label: 'Templates', path: '/templates' },
  { label: 'Insights', path: '/insights' },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    await signOut();
  };

  // Get user initials for avatar
  const userInitial = user?.displayName?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    'U';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <span className="text-2xl">🌸</span>
            <span className="font-headline font-bold text-lg sm:text-xl text-text-primary">
              Heartwired
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    'px-4 py-2 font-headline font-semibold text-sm rounded-md transition-all duration-fast',
                    isActive
                      ? 'text-burgundy border-b-2 border-burgundy'
                      : 'text-text-secondary hover:text-text-primary hover:bg-cream-dark'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notification Bell - Hidden on small mobile */}
            <button
              className="hidden sm:block relative p-2 text-text-secondary hover:text-text-primary transition-colors rounded-full hover:bg-cream-dark"
              aria-label="Notifications"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
            </button>

            {/* User Avatar with Dropdown */}
            <div className="relative hidden sm:block" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                {user?.profilePhotoUrl ? (
                  <img
                    src={user.profilePhotoUrl}
                    alt={user.displayName || 'Profile'}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-dusty-pink flex items-center justify-center text-white font-semibold">
                    {userInitial}
                  </div>
                )}
                <svg
                  className={clsx(
                    'w-4 h-4 text-text-secondary transition-transform',
                    userMenuOpen && 'rotate-180'
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-border py-2 z-50">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {user?.displayName || 'User'}
                    </p>
                    <p className="text-xs text-text-muted truncate">
                      {user?.email}
                    </p>
                  </div>

                  {/* Menu items */}
                  <div className="py-1">
                    <Link
                      to="/settings/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:bg-cream-dark hover:text-text-primary transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile Settings
                    </Link>
                  </div>

                  {/* Sign out */}
                  <div className="border-t border-border pt-1">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-text-secondary hover:bg-cream-dark hover:text-text-primary transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile user avatar */}
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="sm:hidden"
            >
              {user?.profilePhotoUrl ? (
                <img
                  src={user.profilePhotoUrl}
                  alt={user.displayName || 'Profile'}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-dusty-pink flex items-center justify-center text-white font-semibold text-sm">
                  {userInitial}
                </div>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <nav className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={clsx(
                      'block px-4 py-3 font-headline font-semibold text-base rounded-lg transition-all',
                      isActive
                        ? 'bg-burgundy text-white'
                        : 'text-text-secondary hover:bg-cream-dark hover:text-text-primary'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Mobile: Profile & Sign Out */}
              <div className="border-t border-border mt-2 pt-2">
                <Link
                  to="/settings/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 font-headline font-semibold text-base rounded-lg text-text-secondary hover:bg-cream-dark hover:text-text-primary transition-all"
                >
                  Profile Settings
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="block w-full text-left px-4 py-3 font-headline font-semibold text-base rounded-lg text-text-secondary hover:bg-cream-dark hover:text-text-primary transition-all"
                >
                  Sign Out
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-text-primary/20 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
