export function shuffle(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function generatePrimeNumber(): number[] {
    const array: number[] = [2, 3];
    for (let i = 5; i <= 58; i += 2) {
        if (array.every((p) => i % p)) {
            array.push(i);
        }
    }
    return array;
}

export const generateCardList = () => shuffle(generatePrimeNumber()
    .map((num: number) => num)
    .concat(generatePrimeNumber().map((num: number) => num)))
    .reduce((acc: object, item: number, index: number) => ({
        ...acc,
        [index]: {
            id: index, num: item, isOpen: true, active: false, guessed: false,
        },
    }), {});
