'use client';

import { LucideMoon, LucideSun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <LucideSun className="h-4 w-4 rotate-0 scale-100 transition-all dark:scale-0 dark:rotate-90" />
      <LucideMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:scale-100 dark:rotate-0" />
    </Button>
  );
}

export { ThemeSwitcher };
