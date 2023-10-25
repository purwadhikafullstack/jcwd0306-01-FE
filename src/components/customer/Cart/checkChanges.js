export const checkChanges = (isChecked = false, note = '', product = {}) => {
  if (
    product.quantity !== 0 ||
    product.isChecked !== isChecked ||
    product.note !== note
  )
    return true;
  return false;
};
