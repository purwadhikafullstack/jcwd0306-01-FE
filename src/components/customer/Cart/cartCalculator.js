export function cartCalculator(
  itemList = [{}],
  accumulatorMap = new Map(),
  directBuyItem = {}
) {
  if (directBuyItem?.productId) {
    accumulatorMap.set(
      `totalPrice`,
      directBuyItem.Product.price * directBuyItem.quantity
    );
    accumulatorMap.set(
      `totalDiscount`,
      directBuyItem.Product.discount * directBuyItem.quantity
    );
    accumulatorMap.set(`totalItems`, directBuyItem.quantity);
    return;
  }
  itemList.forEach((item) => {
    if (item.isChecked) {
      accumulatorMap.set(
        `totalPrice`,
        accumulatorMap.get(`totalPrice`) + item.Product.price * item.quantity
      );
      accumulatorMap.set(
        `totalDiscount`,
        accumulatorMap.get(`totalDiscount`) +
          item.Product.discount * item.quantity
      );
      accumulatorMap.set(
        `totalItems`,
        accumulatorMap.get(`totalItems`) + item.quantity
      );
    }
  });
}
