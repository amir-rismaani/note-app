export default class Storage {
  static get(stringItem) {
    return JSON.parse(localStorage.getItem(stringItem));
  }

  static set(stringItem, object) {
    localStorage.setItem(stringItem, JSON.stringify(object));
  }
}
