function CartHeader() {
  const toggleCheck = async (e) => {
    const statusChecked = e.target.checked;
    const checkboxes = document.getElementsByName('cart-item-checkboxes');
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked !== statusChecked)
        setTimeout(() => checkbox.click(), 50);
    });
  };
  return (
    <>
      <div className="fw-bold">YOUR CART</div>
      <div>
        <label className="w-100 position-relative" htmlFor="check-all-products">
          <input
            type="checkbox"
            id="check-all-products"
            onChange={toggleCheck}
            style={{ marginRight: '8px' }}
          />
          Select All
          <span className="float-end">Hapus</span>
        </label>
      </div>
    </>
  );
}

export { CartHeader };
