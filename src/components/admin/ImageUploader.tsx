'use client';

import { Loader2, Trash2, Upload } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  value: string;
  altValue?: string;
  folder: 'blog' | 'services' | 'team';
  onChange: (url: string) => void;
  onAltChange?: (alt: string) => void;
  label?: string;
};

export function ImageUploader({
  value,
  altValue = '',
  folder,
  onChange,
  onAltChange,
  label = 'Featured Image',
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Allowed MIME types
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml',
    ];
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPEG, PNG, WebP, and SVG images are allowed.');
      return;
    }

    // Size limit: 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be under 5MB.');
      return;
    }

    setError(null);
    setUploading(true);
    setProgress(30);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      setProgress(60);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setProgress(100);

      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Failed to upload image.');
      }

      onChange(data.url);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Error uploading file.';
      setError(message);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (onAltChange) onAltChange('');
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
        {label}
      </label>

      {value ? (
        <div className="space-y-3">
          <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-xs">
            <Image
              src={value}
              alt={altValue || 'Uploaded media preview'}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 rounded-lg bg-red-600 p-2 text-white shadow-md transition-transform hover:scale-105 hover:bg-red-700"
              title="Remove image"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {onAltChange && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase">
                Image Alt Text (Accessibility & SEO)
              </label>
              <input
                type="text"
                value={altValue}
                onChange={(e) => onAltChange(e.target.value)}
                placeholder="Descriptive alt text for image..."
                className="me-full mt-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="relative flex max-w-md flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-6 text-center transition-colors hover:border-[#035551] hover:bg-slate-50">
          {uploading ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <Loader2 className="h-8 w-8 animate-spin text-[#035551]" />
              <span className="text-xs font-semibold text-slate-600">
                Uploading... {progress}%
              </span>
            </div>
          ) : (
            <>
              <div className="rounded-full bg-slate-200/70 p-3 text-slate-600">
                <Upload className="h-6 w-6" />
              </div>
              <p className="mt-2 text-xs font-medium text-slate-600">
                Click to upload or drag & drop an image
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                JPEG, PNG, WebP or SVG (max 5MB)
              </p>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/svg+xml"
                onChange={handleFileChange}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
            </>
          )}
        </div>
      )}

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
