import _ from "lodash";

export default class PagedData {
  constructor(data = {}) {
    _.defaultsDeep(this, data, DEFAULT_VALUES);
  }
}

const DEFAULT_VALUES = {
  data: [],
  page: 0,
  limit: 0,
  total: 0,
};
