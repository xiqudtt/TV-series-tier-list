import { useState, useCallback } from 'react';
import { Series, Match, Round } from '../types';
import { createMatches, createRound } from '../utils/bracketUtils';

export const useBracket = (initialSeries: Series[]) => {
  const [rounds, setRounds] = useState<Round[]>(() => [
    createRound(createMatches(initialSeries), 0),
  ]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [history, setHistory] = useState<
    { round: number; match: number; prevWinner?: Series }[]
  >([]);
  const [champion, setChampion] = useState<Series | null>(null);

  const currentRound = rounds[currentRoundIndex];
  const currentMatch = currentRound?.matches[currentMatchIndex];
  const totalMatches = currentRound?.matches.length ?? 0;
  const progressPercent =
    totalMatches > 0 ? (currentMatchIndex / totalMatches) * 100 : 0;

  const selectWinner = useCallback(
    (winner: Series) => {
      if (!currentMatch) return;
      const prevWinner = currentMatch.winner;

      setHistory((h) => [
        ...h,
        { round: currentRoundIndex, match: currentMatchIndex, prevWinner },
      ]);

      const updatedRounds = rounds.map((r, ri) => {
        if (ri !== currentRoundIndex) return r;
        return {
          ...r,
          matches: r.matches.map((m, mi) =>
            mi === currentMatchIndex ? { ...m, winner } : m
          ),
        };
      });
      setRounds(updatedRounds);

      const nextMatchIndex = currentMatchIndex + 1;
      if (nextMatchIndex < currentRound.matches.length) {
        setCurrentMatchIndex(nextMatchIndex);
      } else {
        const winners = updatedRounds[currentRoundIndex].matches
          .map((m) => m.winner)
          .filter(Boolean) as Series[];

        if (winners.length === 1) {
          setChampion(winners[0]);
        } else {
          const nextRound = createRound(
            createMatches(winners),
            currentRoundIndex + 1
          );
          setRounds([...updatedRounds, nextRound]);
          setCurrentRoundIndex(currentRoundIndex + 1);
          setCurrentMatchIndex(0);
        }
      }
    },
    [currentMatch, currentRoundIndex, currentMatchIndex, rounds, currentRound]
  );

  const goBack = useCallback(() => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));

    if (champion) setChampion(null);

    const updatedRounds = rounds.slice(0, last.round + 1).map((r, ri) => {
      if (ri !== last.round) return r;
      return {
        ...r,
        matches: r.matches.map((m, mi) =>
          mi === last.match ? { ...m, winner: last.prevWinner } : m
        ),
      };
    });
    setRounds(updatedRounds);
    setCurrentRoundIndex(last.round);
    setCurrentMatchIndex(last.match);
  }, [history, rounds, champion]);

  const restart = useCallback(
    (fresh: Series[]) => {
      setRounds([createRound(createMatches(fresh), 0)]);
      setCurrentRoundIndex(0);
      setCurrentMatchIndex(0);
      setHistory([]);
      setChampion(null);
    },
    []
  );

  return {
    currentMatch,
    currentRound,
    champion,
    selectWinner,
    goBack,
    restart,
    canGoBack: history.length > 0,
    progress: {
      current: currentMatchIndex + 1,
      total: totalMatches,
      percent: progressPercent,
      roundName: currentRound?.name ?? '',
      roundIndex: currentRoundIndex,
    },
  };
};