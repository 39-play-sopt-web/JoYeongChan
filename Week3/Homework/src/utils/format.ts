export const formatDate = (date: string) => {
  if (!date) return '개봉일 미정';

  const [year, month, day] = date.split('-');
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
};

export const formatRuntime = (minutes: number | null) => {
  if (!minutes) return '상영 시간 정보 없음';

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (hours === 0) return `${rest}분`;
  return `${hours}시간 ${rest}분`;
};
