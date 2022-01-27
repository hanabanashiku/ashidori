import { LIST_STATUS } from "../enums";

/**
 * A library of anime series.
 */
export default class Library {
  #entries;

  constructor(data = []) {
    this.#entries = data;
  }

  /**
   * @returns {[LibraryEntry]} The list of completed series.
   */
  get completed() {
    return this.#entries.filter(
      (anime) => anime.status === LIST_STATUS.COMPLETED
    );
  }

  /**
   * @returns {[LibraryEntry]} The list of currently watching series.
   */
  get watching() {
    return this.#entries.filter(
      (anime) => anime.status === LIST_STATUS.CURRENT
    );
  }

  /**
   * @returns {[LibraryEntry]} The list of dropped series.
   */
  get dropped() {
    return this.#entries.filter(
      (anime) => anime.status === LIST_STATUS.DROPPED
    );
  }

  /**
   * @returns {[LibraryEntry]} The list of on-hold series.
   */
  get onHold() {
    return this.#entries.filter(
      (anime) => anime.status === LIST_STATUS.ON_HOLD
    );
  }

  /**
   * @returns {[LibraryEntry]} The list of planned series.
   */
  get planned() {
    return this.#entries.filter(
      (anime) => anime.status === LIST_STATUS.PLANNED
    );
  }
}
