"use client";

import { useEffect, useState } from "react";

/**
 * Debounce any changing value.
 * Returns a new value that only updates after `delayMs` of no changes.
 */
export function useDebounce<T>(value: T, delayMs = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);

  return debouncedValue;
}

