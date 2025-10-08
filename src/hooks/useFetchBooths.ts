import { useFetch } from "usehooks-ts";
import Booth from "../types/Booth";

const url = `${import.meta.env.VITE_API_URL}/booth/all`;

type Booths = {
  booths: Booth[];
};

export default function useFetchBooths() {
  const { data } = useFetch<Booths>(url);
  if (!data) {
    return [];
  }

  return data.booths;
}
