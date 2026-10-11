import { useEffect, useState } from "react";

import Shouts from "../types/Shouts";
import { apiService } from "../services/ApiService";

export default function useFetchSentence() {
  // undefined = 아직 로딩 중 (FestivalSentence가 스켈레톤을 보여줌)
  const [shouts, setShouts] = useState<Shouts[] | undefined>(undefined);

  useEffect(() => {
    apiService
      .fetchSentences()
      .then((data) => setShouts(data))
      .catch(() => setShouts([]));
  }, []);

  return shouts;
}
