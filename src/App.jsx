import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Alert from './components/Alert';
import LoadingBar from './components/LoadingBar';
import AdminAppBar from './components/admin/AppBar';
import AdminHomePage from './pages/admin/HomePage';
import CustomerAppBar from './components/customer/AppBar/AppBar';
import CustomerHomePage from './pages/customer/HomePage';

function App() {
  const authUser = null;
  // const authUser = { isAdmin: true };
  // const authUser = useSelector((states) => states.authUser);
  const location = useLocation();
  const pathLocation = location.pathname.split('/')[1];

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
      </Routes>
    </>
  );
}

export default App;
