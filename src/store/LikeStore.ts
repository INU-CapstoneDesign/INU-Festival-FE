import { singleton } from "tsyringe";

import { Action, Store } from "usestore-ts";

import { apiService } from "../services/ApiService";

@singleton()
@Store()

// eslint-disable-next-line import/prefer-default-export
export class LikeStore {
  id = "";

  liked = 0;

  error = false;

  @Action()
  increase(id : string) {
    this.id = id;
    this.liked += 1;
  }

  @Action()
  setError() {
    this.error = true;
  }

  @Action()
  reset() {
    this.liked = 0;
    this.id = "";
    this.error = false;
  }

  async boothLike() {
    try {
      await apiService.fetchLike({
        id: this.id,
        liked: this.liked,
      });
      this.reset();
    } catch (e) {
      alert("좋아요는 모바일에서만 가능합니다!");
      this.setError();
    }
  }
}
