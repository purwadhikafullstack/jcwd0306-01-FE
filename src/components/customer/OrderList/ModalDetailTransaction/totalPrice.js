export const totalPrice = (orderProduct = []) => {
  let price = 0;
  let itemsQty = 0;
  orderProduct.forEach((val) => {
    price = val.quantity * val.price + price;
    itemsQty = val.quantity + itemsQty;
  });
  return { totalPrice: price, totalItem: itemsQty };
};
