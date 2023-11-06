export const orderStatusCalculator = (
  unpaidOrder = [],
  otherOrderStatus = {}
) => {
  let sum = 0;
  Object.entries(otherOrderStatus).forEach((status) => {
    sum = status[1] + sum;
  });
  return sum + unpaidOrder.length;
};
