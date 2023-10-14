import { ShoppingCartOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CartShowUp } from './CartShowUp';

function CartButton() {
  const [showCart, setShowCart] = useState(false);
  const cart = useSelector((state) => state.cart);
  return (
    <a
      className="position-relative"
      href="/cart"
      onMouseEnter={() => setShowCart(true)}
      onMouseLeave={() => setShowCart(false)}
    >
      {cart ? (
        <span
          className="text-light text-center position-absolute bg-danger z-2 text-decoration-none rounded-pill"
          style={{
            top: '1px',
            right: '5px',
            minWidth: '11px',
            height: '15px',
            fontSize: '11px',
            padding: '0 4px',
          }}
        >
          {cart.reduce((acc, val) => acc + val.quantity, 0)}
        </span>
      ) : null}
      <IconButton color="text">
        <ShoppingCartOutlined />
      </IconButton>
      <CartShowUp showCart={showCart} setShowCart={setShowCart} />
    </a>
  );
}

export default CartButton;
