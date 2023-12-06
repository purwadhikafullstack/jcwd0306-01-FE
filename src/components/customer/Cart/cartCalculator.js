export function cartCalculator(
  itemList = [{}],
  accumulatorMap = new Map(),
  directBuyItem = {},
  shippingMethod = {}
) {
  if (shippingMethod.price)
    accumulatorMap.set(`shipmentPrice`, {
      ...accumulatorMap.get(`shipmentPrice`),
      amount: shippingMethod.price,
    });
  if (directBuyItem?.productId) {
    accumulatorMap.set(`totalPrice`, {
      ...accumulatorMap.get(`totalPrice`),
      amount: directBuyItem.Product.price * directBuyItem.quantity,
    });
    accumulatorMap.set(`totalDiscount`, {
      ...accumulatorMap.get(`totalDiscount`),
      amount:
        directBuyItem.Product.discount *
        directBuyItem.Product.price *
        directBuyItem.quantity,
    });
    accumulatorMap.set(`totalItems`, {
      ...accumulatorMap.get(`totalItems`),
      amount: directBuyItem.quantity,
    });
    return;
  }
  itemList.forEach((item) => {
    const { price, discount } = item.Product
      ? item.Product
      : { price: 0, discount: 0 };
    if (item.isChecked) {
      accumulatorMap.set(`totalPrice`, {
        ...accumulatorMap.get(`totalPrice`),
        amount: accumulatorMap.get(`totalPrice`).amount + price * item.quantity,
      });
      accumulatorMap.set(`totalDiscount`, {
        ...accumulatorMap.get(`totalDiscount`),
        amount:
          accumulatorMap.get(`totalDiscount`).amount +
          discount * price * item.quantity,
      });
      accumulatorMap.set(`totalItems`, {
        ...accumulatorMap.get(`totalItems`),
        amount: accumulatorMap.get(`totalItems`).amount + item.quantity,
      });
    }
  });
}

export const grandTotalCalculator = (summaryTransaction = new Map()) => {
  let sum = 0;
  summaryTransaction.forEach((value, key) => {
    if (key === 'totalDiscount') sum = -value.amount + sum;
    else if (key !== 'totalItems') sum = value.amount + sum;
  });
  return Math.ceil(sum);
};
