import { Series } from '../types';

const TMDB_ACCESS_TOKEN = process.env.EXPO_PUBLIC_TMDB_TOKEN;

if (!TMDB_ACCESS_TOKEN) {
  console.warn('TMDB token не найден. Проверь .env');
}

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

const headers = {
  accept: 'application/json',
  Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
};

// Вспомогательная функция для запроса
const tmdbGet = async (path: string): Promise<any> => {
  const response = await fetch(`${BASE_URL}${path}`, { headers });
  if (!response.ok) {
    throw new Error(`TMDB error ${response.status}: ${path}`);
  }
  return response.json();
};

// Маппинг ответа TMDB в наш Series
const mapToSeries = (item: any, type: 'anime' | 'tv'): Series => ({
  id: String(item.id),
  title: item.name,
  poster: `${IMAGE_BASE}${item.poster_path}`,
  genre: type === 'anime' ? 'Аниме' : 'Сериал',
  rating: item.vote_average ? +item.vote_average.toFixed(1) : undefined,
});

// Загружаем аниме через discover с жанром Animation (16) и ключевым словом anime
const fetchAnimePage = async (page: number): Promise<Series[]> => {
  // with_genres=16 — Animation
  // with_keywords=210024 — keyword "anime" (ID на TMDB)
  // sort_by=popularity.desc — по популярности
  const path = `/discover/tv?language=ru-RU&page=${page}&with_genres=16&with_keywords=210024&sort_by=popularity.desc`;
  const data = await tmdbGet(path);
  return data.results
    .filter((item: any) => item.poster_path)
    .map((item: any) => mapToSeries(item, 'anime'));
};

// Загружаем популярные сериалы (не аниме)
const fetchTvPage = async (page: number): Promise<Series[]> => {
  const path = `/tv/popular?language=ru-RU&page=${page}`;
  const data = await tmdbGet(path);
  return data.results
    .filter((item: any) => item.poster_path)
    // Исключаем аниме из общей выборки, чтобы не было дублей
    .filter((item: any) => !item.genre_ids?.includes(16))
    .map((item: any) => mapToSeries(item, 'tv'));
};

// Загружаем N сериалов, соблюдая баланс 50/50
export const fetchSeriesBatch = async (count: number): Promise<Series[]> => {
  const half = Math.ceil(count / 2);
  const animePages = Math.ceil(half / 20);
  const tvPages = Math.ceil(half / 20);

  // Параллельно грузим аниме и сериалы
  const animePromises = Array.from({ length: animePages }, (_, i) =>
    fetchAnimePage(i + 1)
  );
  const tvPromises = Array.from({ length: tvPages }, (_, i) =>
    fetchTvPage(i + 1)
  );

  const [animeResults, tvResults] = await Promise.all([
    Promise.all(animePromises),
    Promise.all(tvPromises),
  ]);

  const anime = animeResults.flat().slice(0, half);
  const tv = tvResults.flat().slice(0, count - half);

  // Перемешиваем, чтобы аниме и сериалы шли вперемешку
  return shuffleMix([...anime, ...tv]);
};

// Перемешивание Фишера-Йетса
const shuffleMix = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};