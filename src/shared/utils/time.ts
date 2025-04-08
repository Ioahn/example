export const addMinutesToMilliseconds = (
  timeInMilliseconds: number,
  minutesToAdd: number
) => {
  return timeInMilliseconds + minutesToAdd * 60;
};
