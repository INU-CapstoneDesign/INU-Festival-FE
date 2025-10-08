import { container } from "tsyringe";

import { useStore } from "usestore-ts";

import { LikeStore } from "../store/LikeStore";

export default function useLikeStore() {
  const store = container.resolve(LikeStore);
  return useStore(store);
}
