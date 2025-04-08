export const getNumberLocalText = (
  years: number,
  [five, one, second]: string[]
) => {
  const mod100 = years % 100;

  if (mod100 >= 5 && mod100 <= 20) {
    return `${years} ${five}`;
  }

  const mod10 = years % 10;

  if (mod10 === 1) {
    return `${years} ${one}`;
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return `${years} ${second}`;
  }

  return `${years} ${five}`;
};
