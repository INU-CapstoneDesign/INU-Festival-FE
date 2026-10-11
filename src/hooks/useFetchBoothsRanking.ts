import { useEffect, useState } from "react";
import Booth from "../types/Booth";
import { apiService } from "../services/ApiService";

export default function useFetchBoothsRanking() {
  const [booths, setBooths] = useState<Booth[] | undefined>(undefined);
  useEffect(() => {
    apiService
      .fetchBoothRanking()
      .then((data) => {
        setBooths(data);
      })
      .catch(() => {
        setBooths(undefined);
      });
  }, []);
  return booths;
}
