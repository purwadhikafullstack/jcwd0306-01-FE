import '../../components/customer/Cart/Cart.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CartItemList } from '../../components/customer/Cart/CartItemList';
import { StackBorder } from '../../components/customer/Cart/StackBorder';
import { ShoppingSummary } from '../../components/customer/Cart/ShoppingSummary';
import { MobileShoppingSummary } from '../../components/customer/Cart/MobileShoppingSummary';
import { CheckOutHeader } from '../../components/customer/Checkout/CheckOutHeader';
import api from '../../constants/api';
import { fetchPaymentOptions } from '../../components/customer/Checkout/fetchPaymentOptions';
import { setAlertActionCreator } from '../../states/alert/action';

export function Checkout() {
  const cart = useSelector((state) => state.cart).filter(
    (item) => item.isChecked
  );
  const userSelector = { id: 5 };
  const dispatch = useDispatch();
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState({});
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingMethod, setShippingMethod] = useState({});
  const [originWarehouse, setOriginWarehouse] = useState({});
  const [disableButton, setDisableButton] = useState(false);
  const defaultAddress = addresses.find((destination) => destination.isDefault);
  const addressSelector = useSelector((state) => state.selectedAddress);
  const directBuyItem = useLocation().state;
  async function fetchAddresses() {
    const { data } = await api.get(`/user_address/${userSelector.id}`);
    setAddresses(data);
  }

  useEffect(() => {
    if (addressSelector.id) {
      setAddress(addressSelector);
    } else {
      setAddress(defaultAddress);
    }
  }, [defaultAddress?.id, addressSelector]);

  useEffect(() => {
    try {
      fetchPaymentOptions(
        address,
        cart,
        setShippingOptions,
        setOriginWarehouse,
        setDisableButton,
        dispatch
      );
    } catch (error) {
      setAlertActionCreator({
        val: { status: 'error', message: error?.message },
      });
    }
  }, [address]);

  useEffect(() => {
    fetchAddresses();
  }, []);
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
              />
            ))
          )}
        </Col>
        <Col lg={4} md={5} className="position-relative d-none d-md-block">
          <ShoppingSummary address={address} disableButton={disableButton} />
        </Col>
      </Row>
      <div className="sticky-bottom d-sm-block d-md-none bg-white px-2 pt-1 pb-3 border-top border-secondary-subtle">
        <MobileShoppingSummary
          address={address}
          disableButton={disableButton}
        />
      </div>
    </Container>
  );
}
