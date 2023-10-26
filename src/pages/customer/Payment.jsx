import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PaymentHeader } from '../../components/customer/Payment/PaymentHeader';
import { PaymentBody } from '../../components/customer/Payment/PaymentBody';
import api from '../../constants/api';

export function Payment() {
  const directTransactionData = useLocation().state;
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState({});
  const fetchOrder = async () => {
    const { data } = await api.get(`/order/${orderId}`);
    setOrderData(data);
  };

  useEffect(() => {
    if (directTransactionData) setOrderData(directTransactionData);
    else fetchOrder();
  }, []);
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <PaymentHeader orderData={orderData} />
        <PaymentBody orderData={orderData} />
      </Box>
    </Container>
  );
}
