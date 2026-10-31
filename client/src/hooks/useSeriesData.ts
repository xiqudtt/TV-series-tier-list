import { useState, useEffect } from 'react';
import { Series } from '../types';
import { fetchSeriesBatch } from '../services/tmbd';

export const useSeriesData = (count: number) => {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSeriesBatch(count);
        if (!cancelled) setSeries(data);
      } catch (e: any) {
        if (!cancelled) setError(e.message ?? 'Ошибка загрузки');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [count]);

  return { series, loading, error };
};