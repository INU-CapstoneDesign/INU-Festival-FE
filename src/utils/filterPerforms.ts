import Perform from "../types/Perform";

export default function filterPerforms(
  performs: Perform[],
  filterCategory: string,
) {
  if (!performs) {
    return [];
  }

  // 날짜 매핑: day1 -> 07, day2 -> 08, day3 -> 09
  const dateMapping: { [key: string]: string } = {
    day1: "07",
    day2: "08",
    day3: "09",
  };

  const targetDate = dateMapping[filterCategory];

  const filteredPerforms = performs.filter((perform) => {
    // 날짜에서 일(day) 부분 추출 (2025.05.07 -> 07)
    const performDate = perform.date.slice(-2);
    return performDate === targetDate;
  });

  filteredPerforms.sort((a: Perform, b: Perform) => {
    const firstTime = Number(a.time.split(":").join(""));
    const secondTime = Number(b.time.split(":").join(""));
    if (firstTime > secondTime) {
      return 1;
    }
    if (firstTime < secondTime) {
      return -1;
    }
    return 0;
  });

  return filteredPerforms;
}
