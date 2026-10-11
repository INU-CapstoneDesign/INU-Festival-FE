import { useEffect, useState } from "react";

import Notice from "../types/Notice";
import { apiService } from "../services/ApiService";

export default function useFetchNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    apiService
      .fetchNotices()
      .then((data) => {
        setNotices(data);
      })
      .catch(() => {
        setNotices([]);
      });
  }, []);

  return notices;
}
