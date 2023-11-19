import { ShoppingCartOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartShowUp } from './CartButton/CartShowUp';

function CartButton() {
  const [showCart, setShowCart] = useState(false);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  return (
    <div
      className="position-relative"
      onMouseEnter={() => setShowCart(true)}
      onMouseLeave={() => setShowCart(false)}
    >
      {cart.length ? (
        <span
          className="text-light text-center position-absolute bg-danger z-2 text-decoration-none rounded-pill"
          style={{
            top: '1px',
            right: '0px',
            minWidth: '11px',
            height: '15px',
            fontSize: '11px',
            padding: '0 3px',
          }}
        >
          {cart.reduce((acc, val) => acc + val.quantity, 0)}
        </span>
      ) : null}
      <IconButton color="text" onClick={() => navigate('/cart')}>
        <ShoppingCartOutlined />
      </IconButton>
      <CartShowUp showCart={showCart} setShowCart={setShowCart} />
    </div>
  );
}

export default CartButton;
