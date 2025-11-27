import { useEffect, useMemo, useState } from 'react';

type ChecklistProgress = Record<string, string[]>;

const STORAGE_KEY = 'meta-talent-roadmap-progress';

const readProgress = (): ChecklistProgress => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ChecklistProgress) : {};
  } catch {
    return {};
  }
};

export const useRoadmapProgress = () => {
  const [progress, setProgress] = useState<ChecklistProgress>(() => readProgress());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const toggleItem = (stepId: string, item: string) => {
    setProgress((prev) => {
      const current = prev[stepId] ?? [];
      const exists = current.includes(item);
      const nextItems = exists ? current.filter((entry) => entry !== item) : [...current, item];
      return { ...prev, [stepId]: nextItems };
    });
  };

  const resetProgress = () => setProgress({});

  const completionStats = useMemo(() => {
    const totalItems = Object.values(progress).reduce((acc, items) => acc + items.length, 0);
    return { totalItems };
  }, [progress]);

  return {
    progress,
    toggleItem,
    resetProgress,
    completionStats,
  };
};

