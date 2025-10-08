import { useFetch } from "usehooks-ts";

import Booth from "../types/Booth";

type BoothType = {
  booth: Booth;
};

export default function useFetchBooth(id: string) {
  const url = `${import.meta.env.VITE_API_URL}/booth/${id}`;

  const { data } = useFetch<BoothType>(url);

  if (!data) {
    return [];
  }

  return data.booth;
}
