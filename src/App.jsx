import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useTheme } from '@mui/material';
import { LoginPage } from './pages/LoginPage';
import Alert from './components/Alert';
import LoadingBar from './components/LoadingBar';
import AdminAppBar from './components/admin/AppBar/AppBar';
import CustomerAppBar from './components/customer/AppBar/AppBar';
import HomePage from './pages/customer/HomePage';
import { Cart } from './pages/customer/Cart';
import api from './constants/api';
import { constant } from './constants/constant';
import { Checkout } from './pages/customer/Checkout';
import { Register } from './pages/register';
import { Verify } from './pages/verify';
import ProductDetailPage from './pages/customer/ProductDetailPage';
import { asyncReceiveUser } from './states/authUser/action';
import { ProfileDashoard } from './pages/customer/Profile';
import WarehousePage from './pages/admin/WarehousePage';
import DashboardPage from './pages/admin/DashboardPage';
import CategoryPage from './pages/admin/CategoryPage';
import { Payment } from './pages/customer/OrderPayment';
import { TransitionPage } from './pages/customer/Transition';
import { PaymentList } from './pages/customer/PaymentList';
import { OrderList } from './pages/customer/OrderList';
import { ChatRoom } from './pages/customer/Chatroom';
import ForgetPassword from './pages/ForgetPassword';
import ChangePassword from './pages/ChangePassword';
import { CustomerAddressPage } from './pages/customer/Address';
import { AuthorizeUser } from './middlewares/auth';

function App() {
  const authUser = useSelector((states) => states.authUser);
  const location = useLocation();
  const pathLocation = location.pathname.split('/')[1];
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(asyncReceiveUser());
  }, [dispatch]);

  useEffect(() => {
    if (pathLocation === 'admin')
      document.body.style.backgroundColor = theme.palette.action.selected;
    else document.body.style.backgroundColor = theme.palette.background.paper;
  }, [pathLocation]);

  // TEMPORARY AJA, nunggu login jadi
  const fetchCartItem = async () => {
    if (authUser?.id) {
      const { data } = await api.get(`/user/details/${authUser?.id}`);
      dispatch({ type: constant.updateProductOnCart, payload: data.Carts });
      dispatch({ type: constant.updateUnpaid, payload: data.UserOrder });
    }
  };

  useEffect(() => {
    fetchCartItem();
  }, [authUser?.id]);

  // ADMIN PAGE
  if (pathLocation === 'admin') {
    if (authUser == null) return null;
    if (authUser?.isAdmin || authUser?.isWarehouseAdmin) {
      return (
        <>
          <Alert />
          <LoadingBar />
          <AdminAppBar />
          <Routes>
            <Route path="/admin/categories" element={<CategoryPage />} />
            <Route path="/admin/warehouses" element={<WarehousePage />} />
            <Route path="/admin" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="/admin" />} />
          </Routes>
        </>
      );
    }

    return <Navigate to="/" replace />;
  }

  // CUSTOMER PAGE
  return (
    <>
      <Alert />
      <LoadingBar />
      <CustomerAppBar />
      <Routes>
        {authUser === null && <Route path="/login" element={<LoginPage />} />}
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        {authUser !== null && <Route path="/verify" element={<Verify />} />}
        <Route path="/cart/shipment" element={<Checkout />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route
          path="/user/settings"
          element={
            <AuthorizeUser>
              <ProfileDashoard />
            </AuthorizeUser>
          }
        />
        <Route path="/payment" element={<TransitionPage />} />
        <Route path="/payment/payment-list" element={<PaymentList />} />
        <Route path="/payment/:orderId" element={<Payment />} />
        <Route path="/order-list" element={<OrderList />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        {authUser === null && (
          <Route path="/forget-password" element={<ForgetPassword />} />
        )}
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/user/address" element={<CustomerAddressPage />} />
      </Routes>
    </>
  );
}

export default App;
