import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useTheme } from '@mui/material';
import { LoginPage } from './pages/LoginPage';
import Alert from './components/Alert';
import LoadingBar from './components/LoadingBar';
import AdminAppBar from './components/admin/AppBar/AppBar';
import AdminHomePage from './pages/admin/HomePage';
import CustomerAppBar from './components/customer/AppBar/AppBar';
import CustomerHomePage from './pages/customer/HomePage';
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
      const { data } = await api.get(`/cart/${authUser?.id}`);
      dispatch({ type: constant.updateProductOnCart, payload: data });
    }
  };

  useEffect(() => {
    fetchCartItem();
  }, [authUser?.id]);

  if (pathLocation === 'admin') {
    if (authUser?.isAdmin || authUser?.isWarehouseAdmin) {
      return (
        <>
          <Alert />
          <LoadingBar />
          <AdminAppBar />
          <Routes>
            <Route path="/admin/warehouses" element={<WarehousePage />} />
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="*" element={<Navigate to="/admin" />} />
          </Routes>
        </>
      );
    }
    return null;
  }

  return (
    <>
      <Alert />
      <LoadingBar />
      <CustomerAppBar />
      <Routes>
        {authUser === null && <Route path="/login" element={<LoginPage />} />}
        <Route path="/" element={<CustomerHomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/cart/shipment" element={<Checkout />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/profile" element={<ProfileDashoard />} />
      </Routes>
    </>
  );
}

export default App;
