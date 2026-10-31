export interface Series {
  id: string;
  title: string;
  poster: string;
  genre?: string;
  rating?: number;
}

export interface Match {
  id: string;
  seriesA: Series;
  seriesB: Series;
  winner?: Series;
}

export interface Round {
  index: number;
  matches: Match[];
  name: string;
}