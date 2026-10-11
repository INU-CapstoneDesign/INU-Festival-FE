import { useEffect, useState } from "react";
import Perform from "../types/Perform";
import { apiService } from "../services/ApiService";

export default function useFetchPerforms() {
  const [performs, setPerforms] = useState<Perform[] | undefined>(undefined);

  useEffect(() => {
    apiService
      .fetchPerforms()
      .then((data) => setPerforms(data))
      .catch(() => {
        setPerforms([]);
      });
  }, []);

  return performs;
}
