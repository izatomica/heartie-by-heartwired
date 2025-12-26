import { useState, useMemo } from 'react';
import type { FunnelStage, Platform } from '../types';
import { FUNNEL_STAGES, PLATFORM_INFO } from '../types';
import { Card } from '../components/ui';

interface Template {
  id: string;
  title: string;
  description: string;
  funnelStage: FunnelStage;
  platform: Platform;
  contentPillar: string;
  content: string;
  tags: string[];
}

const TEMPLATES: Template[] = [
  // Awareness Templates
  {
    id: 'tmpl-1',
    title: 'Problem-Agitation Post',
    description: 'Highlight a common pain point your audience faces',
    funnelStage: 'awareness',
    platform: 'linkedin',
    contentPillar: 'Education',
    content: `Ever feel like [common frustration]?

You're not alone. Here's what I see happening:

→ [Problem aspect 1]
→ [Problem aspect 2]
→ [Problem aspect 3]

The truth is, [insight about the problem].

Tomorrow I'll share what actually works.

What's your biggest challenge with this?`,
    tags: ['engagement', 'pain-points', 'conversation-starter'],
  },
  {
    id: 'tmpl-2',
    title: 'Educational Carousel',
    description: 'Multi-slide post breaking down a complex topic',
    funnelStage: 'awareness',
    platform: 'instagram',
    contentPillar: 'Education',
    content: `Slide 1: [Eye-catching title with benefit]
Example: "5 Signs You're Ready to [Desired Outcome]"

Slide 2-6: [One sign per slide with brief explanation]
→ Sign 1: [Description]
→ Sign 2: [Description]
→ Sign 3: [Description]

Slide 7: [Call to action]
"Which sign resonated most? Comment below 👇"

Caption: Ready to [desired outcome]? Here are 5 signs you're on the right track...`,
    tags: ['education', 'carousel', 'visual'],
  },
  {
    id: 'tmpl-3',
    title: 'Value-First Newsletter',
    description: 'Weekly email with actionable insights',
    funnelStage: 'awareness',
    platform: 'email',
    contentPillar: 'Education',
    content: `Subject: One thing that changed my [outcome] 🌸

Hi [First Name],

Quick story:

[Personal anecdote that illustrates the problem]

Here's what I learned:

✨ [Key insight #1]
✨ [Key insight #2]
✨ [Key insight #3]

Your action step this week:
[One simple, specific action they can take]

Rooting for you,
[Your Name]

P.S. [Soft mention of your offer or upcoming content]`,
    tags: ['newsletter', 'storytelling', 'actionable'],
  },
  // Consideration Templates
  {
    id: 'tmpl-4',
    title: 'Authority Building Post',
    description: 'Share your unique perspective or methodology',
    funnelStage: 'consideration',
    platform: 'linkedin',
    contentPillar: 'Expertise',
    content: `Most people think [common belief].

I used to think that too.

But after [your experience], I discovered:

[Your unique framework/approach]

Here's how it works:

1️⃣ [Step 1 with brief explanation]
2️⃣ [Step 2 with brief explanation]
3️⃣ [Step 3 with brief explanation]

The result? [Specific outcome]

This is exactly what I teach inside [your program/offer].

Want to learn more? [CTA]`,
    tags: ['authority', 'framework', 'methodology'],
  },
  {
    id: 'tmpl-5',
    title: 'Case Study Story',
    description: 'Share a client success story (with permission)',
    funnelStage: 'consideration',
    platform: 'instagram',
    contentPillar: 'Social Proof',
    content: `Before working together, [Client Name] was [struggle].

Now? [Impressive result] 🎉

Here's how we did it:

✨ Week 1-2: [Phase 1]
✨ Week 3-4: [Phase 2]
✨ Week 5-6: [Phase 3]

The turning point was when [specific moment].

[Client quote about the experience]

Ready for your transformation? Link in bio 🌸`,
    tags: ['case-study', 'transformation', 'results'],
  },
  {
    id: 'tmpl-6',
    title: 'Myth-Busting Email',
    description: 'Challenge common misconceptions in your industry',
    funnelStage: 'consideration',
    platform: 'email',
    contentPillar: 'Expertise',
    content: `Subject: The [industry] myth that's holding you back

Hi [First Name],

Let's bust some myths today.

❌ Myth: [Common misconception]
✅ Truth: [Your expert perspective]

❌ Myth: [Common misconception]
✅ Truth: [Your expert perspective]

❌ Myth: [Common misconception]
✅ Truth: [Your expert perspective]

Here's why this matters:
[Explanation of impact]

If you're ready to [desired outcome] the RIGHT way, I can help.

[CTA to book a call or join your program]

Talk soon,
[Your Name]`,
    tags: ['myth-busting', 'expertise', 'positioning'],
  },
  // Conversion Templates
  {
    id: 'tmpl-7',
    title: 'Launch Announcement',
    description: 'Announce your offer with urgency and value',
    funnelStage: 'conversion',
    platform: 'linkedin',
    contentPillar: 'Offers',
    content: `🚀 IT'S HERE 🚀

[Offer Name] is now open.

If you've been wanting to [desired outcome], this is for you.

Inside you'll get:
✓ [Deliverable 1]
✓ [Deliverable 2]
✓ [Deliverable 3]
✓ [Bonus]

Perfect for you if:
→ You're ready to [qualifier 1]
→ You're tired of [qualifier 2]
→ You want [qualifier 3]

Spots are limited to [number] people.
Doors close [date].

Ready to join? [CTA]

Questions? Drop them below 👇`,
    tags: ['launch', 'offer', 'urgency'],
  },
  {
    id: 'tmpl-8',
    title: 'Testimonial Showcase',
    description: 'Feature client results to drive conversions',
    funnelStage: 'conversion',
    platform: 'instagram',
    contentPillar: 'Social Proof',
    content: `"[Powerful client quote about transformation]"

- [Client Name], [Their Title]

This is what happens when you [key differentiator of your offer].

[Client Name] went from [before state] to [after state] in just [timeframe].

You could be next.

[Offer name] enrollment is open for [X] more days.

→ Tap link in bio to join
→ Or DM me "READY" for details

Let's do this 🌸`,
    tags: ['testimonial', 'social-proof', 'conversion'],
  },
  {
    id: 'tmpl-9',
    title: 'Cart Close Email',
    description: 'Final urgency email before offer closes',
    funnelStage: 'conversion',
    platform: 'email',
    contentPillar: 'Offers',
    content: `Subject: [Offer] closes in 24 hours ⏰

Hi [First Name],

This is it.

In 24 hours, enrollment for [Offer Name] closes.

If you've been on the fence, here's what to know:

✨ This won't be available again until [timeframe]
✨ The [X] people who've joined are already [early result]
✨ You're one click away from [transformation]

Still deciding? Here's what past clients say:

"[Testimonial quote]" - [Client Name]

"[Testimonial quote]" - [Client Name]

The investment: [Price]
The result: [ROI or transformation]

→ [CTA Button: Claim Your Spot]

I can't wait to work with you.

[Your Name]

P.S. Questions? Just hit reply.`,
    tags: ['urgency', 'cart-close', 'scarcity'],
  },
  // Retention Templates
  {
    id: 'tmpl-10',
    title: 'Client Appreciation Post',
    description: 'Celebrate your community and wins',
    funnelStage: 'retention',
    platform: 'linkedin',
    contentPillar: 'Community',
    content: `Can we take a moment to celebrate? 🎉

This month, my clients:

🌟 [Achievement 1]
🌟 [Achievement 2]
🌟 [Achievement 3]

I'm so proud of this community.

Here's what makes them special:
→ [Quality 1]
→ [Quality 2]
→ [Quality 3]

If you're part of this journey, thank you.

Your wins are my wins. 💕

[Tag clients or invite them to share in comments]`,
    tags: ['appreciation', 'community', 'celebration'],
  },
  {
    id: 'tmpl-11',
    title: 'Behind-the-Scenes Story',
    description: 'Share your journey to build connection',
    funnelStage: 'retention',
    platform: 'instagram',
    contentPillar: 'Behind-the-scenes',
    content: `Real talk: [Vulnerable admission about your business/life]

I don't share this to complain.
I share it because I know you get it.

Building [your business/offer] while [your reality] isn't always Instagram-perfect.

Some days look like:
→ [Real moment 1]
→ [Real moment 2]
→ [Real moment 3]

But here's what keeps me going:
[Your why + how clients are part of it]

Thank you for being here 🌸

What keeps YOU going? I'd love to know 👇`,
    tags: ['vulnerable', 'authentic', 'connection'],
  },
  {
    id: 'tmpl-12',
    title: 'Value Check-in Email',
    description: 'Nurture your list with pure value',
    funnelStage: 'retention',
    platform: 'email',
    contentPillar: 'Nurture',
    content: `Subject: Checking in + a resource for you 💌

Hi [First Name],

No pitch today. Just checking in.

How are you doing with [relevant goal/challenge]?

I've been thinking about you and wanted to share:

🎁 [Free resource/tip/insight]

[Brief explanation of the resource and how to use it]

That's it. That's the email.

You're doing great, even when it doesn't feel like it.

Rooting for you always,
[Your Name]

P.S. If you ever want to chat about [topic], just hit reply. I read every email.`,
    tags: ['nurture', 'value', 'relationship'],
  },
];

