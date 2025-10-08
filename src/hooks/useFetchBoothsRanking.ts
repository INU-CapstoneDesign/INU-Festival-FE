import { useFetch } from "usehooks-ts";

import Booth from "../types/Booth";

const url = `${import.meta.env.VITE_API_URL}/booth/top`;

type Booths = {
  booths: Booth[];
};

export default function useFetchBoothsRanking() {
  return useFetch<Booths>(url);
}
