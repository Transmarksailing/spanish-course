"use client";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export default function ProgressBar({ current, total, className = "" }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-2 bg-sand-dark rounded-full overflow-hidden">
        <div
          className="h-full bg-secondary rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-muted font-medium whitespace-nowrap">
        {current}/{total}
      </span>
    </div>
  );
}
