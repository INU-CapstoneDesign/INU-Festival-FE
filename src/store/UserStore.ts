import { singleton } from "tsyringe";

import { Action, Store } from "usestore-ts";

import { apiService } from "../services/ApiService";

@singleton()
@Store()
// eslint-disable-next-line import/prefer-default-export
export class UserStore {
  name = "";

  error = false;

  @Action()
  setName(name: string) {
    this.name = name;
  }

  @Action()
  setError() {
    this.error = true;
  }

  async fetchCurrentUser() {
    try {
      const { name } = await apiService.fetchCurrentUser();
      this.setName(name);
    } catch (e) {
      this.setError();
    }
  }
}
