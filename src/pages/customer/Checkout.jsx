import '../../components/customer/Cart/Cart.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CartItemList } from '../../components/customer/Cart/CartItemList';
import { StackBorder } from '../../components/customer/Cart/StackBorder';
import { ShoppingSummary } from '../../components/customer/Cart/ShoppingSummary';
import { MobileShoppingSummary } from '../../components/customer/Cart/MobileShoppingSummary';
import { CheckOutHeader } from '../../components/customer/Checkout/CheckOutHeader';
import { fetchShippingOptions } from '../../components/customer/Checkout/fetchShippingOptions';
import {
  cartCalculator,
  grandTotalCalculator,
} from '../../components/customer/Cart/cartCalculator';
import { checkCartLength } from '../../components/customer/Checkout/isCartEmpty';
import { createNewTransaction } from '../../components/customer/Checkout/createNewTransaction';
import { fetchAddresses } from '../../components/customer/Checkout/ModalChooseAddress/fetchAddresses';

export function Checkout() {
  const allItemsInCart = useSelector((state) => state.cart);
  const cart = allItemsInCart.filter((item) => item.isChecked);
  const summaryTransaction = new Map([
    [`totalItems`, { amount: 0, name: `Total Items` }],
    [`totalPrice`, { amount: 0, name: `Total Price` }],
    [`totalDiscount`, { amount: 0, name: `Total Discount` }],
    [`shipmentPrice`, { amount: 0, name: `Shipment Price` }],
    [`shipmentPriceDiscount`, { amount: 0, name: `Shipment Price Discount` }],
    ['shippingInsurance', { amount: 0, name: `Shipping Insurance Price` }],
    [`servicePrice`, { amount: 0, name: `Service Price` }],
  ]);
  const userSelector = useSelector((state) => state.authUser);
  const unpaid = useSelector((state) => state.order);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState({});
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingMethod, setShippingMethod] = useState({});
  const [originWarehouse, setOriginWarehouse] = useState({});
  const [disableButton, setDisableButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const directBuyItem = useLocation().state;
  cartCalculator(cart, summaryTransaction, directBuyItem, shippingMethod);
  const grandTotal = grandTotalCalculator(summaryTransaction);
  const defaultAddress = addresses.find((destination) => destination.isDefault);
  const addressSelector = useSelector((state) => state.selectedAddress);

  const createNewOrder = async () =>
    createNewTransaction(
      nav,
      dispatch,
      setDisableButton,
      userSelector?.id,
      allItemsInCart,
      cart,
      directBuyItem,
      address,
      shippingMethod,
      originWarehouse,
      grandTotal,
      unpaid
    );

  useEffect(() => {
    const isCartEmpty = checkCartLength(cart, directBuyItem, dispatch, nav);
    return () => {
      clearTimeout(isCartEmpty);
    };
  }, [cart]);

  useEffect(() => {
    if (addressSelector?.id) {
      setAddress(addressSelector);
    } else {
      setAddress(defaultAddress);
    }
  }, [defaultAddress?.id, addressSelector]);

  useEffect(() => {
    const tempCart = directBuyItem?.quantity ? [directBuyItem] : cart;
    if (address?.id && (cart.length || directBuyItem?.quantity))
      fetchShippingOptions(
        address,
        tempCart,
        setShippingOptions,
        setIsLoading,
        setOriginWarehouse,
        setDisableButton,
        setShippingMethod,
        dispatch
      );
  }, [address, cart.length, directBuyItem?.quantity]);

  useEffect(() => {
    const fetching = setTimeout(() => {
      if (userSelector?.id)
        fetchAddresses(userSelector, setAddresses, dispatch, name);
    }, 500);
    return () => clearTimeout(fetching);
  }, [userSelector?.id, name]);
  return (
    <Container className="mx-auto p-0 mt-3" fluid="lg">
      <Row
        className="m-0 d-flex justify-content-center"
        style={{ minHeight: '81vh' }}
      >
        <Col lg={7} md={7} className="d-flex flex-column gap-3">
          <CheckOutHeader
            addresses={addresses}
            setAddresses={setAddresses}
            address={address}
            setAddress={setAddress}
            cart={cart}
            shippingOptions={shippingOptions}
            shippingMethod={shippingMethod}
            setShippingMethod={setShippingMethod}
            originWarehouse={originWarehouse}
            disableButton={disableButton}
            setDisableButton={setDisableButton}
            isLoading={isLoading}
            setName={setName}
          />
          <StackBorder />
          {directBuyItem?.productId ? (
            <CartItemList product={directBuyItem} address={address} />
          ) : (
            cart.map((product, index) => (
              <CartItemList
                product={product}
                cart={cart}
                index={index}
                key={product.productId}
                address={address}
                directBuyItem={directBuyItem}
              />
            ))
          )}
        </Col>
        <Col lg={4} md={5} className="position-relative d-none d-md-block">
          <ShoppingSummary
            disableButton={disableButton}
            summaryTransaction={summaryTransaction}
            grandTotal={grandTotal}
            createNewOrder={createNewOrder}
          />
        </Col>
      </Row>
      <div className="sticky-bottom d-sm-block d-md-none bg-white px-2 pt-1 pb-3 border-top border-secondary-subtle">
        <MobileShoppingSummary
          disableButton={disableButton}
          summaryTransaction={summaryTransaction}
          grandTotal={grandTotal}
          createNewOrder={createNewOrder}
        />
      </div>
    </Container>
  );
}
