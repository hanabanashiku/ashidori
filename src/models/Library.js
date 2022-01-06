import { ANIME_STATUS } from "../enums";

export default class Library {
  #completed = [];
  #watching = [];
  #dropped = [];
  #onHold = [];
  #planned = [];

  constructor(data = []) {
    this.#completed = data.filter(
      (anime) => anime.status === ANIME_STATUS.COMPLETED
    );
    this.#watching = data.filter(
      (anime) => anime.status === ANIME_STATUS.CURRENT
    );
    this.#dropped = data.filter(
      (anime) => anime.status === ANIME_STATUS.DROPPED
    );
    this.#onHold = data.filter(
      (anime) => anime.status === ANIME_STATUS.ON_HOLD
    );
    this.#planned = data.filter(
      (anime) => anime.status === ANIME_STATUS.PLANNED
    );
  }
}
