import { useRef, useState } from 'react';
import { clsx } from 'clsx';

export interface PhotoUploadProps {
  currentUrl?: string;
  onUpload: (file: File) => Promise<void>;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PhotoUpload({
  currentUrl,
  onUpload,
  size = 'md',
  className,
}: PhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB');
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setIsUploading(true);
    try {
      await onUpload(file);
    } catch (error) {
      console.error('Upload error:', error);
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const displayUrl = previewUrl || currentUrl;

  return (
    <div className={clsx('relative inline-block', className)}>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={clsx(
          'rounded-full overflow-hidden border-2 border-dashed transition-all',
          'hover:border-teal-dark focus:outline-none focus:ring-2 focus:ring-teal-dark focus:ring-offset-2',
          sizeClasses[size],
          displayUrl ? 'border-transparent' : 'border-border bg-cream-dark'
        )}
        disabled={isUploading}
      >
        {displayUrl ? (
          <img
            src={displayUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-text-muted">
            <svg
              className="w-6 h-6 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="text-xs">Photo</span>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-full">
            <div className="w-6 h-6 border-2 border-burgundy border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {displayUrl && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-burgundy hover:border-burgundy transition-colors shadow-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
