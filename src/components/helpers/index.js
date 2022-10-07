export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generatePrimeNumber() {
  const array = [2, 3];
  for (let i = 5; i <= 58; i += 2) {
    if (array.every((p) => i % p)) {
      array.push(i);
    }
  }
  return array;
}

export const generateCardList = () => shuffle(generatePrimeNumber()
  .map((num) => num)
  .concat(generatePrimeNumber().map((num) => num)))
  .reduce((acc, item, index) => ({
    ...acc,
    [index]: {
      id: index, num: item, isOpen: true, active: false,
    },
  }), {});
