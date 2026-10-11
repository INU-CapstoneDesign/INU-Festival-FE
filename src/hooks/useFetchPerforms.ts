import { useEffect, useState } from "react";

import Perform from "../types/Perform";
import { apiService } from "../services/ApiService";

export default function useFetchPerforms() {
  // undefined = 아직 로딩 중 (LineUp가 스켈레톤을 보여줌)
  const [performs, setPerforms] = useState<Perform[] | undefined>(undefined);

  useEffect(() => {
    apiService
      .fetchPerforms()
      .then((data) => {
        setPerforms(data);
      })
      .catch(() => {
        setPerforms([]);
      });
  }, []);

  return performs;
}
