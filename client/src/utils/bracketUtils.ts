import { Series, Match, Round } from '../types';

export const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const createMatches = (series: Series[]): Match[] => {
  const matches: Match[] = [];
  for (let i = 0; i < series.length; i += 2) {
    if (series[i + 1]) {
      matches.push({
        id: `match-${i / 2}-${Date.now()}`,
        seriesA: series[i],
        seriesB: series[i + 1],
      });
    }
  }
  return matches;
};

export const getRoundName = (matchesCount: number): string => {
  const players = matchesCount * 2;
  if (players === 2) return 'Финал';
  if (players === 4) return 'Полуфинал';
  if (players === 8) return 'Четвертьфинал';
  if (players === 16) return '1/8 финала';
  if (players === 32) return '1/16 финала';
  if (players === 64) return '1/32 финала';
  if (players === 128) return '1/64 финала';
  return `Раунд на ${players}`;
};

export const createRound = (matches: Match[], index: number): Round => ({
  index,
  matches,
  name: getRoundName(matches.length),
});