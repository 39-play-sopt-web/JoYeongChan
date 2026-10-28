export const formatSeconds = (ms) => (ms / 1000).toFixed(2);

export const formatDateTime = (isoString) =>
  new Date(isoString).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
