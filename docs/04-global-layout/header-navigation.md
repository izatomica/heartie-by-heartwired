# Header Component

## Structure

The header is divided into three main sections: left (logo), center (navigation), and right (notifications and user menu).

### Left Section
**Heartwired logo** - Text "Heartwired" in Bricolage Grotesque with small flower icon

### Center Section
**Main navigation tabs:**
- Dashboard
- Calendar
- Goals
- Strategy
- Templates
- Insights

### Right Section
- **Notification bell icon** - Shows red badge dot when notifications are present
- **User avatar** - Circular, 36px diameter with dropdown menu

## Styling Specifications

```css
.header {
  background: white;
  height: 64px;
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-xs);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
```

### Active Navigation Item

```css
.nav-item-active {
  color: #7A2D4D;              /* Burgundy */
  text-decoration: underline;
  text-decoration-color: #7A2D4D;
  text-underline-offset: 4px;
}
```

### Inactive Navigation Item

```css
.nav-item {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 150ms ease-out;
}

.nav-item:hover {
  color: var(--text-primary);
}
```

## Navigation Behavior

- The active navigation item is indicated with burgundy text color and a matching underline
- Hover states should subtly lighten inactive items
- Mobile: Nav collapses to hamburger menu
- Active page is always clearly indicated

## Logo Specifications

- **Font**: Bricolage Grotesque, 700 weight
- **Size**: 20-24px
- **Color**: var(--text-primary)
- **Includes**: Small flower icon (16px) to the left or integrated into the wordmark

## User Avatar Dropdown

When clicked, shows dropdown menu with:
- Profile / Settings
- Help & Support
- Log out

**Dropdown styling:**
- White background
- Border-radius: var(--radius-md)
- Shadow: var(--shadow-lg)
- Padding: var(--space-2)

## Notification Bell

- **Icon size**: 20px
- **Badge**: Small red dot (8px circle) positioned at top-right of icon
- **Badge color**: var(--error) (#C06070)
- **Shows when**: User has unread notifications
- **Click behavior**: Opens notification dropdown or navigates to notifications page

## Responsive Behavior

### Desktop (≥ 1024px)
- Full horizontal nav with all items visible
- Logo + Navigation + User section all in one row

### Tablet (768px - 1023px)
- May show abbreviated labels or icons
- Maintains horizontal layout

### Mobile (< 768px)
- Logo on left
- Hamburger menu icon on right
- Notification bell and avatar in top-right
- Navigation slides out from left as overlay

## See Also

- [Application Shell](./application-shell.md) - Overall layout structure
- [Colors](../03-design-system/colors.md) - Header color specifications
- [Typography](../03-design-system/typography.md) - Logo and navigation fonts
