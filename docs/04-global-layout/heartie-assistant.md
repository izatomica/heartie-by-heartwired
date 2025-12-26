# Heartie Bubble (AI Assistant)

## Position

**Fixed, bottom-right corner, 24px from edges**

The Heartie bubble is always accessible regardless of which page the user is on (except during onboarding).

## Collapsed State

The default state when Heartie is not actively being used.

### Visual Specifications

- **Width:** ~220px
- **Height:** ~56px
- **Background:** White
- **Border-radius:** 28px (pill shape)
- **Shadow:** var(--shadow-lg)

### Contents

- Heartie avatar (illustrated friendly female face, 40px circle)
- Preview text (greeting or latest message)
- Expand arrow icon

### Behavior

- Shows greeting or latest message preview
- Subtle pulse animation when Heartie has a suggestion
- Click anywhere on bubble to expand

### Pulse Animation

When Heartie has a suggestion:
```css
@keyframes subtle-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.heartie-bubble-with-suggestion {
  animation: subtle-pulse 2s ease-in-out infinite;
}
```

## Expanded State

The active chat interface when user is interacting with Heartie.

### Visual Specifications

- **Width:** 360px
- **Height:** 480px
- **Background:** White
- **Border-radius:** var(--radius-xl) (24px)
- **Shadow:** var(--shadow-lg)

### Layout Sections

#### Header
- **Content:** "Heartie" title + close X button
- **Height:** ~56px
- **Padding:** var(--space-4)
- **Border-bottom:** 1px solid var(--border)

#### Body (Chat Area)
- **Content:** Chat message history (scrollable)
- **Padding:** var(--space-4)
- **Scroll:** Auto-scroll to latest message
- **Background:** White

#### Footer (Input Area)
- **Content:** Text input field + send button
- **Height:** ~64px
- **Padding:** var(--space-4)
- **Border-top:** 1px solid var(--border)

### Message Styling

**Heartie's messages (left-aligned):**
```css
.heartie-message {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.heartie-message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.heartie-message-bubble {
  background: var(--cream-dark);
  color: var(--text-primary);
  padding: var(--space-3) var(--space-4);
  border-radius: 12px 12px 12px 4px;
  max-width: 240px;
}
```

**User's messages (right-aligned):**
```css
.user-message {
  display: flex;
  justify-content: flex-end;
  margin-bottom: var(--space-4);
}

.user-message-bubble {
  background: var(--burgundy);
  color: white;
  padding: var(--space-3) var(--space-4);
  border-radius: 12px 12px 4px 12px;
  max-width: 240px;
}
```

## Heartie's Personality in UI

### Tone and Voice

- **Friendly, warm, encouraging tone**
- Uses casual language:
  - "Hey!"
  - "You've got this!"
  - "Ohhh look who's back!"
  - "Love that energy!"
- **Female persona (she/her)**
- **Never pushy or critical**

### Personality Guidelines

1. **Supportive, not prescriptive** - Suggests rather than commands
2. **Celebrates wins** - Enthusiastic about progress
3. **Gentle with setbacks** - Understanding and encouraging
4. **Uses emoji sparingly** - Mostly 🌸 💜 ✨
5. **Human-first language** - Never sounds robotic

### Example Messages

**Good:**
- "Hey! I noticed you haven't posted on LinkedIn in a while. Want to brainstorm some ideas together? 🌸"
- "Wow, you hit your weekly content goal! That's awesome! 💜"
- "I see you're working on your Customer strategy. This is the fun part!"

**Avoid:**
- ❌ "You must complete your strategy to continue."
- ❌ "ERROR: No activities scheduled."
- ❌ "Reminder: 3 tasks overdue." (Too harsh)

## Interaction States

### Loading
- Show typing indicator (three animated dots)
- "Heartie is typing..."

### Error
- Friendly error message
- "Oops, I'm having trouble connecting. Mind trying that again?"

### Success (after action)
- Brief confirmation
- "Done! ✨"

## Responsive Behavior

### Desktop
- Standard size as specified above
- Fixed bottom-right corner

### Mobile
- **Collapsed:** Smaller (icon only, circular, 56px diameter)
- **Expanded:** Near full-screen modal (leaves small margin around edges)
- **Position:** Fixed bottom-right, 16px from edges

## See Also

- [Application Shell](./application-shell.md) - Heartie's position in overall layout
- [Colors](../03-design-system/colors.md) - Heartie's color palette
- [Decorative Elements](../03-design-system/decorative-elements.md) - Flower motifs and personality
- [Critical Design Rules](../11-rules/critical-design-rules.md) - Tone and voice guidelines
