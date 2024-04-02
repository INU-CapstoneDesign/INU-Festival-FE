import { styled } from 'styled-components';

import { useState } from 'react';

import Article from '../Article';

import BlurContainer from '../BlurContainer';
import Categories from './Categories';
import TimeTableBody from './TimeTableBody';

import filterPerforms from '../../utils/filterPerforms';

import useFetchPerforms from '../../hooks/useFetchPerforms';
import Perform from '../../types/Perform';

const TimeTableHedaer = styled(BlurContainer)`
  height: 16rem;
`;

function selectDates(filteredPerforms: Perform[]) {
  return filteredPerforms.reduce((acc: string[], perform: Perform) => {
    const { date } = perform;
    const day = date.slice(4, 6);
    return acc.includes(day) ? acc : [...acc, day];
  }, []);
}

export default function FilterableTimeTable() {
  const [categories] = useState(['day1', 'day2', 'day3']);
  const [filterCategory, setFilterCatergory] = useState<string>('day1');

  const { data } = useFetchPerforms();
  const filteredPerforms = data ? filterPerforms(data.performs, filterCategory) : [];
  const dates = data ? selectDates(data.performs) : [];

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
        <TimeTableBody
          performs={filteredPerforms}
        />
      </Article>
    </div>
  );
}
