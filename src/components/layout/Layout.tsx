import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import './Layout.css';

export interface LayoutProps {
  children: ReactNode;
}

const mainNavItems = [
  { label: 'Dashboard', path: '/dashboard', icon: 'mdi:view-dashboard-outline' },
  { label: 'Calendar', path: '/calendar', icon: 'mdi:calendar-outline' },
  { label: 'Goals', path: '/goals', icon: 'mdi:target' },
  { label: 'Strategy', path: '/strategy', icon: 'mdi:lightbulb-outline' },
];

const toolNavItems = [
  { label: 'Templates', path: '/templates', icon: 'mdi:file-document-outline' },
  { label: 'Insights', path: '/insights', icon: 'mdi:chart-line' },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userInitial = user?.displayName?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    'U';

  const handleSignOut = async () => {
    await signOut();
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <span style={{ fontSize: '24px' }}>🌸</span>
          </div>
          <div className="sidebar-logo-text">
            <span>Heartie</span>
            <span>by Heartwired</span>
          </div>
        </div>
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <iconify-icon icon={mobileMenuOpen ? 'mdi:close' : 'mdi:menu'} width="24" height="24" />
        </button>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${mobileMenuOpen ? 'visible' : ''}`}
        onClick={closeMobileMenu}
      />

      <div id="app-shell">
        {/* Sidebar */}
        <aside id="sidebar" className={mobileMenuOpen ? 'expanded' : ''}>
          {/* Logo */}
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <span style={{ fontSize: '28px' }}>🌸</span>
            </div>
            <div className="sidebar-logo-text">
              <span>Heartie</span>
              <span>by Heartwired</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="sidebar-nav">
            <div className="sidebar-section-title">Main</div>
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <iconify-icon icon={item.icon} width="18" height="18" />
                {item.label}
              </Link>
            ))}

            <div className="sidebar-section-title">Tools</div>
            {toolNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <iconify-icon icon={item.icon} width="18" height="18" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* New Idea Button */}
          <button className="sidebar-new-idea">
            <iconify-icon icon="mdi:plus" width="16" height="16" />
            New idea
          </button>

          {/* Footer with User */}
          <div className="sidebar-footer">
            <Link
              to="/settings/profile"
              className="sidebar-user"
              onClick={closeMobileMenu}
            >
              {user?.profilePhotoUrl ? (
                <img
                  src={user.profilePhotoUrl}
                  alt={user.displayName || 'Profile'}
                  className="sidebar-user-avatar"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div className="sidebar-user-avatar">
                  {userInitial}
                </div>
              )}
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">{user?.displayName || 'User'}</div>
                <div className="sidebar-user-email">{user?.email || ''}</div>
              </div>
            </Link>

            <button
              className="sidebar-nav-item"
              onClick={handleSignOut}
              style={{ marginTop: '8px' }}
            >
              <iconify-icon icon="mdi:logout" width="18" height="18" />
              Log out
            </button>
          </div>
        </aside>

        {/* Main Surface */}
        <div id="main-surface">
          <div id="main-content">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
