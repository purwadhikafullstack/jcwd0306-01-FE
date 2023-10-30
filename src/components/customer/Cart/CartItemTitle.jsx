export function CartItemTitle({ product, stock }) {
  if (window.location.pathname === `/cart`)
    return (
      <div>
        <b>
          <a
            href={`/products/${product?.productId}`}
            className="text-decoration-none text-black"
          >
            {product?.Product?.name}
          </a>
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
