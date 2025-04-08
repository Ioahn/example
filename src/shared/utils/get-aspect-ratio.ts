export const getAspectRatio = (width: number, height: number) => {
  const targetRatio = width / height;
  let minDiff = Infinity;
  let aspectX = 1;
  let aspectY = 1;

  for (let x = 1; x <= 16; x++) {
    for (let y = 1; y <= 16; y++) {
      const currentRatio = x / y;
      const diff = Math.abs(targetRatio - currentRatio);

      if (diff < minDiff) {
        minDiff = diff;
        aspectX = x;
        aspectY = y;
      }
    }
  }

  return [aspectX, aspectY];
};
