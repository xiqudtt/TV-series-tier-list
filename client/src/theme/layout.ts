import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// Базовые отступы, скейлятся от ширины, но с ограничениями
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Горизонтальные отступы контейнера
export const ScreenPadding = width < 360 ? 16 : width < 768 ? 20 : 32;

// Максимальная ширина контента на планшетах (чтобы не растягивалось)
export const MAX_CONTENT_WIDTH = 720;

// Полезная ширина (между отступами, но не больше максимума)
export const contentWidth = Math.min(
  width - ScreenPadding * 2,
  MAX_CONTENT_WIDTH
);

// Карточки в матче: две штуки в ряд с gap
export const CARD_GAP = 16;

export const CARD_WIDTH = Math.floor((contentWidth - CARD_GAP) / 2);

// Соотношение сторон постера 2:3
export const CARD_HEIGHT = Math.floor(CARD_WIDTH * 1.5);

// Карточка чемпиона — 60% от полезной ширины, но не больше 320
export const CHAMPION_WIDTH = Math.min(contentWidth * 0.75, 320);
export const CHAMPION_HEIGHT = Math.floor(CHAMPION_WIDTH * 1.5);

// Скейл для шрифтов (мягкий, чтобы не ломать вёрстку)
export const fontScale = (size: number) =>
  Math.round(PixelRatio.roundToNearestPixel(size * (width < 360 ? 0.9 : 1)));

// Хелпер: горизонтальный отступ контейнера с центрированием на больших экранах
export const getContainerStyle = () => ({
  paddingHorizontal: ScreenPadding,
  alignSelf: 'center' as const,
  width: Math.min(width, MAX_CONTENT_WIDTH + ScreenPadding * 2),
});

// Полная высота (для случаев, когда нужен вертикальный центр)
export const SCREEN_HEIGHT = height;