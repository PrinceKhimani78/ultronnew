'use client';

import { usePathname } from 'next/navigation';

interface FooterVisibilityProps {
  children: React.ReactNode;
}

export function FooterVisibility({ children }: FooterVisibilityProps) {
  const pathname = usePathname();

  // Hide footer on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return <>{children}</>;
}
