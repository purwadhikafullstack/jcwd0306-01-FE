import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StackBorder } from './StackBorder';
import { updateCart } from '../../../states/cart/action';
import BottomTools from './BottomTools';
import checkBoxHandler from '../../../utils/checkBoxHandler';

export function CartItemList({ cart, product, address }) {
  const [quantity, setQuantity] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const { stock } = product;
  const dispatch = useDispatch();
  const userSelector = { id: 5 };

  const editQuantity = async (number) => {
    setQuantity(quantity + number);
  };

  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
    checkBoxHandler(`cart-item-checkboxes`, `check-all-products`);
  };

  const handleChangeQuantity = (e) => {
    if (Number(e.target.value) < 2) return setQuantity(1);
    if (Number(e.target.value) > stock) {
      return setQuantity(stock);
    }
    return setQuantity(e.target.value);
  };

  useEffect(() => {
    setQuantity(product?.quantity);
    setIsChecked(product?.isChecked);
  }, [product]);

  useEffect(() => {
    const temp = { ...product };
    temp.quantity = quantity - product.quantity;
    if (temp.quantity !== 0 || temp.isChecked !== isChecked) {
      // if no changes then no updating state and DB
      temp.isChecked = isChecked;
      const updateItem = setTimeout(async () => {
        await dispatch(updateCart(cart, temp, userSelector.id));
      }, 500);
      return () => {
        clearTimeout(updateItem);
      };
    }
  }, [quantity, isChecked]);

  return (
    <>
      <div>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            {window.location.pathname === `/cart` ? (
              <input
                type="checkbox"
                id={`checkbox-${product?.Product?.name}`}
                name="cart-item-checkboxes"
                defaultChecked={product?.isChecked}
                onChange={handleCheck}
              />
            ) : null}
            <div className="d-flex gap-2">
              <img
                src="https://t3.ftcdn.net/jpg/04/46/38/74/360_F_446387449_OIIQ3VlDKbMQTM63yVJNpks6UecfVAhD.jpg"
                alt=""
                width="100px"
              />
              <div className="d-flex flex-column gap-2 flex-grow-1">
                <div>
                  <b>{product?.Product?.name}</b>
                </div>
                <div>Color / Variant / Stock: {stock} </div>
                <div>
                  {quantity} item{quantity > 1 ? 's' : null} (
                  {product.Product.weight * quantity} gram)
                </div>
                <div>
                  <b>Rp{product?.Product?.price.toLocaleString(`id-ID`)}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-2">
        <BottomTools
          quantity={quantity}
          handleChangeQuantity={handleChangeQuantity}
          editQuantity={editQuantity}
          stock={stock}
          product={product}
          cart={cart}
        />
      </div>
      <StackBorder />
    </>
  );
}
