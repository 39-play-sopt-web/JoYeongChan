export interface RatingFilter {
  label: string;
  min: number;
  max: number;
}

export const RATING_FILTERS: RatingFilter[] = [
  { label: '전체', min: 0, max: 10 },
  { label: '★ 8점 이상', min: 8, max: 10 },
  { label: '★ 6 ~ 8점', min: 6, max: 8 },
  { label: '★ 4 ~ 6점', min: 4, max: 6 },
  { label: '★ 4점 미만', min: 0, max: 4 },
];
