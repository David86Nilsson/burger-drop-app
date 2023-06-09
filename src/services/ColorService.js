export class colorManager {
  static favorite(itemId, favoriteList) {
    if (favoriteList.includes(itemId)) {
      return "red";
    } else {
      return "";
    }
  }
}
