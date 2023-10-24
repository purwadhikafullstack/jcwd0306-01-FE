import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LoginPage } from './pages/LoginPage';
import Alert from './components/Alert';
import LoadingBar from './components/LoadingBar';
import AdminAppBar from './components/admin/AppBar';
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

function App() {
  const authUser = useSelector((states) => states.authUser);
  const location = useLocation();
  const pathLocation = location.pathname.split('/')[1];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveUser());
  }, [dispatch]);

  // TEMPORARY AJA, nunggu login jadi
  const fetchCartItem = async () => {
    const { data } = await api.get('/cart/5');
    dispatch({ type: constant.updateProductOnCart, payload: data });
  };

  useEffect(() => {
    fetchCartItem();
  }, []);

  if (pathLocation === 'admin') {
    if (!authUser?.isAdmin || !authUser?.isWarehouseAdmin) {
      return (
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      );
    }
    return (
      <>
        <Alert />
        <LoadingBar />
        <AdminAppBar />
        <Routes>
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </>
    );
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
