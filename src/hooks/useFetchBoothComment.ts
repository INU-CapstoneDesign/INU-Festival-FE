import { useFetch } from "usehooks-ts";

import BoothComments from "../types/BoothComment";

type BoothCommentType = {
  boothComments: BoothComments;
};

export default function useFetchBoothComment(id: string) {
  const url = `${import.meta.env.VITE_API_URL}/booth/${id}/comment`;

  const { data } = useFetch<BoothCommentType>(url);

  if (!data) {
    return [];
  }

  return data.boothComments;
}
