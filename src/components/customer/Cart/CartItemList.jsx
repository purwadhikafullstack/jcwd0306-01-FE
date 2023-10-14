import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StackBorder } from './StackBorder';
import { updateCart } from '../../../states/cart/action';
import BottomTools from './BottomTools';
import checkBoxHandler from '../../../utils/checkBoxHandler';

export function CartItemList({
  cart,
  product,
  setSummaryTransaction,
  summaryTransaction,
}) {
  const [quantity, setQuantity] = useState(0);
  const [isChecked, setIsChecked] = useState(product.isChecked);
  const stock = 200;
  const dispatch = useDispatch();
  const editQuantity = async (number) => {
    setQuantity(quantity + number);
  };
  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
    const price = summaryTransaction.totalPrice;
    const discount = summaryTransaction.totalDiscount;
    const addPrice = product.price * product.quantity;
    const addDiscount = product.discount * product.quantity;
    if (e.target.checked)
      setSummaryTransaction({
        ...summaryTransaction,
        totalPrice: price + addPrice,
        totalDiscount: discount + addDiscount,
      });
    if (!e.target.checked)
      setSummaryTransaction({
        ...summaryTransaction,
        totalPrice: price - addPrice,
        totalDiscount: discount - addDiscount,
      });
    checkBoxHandler(`cart-item-checkboxes`, `check-all-products`);
  };

  const handleChangeQuantity = (e) => {
    if (e.target.value < 2) return setQuantity(1);
    if (e.target.value > stock) return setQuantity(stock);
    setQuantity(e.target.value);
  };

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product.quantity]);

  useEffect(() => {
    const temp = { ...product };
    temp.quantity = quantity - product.quantity;
    temp.isChecked = isChecked;
    const updateItem = setTimeout(async () => {
      await dispatch(updateCart(cart, temp, 1));
    }, 700);

    return () => {
      clearTimeout(updateItem);
    };
  }, [quantity, isChecked]);

  return (
    <div key={product.productId}>
      <div className="w-100 position-relative d-flex align-items-center">
        <input
          type="checkbox"
          id={`checkbox-${product.productName}`}
          name="cart-item-checkboxes"
          checked={isChecked}
          onChange={handleCheck}
        />
        <div className="d-flex gap-2">
          <img
            src="https://t3.ftcdn.net/jpg/04/46/38/74/360_F_446387449_OIIQ3VlDKbMQTM63yVJNpks6UecfVAhD.jpg"
            alt=""
            width="100px"
          />
          <div className="d-flex flex-column gap-2">
            <div>{product.productName}</div>
            <div>Color / Variant / Stock: {stock} </div>
            <div>
              {quantity} item{quantity > 1 ? 's' : null} (
              {product.weight * quantity} gram)
            </div>
            <div>Rp{product.price.toLocaleString(`id-ID`)}</div>
          </div>
        </div>
      </div>
      <BottomTools
        quantity={quantity}
        handleChangeQuantity={handleChangeQuantity}
        editQuantity={editQuantity}
        stock={stock}
        product={product}
        cart={cart}
      />
      <StackBorder />
    </div>
  );
}
