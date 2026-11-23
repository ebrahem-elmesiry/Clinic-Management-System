export function handleTime(value: string) {
  const hours = Number(value.split(":")[0] === "00" ? 0 : value.split(":")[0]);
  const minutes = value.split(":")[1];
  const timeOfDay = hours >= 0 && hours <= 11 ? "AM" : "PM";
  const convertedHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  const time = `${convertedHours}:${minutes}`;
  return `${time} ${timeOfDay}`;
}
