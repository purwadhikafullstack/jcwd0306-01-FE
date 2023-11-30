import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

export function CartItemTitle({ product, stock }) {
  const theme = useTheme();

  if (window.location.pathname === `/cart`)
    return (
      <div>
        <b>
          <Link
            to={`/products/${product?.productId}`}
            style={{
              textDecoration: 'none',
              color: theme.palette.text.primary,
            }}
          >
            {product?.Product?.name}
          </Link>
        </b>
        <div style={{ fontSize: '0.8em' }}>Stock: {stock} </div>
      </div>
    );
  return (
    <div>
      <b>{product?.Product?.name}</b>
      <div style={{ fontSize: '0.8em' }}>Stock: {stock} </div>
    </div>
  );
}
