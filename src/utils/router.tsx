import React, { useState, useEffect } from 'react';

// Maps human-readable URLs to numeric journal post IDs
export const slugToIdMap: Record<string, number> = {
  "physics-of-sound-absorption": 1,
  "sustainable-forestry": 2,
  "crafting-calm-residential-spaces": 3
};

export const idToSlugMap: Record<number, string> = {
  1: "physics-of-sound-absorption",
  2: "sustainable-forestry",
  3: "crafting-calm-residential-spaces"
};

export function navigateTo(path: string) {
  window.history.pushState(null, '', path);
  window.dispatchEvent(new Event('pushstate'));
  
  // Instantly scroll to top for new route transitions
  window.scrollTo({ top: 0 });
}

// Custom event-aware hook to keep track of current location pathname
export function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pushstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate', handleLocationChange);
    };
  }, []);

  return pathname;
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export function Link({ href, children, ...props }: LinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Allow external links, ctrl+click, command+click, etc. to open normally
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    navigateTo(href);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
