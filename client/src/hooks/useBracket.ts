import { useState, useMemo } from 'react';
import { Series, Match } from '../types';
import { ALL_SERIES } from '../constants/seriesData';
import { createFirstRound, createNextRound } from '../utils/bracketUtils';

export const useBracket = (size: 64 | 128) => {
  const initialSeries = useMemo(() => ALL_SERIES.slice(0, size), [size]);

  const [rounds, setRounds] = useState<Match[][]>(() => [createFirstRound(initialSeries)]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [champion, setChampion] = useState<Series | null>(null);

  const currentRound = rounds[currentRoundIndex];
  const currentMatch = currentRound?.[currentMatchIndex];

  const selectWinner = (winner: Series) => {
    // записать победителя в матче
    const updatedRounds = [...rounds];
    updatedRounds[currentRoundIndex][currentMatchIndex] = {
      ...currentMatch,
      winner,
    };
    setRounds(updatedRounds);

    // некст матч или раунд
    const nextMatchIndex = currentMatchIndex + 1;
    if (nextMatchIndex < currentRound.length) {
      setCurrentMatchIndex(nextMatchIndex);
    } else {
      // конец раунда - тут победители раунда
      const winners = currentRound.map((m) => m.winner!);
      if (winners.length === 1) {
        setChampion(winners[0]);
      } else {
        const nextRound = createNextRound(winners);
        setRounds([...updatedRounds, nextRound]);
        setCurrentRoundIndex(currentRoundIndex + 1);
        setCurrentMatchIndex(0);
      }
    }
  };

  return {
    currentMatch,
    champion,
    selectWinner,
    progress: `${currentMatchIndex + 1}/${currentRound?.length ?? 0}`,
  };
};