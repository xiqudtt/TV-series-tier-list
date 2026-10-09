export interface Series {
  id: string;
  title: string;
  poster: string; //картинки
}

export interface Match {
  id: string;
  seriesA: Series;
  seriesB: Series;
  winner?: Series;
}