import { useFetch } from 'usehooks-ts';

import Keyword from '../types/Keyword';

const url = `${process.env.REACT_APP_URL}/keywords`;

type Keywords = {
  keywords: Keyword[];
}

export default function useFetchKeyword() {
  return useFetch<Keywords>(url);
}
