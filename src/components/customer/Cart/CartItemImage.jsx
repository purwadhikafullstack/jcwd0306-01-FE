export function CartItemImage({ product, width = '100px', index = 0 }) {
  if (window.location.pathname !== `/cart/shipment`)
    return (
      <a
        href={`/products/${product?.productId}`}
        className="text-decoration-none text-black"
      >
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/products/images/${
            product?.Product?.ProductImages[index].id
          }`}
          alt=""
          width={width}
        />
      </a>
    );
  return (
    <img
      src={`${import.meta.env.VITE_API_BASE_URL}/products/images/${
        product?.Product?.ProductImages[index].id
      }`}
      alt=""
      width="100px"
    />
  );
}