export function Templates() {
  const [selectedFunnelStages, setSelectedFunnelStages] = useState<Set<FunnelStage>>(
    new Set(['awareness', 'consideration', 'conversion', 'retention'])
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<Platform>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((template) => {
      // Filter by funnel stage
      if (!selectedFunnelStages.has(template.funnelStage)) return false;

      // Filter by platform
      if (selectedPlatforms.size > 0 && !selectedPlatforms.has(template.platform)) return false;

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          template.title.toLowerCase().includes(query) ||
          template.description.toLowerCase().includes(query) ||
          template.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [selectedFunnelStages, selectedPlatforms, searchQuery]);

  const toggleFunnelStage = (stage: FunnelStage) => {
    const newStages = new Set(selectedFunnelStages);
    if (newStages.has(stage)) {
      newStages.delete(stage);
    } else {
      newStages.add(stage);
    }
    setSelectedFunnelStages(newStages);
  };

  const togglePlatform = (platform: Platform) => {
    const newPlatforms = new Set(selectedPlatforms);
    if (newPlatforms.has(platform)) {
      newPlatforms.delete(platform);
    } else {
      newPlatforms.add(platform);
    }
    setSelectedPlatforms(newPlatforms);
  };

  const handleUseTemplate = (template: Template) => {
    // Placeholder - would integrate with Calendar to create new activity
    alert(`Using template: ${template.title}\n\nThis would open the Add Activity modal with pre-filled content.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-headline font-bold text-text-primary mb-2">
          Template Library
        </h1>
        <p className="text-text-secondary">
          Ready-to-use templates for every stage of your marketing funnel.
        </p>
      </div>

      {/* Filters & Search */}
      <Card>
        <div className="space-y-4">
          {/* Search Bar */}
          <div>
            <input
              type="text"
              className="input"
              placeholder="Search templates by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Funnel Stage Filter */}
          <div>
            <p className="text-sm font-medium text-text-primary mb-2">Filter by Funnel Stage:</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(FUNNEL_STAGES).map(([stage, info]) => {
                const isActive = selectedFunnelStages.has(stage as FunnelStage);
                return (
                  <button
                    key={stage}
                    onClick={() => toggleFunnelStage(stage as FunnelStage)}
                    className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                    style={{
                      backgroundColor: isActive ? info.color : 'white',
                      color: isActive ? '#FFFFFF' : 'var(--color-text-secondary)',
                      border: `2px solid ${info.color}`,
                    }}
                  >
                    {info.emoji} {info.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Platform Filter */}
          <div>
            <p className="text-sm font-medium text-text-primary mb-2">Filter by Platform:</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(PLATFORM_INFO).map(([platform, info]) => {
                const isActive = selectedPlatforms.has(platform as Platform);
                return (
                  <button
                    key={platform}
                    onClick={() => togglePlatform(platform as Platform)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-teal-dark text-white'
                        : 'bg-white text-text-secondary border-2 border-border hover:border-teal-dark'
                    }`}
                  >
                    {info.icon} {info.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <p className="text-sm text-text-muted">
              Showing {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
            </p>
            {(selectedPlatforms.size > 0 || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedPlatforms(new Set());
                  setSearchQuery('');
                }}
                className="text-sm text-burgundy hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => {
            const stageInfo = FUNNEL_STAGES[template.funnelStage];
            const platformInfo = PLATFORM_INFO[template.platform];

            return (
              <Card key={template.id} hover className="cursor-pointer" onClick={() => setSelectedTemplate(template)}>
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-headline font-semibold text-text-primary flex-1">
                      {template.title}
                    </h3>
                    <span className="text-xl">{platformInfo.icon}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-secondary line-clamp-2">{template.description}</p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: stageInfo.color }}
                    >
                      {stageInfo.emoji} {stageInfo.name}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-cream-dark text-text-secondary">
                      {template.contentPillar}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs text-text-muted">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      className="btn-secondary flex-1 text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplate(template);
                      }}
                    >
                      Preview
                    </button>
                    <button
                      className="btn-primary flex-1 text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUseTemplate(template);
                      }}
                    >
                      Use Template
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🔍</span>
            <h2 className="text-xl font-headline font-semibold text-text-primary mb-2">
              No templates found
            </h2>
            <p className="text-text-secondary">
              Try adjusting your filters or search query.
            </p>
          </div>
        </Card>
      )}

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <>
          <div
            className="fixed inset-0 bg-text-primary/50 backdrop-blur-sm z-40"
            onClick={() => setSelectedTemplate(null)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
            <div
              className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-headline font-semibold text-text-primary">
                      {selectedTemplate.title}
                    </h2>
                    <span className="text-2xl">{PLATFORM_INFO[selectedTemplate.platform].icon}</span>
                  </div>
                  <p className="text-sm text-text-secondary">{selectedTemplate.description}</p>
                </div>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-text-secondary hover:text-text-primary transition-colors ml-4"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Meta Information */}
                <div className="flex flex-wrap gap-2">
                  <span
                    className="px-3 py-1.5 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: FUNNEL_STAGES[selectedTemplate.funnelStage].color }}
                  >
                    {FUNNEL_STAGES[selectedTemplate.funnelStage].emoji}{' '}
                    {FUNNEL_STAGES[selectedTemplate.funnelStage].name}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-teal-dark text-white">
                    {PLATFORM_INFO[selectedTemplate.platform].icon}{' '}
                    {PLATFORM_INFO[selectedTemplate.platform].name}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-cream-dark text-text-secondary">
                    {selectedTemplate.contentPillar}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.tags.map((tag) => (
                    <span key={tag} className="text-sm text-text-muted">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Content Preview */}
                <div>
                  <h3 className="font-headline font-semibold text-text-primary mb-3">
                    Template Content:
                  </h3>
                  <div className="bg-cream-dark rounded-lg p-6">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-text-primary leading-relaxed">
                      {selectedTemplate.content}
                    </pre>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="btn-secondary flex-1"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleUseTemplate(selectedTemplate)}
                    className="btn-primary flex-1"
                  >
                    Use This Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
