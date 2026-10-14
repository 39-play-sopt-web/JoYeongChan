export const range = (start, end) => {
  const result = [];

  for (let number = start; number <= end; number += 1) {
    result.push(number);
  }

  return result;
};

export const shuffle = (array) => {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};
