import { useEffect, useState } from "react";

import Booth from "../types/Booth";
import { apiService } from "../services/ApiService";

export default function useFetchBooths() {
  const [booths, setBooths] = useState<Booth[]>([]);

  useEffect(() => {
    apiService
      .fetchBooths()
      .then((data) => {
        setBooths(data);
      })
      .catch(() => {
        setBooths([]);
      });
  }, []);

  return booths;
}
