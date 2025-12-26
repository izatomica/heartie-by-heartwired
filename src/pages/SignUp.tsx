import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Input } from '@/components/ui';
import { GoogleIcon } from '@/components/icons/GoogleIcon';

export function SignUp() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');
  const { signInWithMagicLink, signInWithGoogle } = useAuth();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { error } = await signInWithMagicLink(email);

    if (error) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    } else {
      setEmailSent(true);
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    const { error } = await signInWithGoogle();
    if (error) {
      setError('Something went wrong with Google sign in.');
      setIsLoading(false);
    }
  };

  // Email sent confirmation screen
  if (emailSent) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          {/* Logo */}
          <div className="mb-8 flex items-center justify-center gap-3">
            <span className="text-4xl">🌸</span>
            <div>
              <h1 className="text-xl font-headline font-bold text-text-primary">Heartie</h1>
              <p className="text-xs text-text-muted">Marketing Planner by Heartwired</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-dusty-pink-light rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✉️</span>
            </div>

            <h1 className="font-headline text-2xl font-semibold text-text-primary mb-3">
              Check your email
            </h1>

            <p className="text-text-secondary mb-6">
              We sent a magic link to
              <br />
              <span className="font-medium text-text-primary">{email}</span>
            </p>

            <p className="text-sm text-text-muted mb-6">
              Click the link in the email to sign in. It expires in 24 hours.
            </p>

            <button
              onClick={() => setEmailSent(false)}
              className="text-burgundy hover:text-burgundy-dark text-sm font-medium transition-colors"
            >
              Use a different email
            </button>
          </div>

          <p className="mt-6 text-sm text-text-muted">
            Didn't get the email? Check your spam folder.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 flex items-center justify-center gap-3">
          <span className="text-4xl">🌸</span>
          <div>
            <h1 className="text-xl font-headline font-bold text-text-primary">Heartie</h1>
            <p className="text-xs text-text-muted">Marketing Planner by Heartwired</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h1 className="font-headline text-2xl font-semibold text-text-primary text-center mb-2">
            Marketing that finally feels like <em>you</em>.
          </h1>

          <p className="text-text-secondary text-center mb-8">
            Create your free account
          </p>

          {error && (
            <div className="bg-error/10 text-error px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <Input
              label="Your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@yourbusiness.com"
              required
              disabled={isLoading}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Continue with Email →'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-text-muted">or</span>
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <GoogleIcon className="w-5 h-5" />
            Continue with Google
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-text-muted mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-burgundy hover:text-burgundy-dark font-medium transition-colors">
            Sign in
          </Link>
        </p>

        {/* Testimonial */}
        <div className="mt-8 bg-white rounded-xl p-4 shadow-sm">
          <p className="text-text-secondary text-sm italic">
            "I've been waiting for a marketing tool that doesn't make me feel like I'm behind."
          </p>
          <p className="text-text-muted text-sm mt-2">— Sarah, Life Coach</p>
        </div>
      </div>
    </div>
  );
}
