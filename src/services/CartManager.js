export class CartManager {
  static calculateAmount(items) {
    let amount = 0;
    items.forEach((item) => {
      amount += item.price * item.quantity;
    });
    return amount;
  }
  static randomTime(min, max) {
    let rand = Math.random();
    const difference = max - min;
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
  }
}
