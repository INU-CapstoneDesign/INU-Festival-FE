import { useEffect, useState } from "react";

import Booth from "../types/Booth";
import { apiService } from "../services/ApiService";

export default function useFetchBooth(id: string) {
  const [booth, setBooth] = useState<Booth | never[]>([]);

  useEffect(() => {
    apiService
      .fetchBooth(id)
      .then((data) => {
        setBooth(data);
      })
      .catch(() => {
        setBooth([]);
      });
  }, [id]);

  return booth;
}
