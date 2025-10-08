import { useState } from "react";
import { styled } from "styled-components";

import Article from "../Article";
import BlurContainer from "../BlurContainer";
import Categories from "./Categories";
import TimeTableBody from "./TimeTableBody";
import filterPerforms from "../../utils/filterPerforms";
import useFetchPerforms from "../../hooks/useFetchPerforms";
import Perform from "../../types/Perform";

const TimeTableHedaer = styled(BlurContainer)`
  height: 16rem;
`;

function selectDates(filteredPerforms: Perform[]) {
  if (!filteredPerforms) {
    return [];
  }
  return filteredPerforms.reduce((acc: string[], perform: Perform) => {
    const { date } = perform;
    const day = date.slice(-2); // 마지막 2자리 (07, 08, 09)
    return acc.includes(day) ? acc : [...acc, day];
  }, []);
}

export default function FilterableTimeTable() {
  const now = new Date();
  const day = now.getDate();
  const today = { 7: "day1", 8: "day2", 9: "day3" };
  const [categories] = useState(["day1", "day2", "day3"]);
  const [filterCategory, setFilterCatergory] = useState(today[day] || "day1");

  const { data } = useFetchPerforms();
  const filteredPerforms = data
    ? filterPerforms(data.perform, filterCategory)
    : [];

  const dates = data ? selectDates(data.perform) : [];

  return (
    <div>
      <TimeTableHedaer>
        <Categories
          categories={categories}
          filterCategory={filterCategory}
          setFilterCatergory={setFilterCatergory}
          dates={dates}
        />
      </TimeTableHedaer>
      <Article>
        <TimeTableBody performs={filteredPerforms} />
      </Article>
    </div>
  );
}
