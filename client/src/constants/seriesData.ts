import { Series } from '../types';

// заглушка
const generateSeries = (count: number): Series[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `series-${i + 1}`,
    title: `Сериал #${i + 1}`,
    poster: `https://picsum.photos/seed/${i + 1}/200/300`,
  }));
};

export const ALL_SERIES = generateSeries(128);