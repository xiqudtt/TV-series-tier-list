import { Series, Match } from '../types';

// шафлим массив для некст раунда
export const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// для первого раунда
export const createFirstRound = (series: Series[]): Match[] => {
  const shuffled = shuffleArray(series);
  const matches: Match[] = [];
  for (let i = 0; i < shuffled.length; i += 2) {
    if (shuffled[i + 1]) {
      matches.push({
        id: `match-${i / 2}`,
        seriesA: shuffled[i],
        seriesB: shuffled[i + 1],
      });
    }
  }
  return matches;
};

// некст раунд из победителей
export const createNextRound = (winners: Series[]): Match[] => {
  const matches: Match[] = [];
  for (let i = 0; i < winners.length; i += 2) {
    if (winners[i + 1]) {
      matches.push({
        id: `match-${i / 2}`,
        seriesA: winners[i],
        seriesB: winners[i + 1],
      });
    }
  }
  return matches;
};