import { useEffect, useState } from "react";

import Booth from "../types/Booth";
import { apiService } from "../services/ApiService";

export default function useFetchBoothsRanking() {
  // undefined = 아직 로딩 중 (BoothRanking가 스켈레톤을 보여줌)
  const [booths, setBooths] = useState<Booth[] | undefined>(undefined);

  useEffect(() => {
    apiService
      .fetchBoothRanking()
      .then((data) => {
        setBooths(data);
      })
      .catch(() => {
        setBooths([]);
      });
  }, []);

  return booths;
}
