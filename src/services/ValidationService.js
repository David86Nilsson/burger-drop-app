import { validate } from "uuid";

export class ValidationManager {
  static validateAdress(adress) {
    if (
      adress.city.length > 2 &&
      adress.street.length > 2 &&
      adress.nbr.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }
  static validateCard(card) {
    const date = new Date();
    if (card.year < date.getFullYear()) {
      return false;
    }
    if (card.year == date.getFullYear() && card.month < date.getMonth()) {
      return false;
    }
    if (card.cvc.length !== 3) {
      return false;
    }
    if (card.owner.length < 3) {
      return false;
    }
    if (card.cardnumber.length !== 16) {
      return false;
    }
    return true;
  }
  static validateUserName(username) {
    if (username.length > 3) {
      return true;
    }
    return false;
  }
  static validatePassword(password) {
    if (password.length > 5) {
      return true;
    }
    return false;
  }
}
