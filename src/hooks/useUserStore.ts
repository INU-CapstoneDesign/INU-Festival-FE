import { container } from "tsyringe";

import { useStore } from "usestore-ts";

import { UserStore } from "../store/UserStore";

export default function useUserStore() {
  const store = container.resolve(UserStore);
  return useStore(store);
}
