import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { deleteFromCart, updateCart } from '../../../states/cart/action';
import { ConfirmationModal } from '../../ConfirmationModal';

function CartHeader() {
  const dispatch = useDispatch();
  const [show, setShow] = useState('');
  const cart = useSelector((state) => state.cart);
  const userSelector = useSelector((state) => state.authUser);

  const toggleCheck = async (e) => {
    const statusChecked = e.target.checked;
    const checkBoxes = document.getElementsByName('cart-item-checkboxes');
    const temp = [];
    cart.forEach((item) => {
      item.isChecked = statusChecked;
      temp.push(item);
    });
    await dispatch(
      updateCart(temp, { ...temp[0], quantity: 0 }, userSelector.id)
    );
    checkBoxes.forEach((checkBox) => {
      if (checkBox.checked !== statusChecked) checkBox.click();
    });
  };

  const resetCart = async () => {
    await dispatch(
      deleteFromCart(
        cart,
        cart.map((val) => val.productId),
        userSelector.id
      )
    );
    setShow('');
  };

  return (
    <>
      <div className="fw-bold">YOUR CART</div>
      <div className="d-flex justify-content-between w-100">
        <label htmlFor="check-all-products">
          <input
            type="checkbox"
            id="check-all-products"
            onChange={toggleCheck}
            style={{ marginRight: '8px' }}
          />
          Select All
        </label>
        <span
          type="button"
          style={{ color: '#009BD2' }}
          onClick={() => setShow('RESET_CART')}
        >
          Delete All
        </span>
      </div>
      <ConfirmationModal
        action={resetCart}
        actionName="DELETE ALL ITEMS FROM CART"
        show={show}
        setShow={setShow}
      />
    </>
  );
}

export { CartHeader };
