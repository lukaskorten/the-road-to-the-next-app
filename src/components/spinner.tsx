import { LucideLoaderCircle } from 'lucide-react';

export function Spinner() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center self-center">
      <LucideLoaderCircle className="w-10 h-10 animate-spin" />
    </div>
  );
}
