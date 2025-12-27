import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import './Layout.css';

export interface LayoutProps {
  children: ReactNode;
}

// Main navigation items with Lucide icons
const mainNavItems = [
  { label: 'Dashboard', path: '/dashboard', icon: 'lucide:layout-dashboard' },
  { label: 'Calendar', path: '/calendar', icon: 'lucide:calendar' },
  { label: 'Goals', path: '/goals', icon: 'lucide:target' },
  { label: 'Strategy', path: '/strategy', icon: 'lucide:layers' },
  { label: 'Templates', path: '/templates', icon: 'lucide:files' },
  { label: 'Insights', path: '/insights', icon: 'lucide:bar-chart' },
];

// Tools section items
const toolNavItems = [
  { label: 'Heartie', path: '/chat', icon: 'lucide:message-circle' },
  { label: 'Settings', path: '/settings', icon: 'lucide:settings' },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleSidebarMouseEnter = () => {
    setSidebarHovered(true);
  };

  const handleSidebarMouseLeave = () => {
    setSidebarHovered(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">H</div>
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
          <iconify-icon icon={mobileMenuOpen ? 'lucide:x' : 'lucide:menu'} width="24" height="24" />
        </button>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${mobileMenuOpen ? 'visible' : ''}`}
        onClick={closeMobileMenu}
      />

      <div id="app-shell">
        {/* Sidebar */}
        <aside
          id="sidebar"
          className={`${mobileMenuOpen ? 'expanded' : ''} ${sidebarHovered ? 'hover-expanded' : ''}`}
          onMouseEnter={handleSidebarMouseEnter}
          onMouseLeave={handleSidebarMouseLeave}
        >
          {/* Logo */}
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">H</div>
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
                <iconify-icon icon={item.icon} width="20" height="20" />
                <span className="nav-label">{item.label}</span>
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
                <iconify-icon icon={item.icon} width="20" height="20" />
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Sparkles / New Idea Button */}
          <button className="sidebar-new-idea">
            <iconify-icon icon="lucide:sparkles" width="18" height="18" />
            <span className="button-label">New idea</span>
          </button>

          {/* Footer */}
          <div className="sidebar-footer">
            <button
              className="sidebar-nav-item"
              onClick={handleSignOut}
            >
              <iconify-icon icon="lucide:log-out" width="20" height="20" />
              <span className="nav-label">Log out</span>
            </button>
          </div>
        </aside>

        {/* Main Surface */}
        <div id="main-surface" className={sidebarHovered ? 'sidebar-expanded' : ''}>
          <div id="main-content">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
