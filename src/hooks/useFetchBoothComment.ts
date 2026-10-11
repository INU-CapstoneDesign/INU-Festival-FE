import { useEffect, useState } from "react";
import BoothComments from "../types/BoothComment";
import { apiService } from "../services/ApiService";

export default function useFetchBoothComment(id: string) {
  const [boothComments, setBoothComments] = useState<BoothComments[]>([]);

  useEffect(() => {
    apiService
      .fetchBoothComments(id)
      .then((data) => {
        setBoothComments(data);
      })
      .catch(() => {
        setBoothComments([]);
      });
  }, [id]);
  return boothComments;
}
