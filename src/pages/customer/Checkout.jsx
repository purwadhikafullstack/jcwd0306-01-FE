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
import api from '../../constants/api';
import { fetchShippingOptions } from '../../components/customer/Checkout/fetchShippingOptions';
import { setAlertActionCreator } from '../../states/alert/action';
import {
  cartCalculator,
  grandTotalCalculator,
} from '../../components/customer/Cart/cartCalculator';
import { checkCartLength } from '../../components/customer/Checkout/isCartEmpty';

export function Checkout() {
  const cart = useSelector((state) => state.cart).filter(
    (item) => item.isChecked
  );
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
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState({});
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingMethod, setShippingMethod] = useState({});
  const [originWarehouse, setOriginWarehouse] = useState({});
  const [disableButton, setDisableButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const directBuyItem = useLocation().state;
  cartCalculator(cart, summaryTransaction, directBuyItem, shippingMethod);
  const grandTotal = grandTotalCalculator(summaryTransaction);
  const defaultAddress = addresses.find((destination) => destination.isDefault);
  const addressSelector = useSelector((state) => state.selectedAddress);

  async function fetchAddresses() {
    try {
      const { data } = await api.get(`/user_address/${userSelector?.id}`);
      setAddresses(data);
    } catch (error) {
      dispatch(
        setAlertActionCreator({
          val: { status: 'error', message: error?.message },
        })
      );
    }
  }

  useEffect(() => {
    const isCartEmpty = checkCartLength(cart, directBuyItem, dispatch, nav);
    return () => clearTimeout(isCartEmpty);
  }, [cart]);

  useEffect(() => {
    if (addressSelector?.id) {
      setAddress(addressSelector);
    } else {
      setAddress(defaultAddress);
    }
  }, [defaultAddress?.id, addressSelector]);

  useEffect(() => {
    if (address?.id)
      fetchShippingOptions(
        address,
        cart,
        setShippingOptions,
        setIsLoading,
        setOriginWarehouse,
        setDisableButton,
        setShippingMethod,
        dispatch
      );
  }, [address]);

  useEffect(() => {
    if (userSelector?.id) fetchAddresses();
  }, [userSelector?.id]);
  return (
    <Container className="mx-auto p-0 mt-3" fluid="lg">
      <Row
        className="m-0 d-flex justify-content-center"
        style={{ minHeight: '82vh' }}
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
            address={address}
            disableButton={disableButton}
            shippingMethod={shippingMethod}
            summaryTransaction={summaryTransaction}
            grandTotal={grandTotal}
            cart={cart}
            directBuyItem={directBuyItem}
          />
        </Col>
      </Row>
      <div className="sticky-bottom d-sm-block d-md-none bg-white px-2 pt-1 pb-3 border-top border-secondary-subtle">
        <MobileShoppingSummary
          address={address}
          disableButton={disableButton}
          shippingMethod={shippingMethod}
          summaryTransaction={summaryTransaction}
          grandTotal={grandTotal}
          cart={cart}
          directBuyItem={directBuyItem}
        />
      </div>
    </Container>
  );
}
