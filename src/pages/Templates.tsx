import { Card } from '../components/ui';

export function Templates() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold text-text-primary mb-2">
          Template Library
        </h1>
        <p className="text-text-secondary">
          Ready-to-use templates for every stage of your funnel.
        </p>
      </div>

      <Card>
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">📝</span>
          <h2 className="text-xl font-headline font-semibold text-text-primary mb-2">
            Templates Coming Soon
          </h2>
          <p className="text-text-secondary">
            This feature is under development.
          </p>
        </div>
      </Card>
    </div>
  );
}
