import { Typography } from '@mui/material';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export function PaymentHeaderPaid({
  expression = 'Thank you',
  message = 'Your order is now being verified by admin',
  message2 = 'Please wait',
  orderData = {},
}) {
  return (
    <>
      {orderData?.status === 'verifying' ? (
        <FactCheckIcon style={{ color: '#009BD2' }} fontSize="large" />
      ) : null}
      {orderData?.status === 'cancelled' || orderData?.status === 'rejected' ? (
        <CancelIcon style={{ color: 'red' }} fontSize="large" />
      ) : null}
      {orderData?.status === 'processed' || orderData?.status === 'shipped' ? (
        <CheckCircleIcon color="success" fontSize="large" />
      ) : null}
      <Typography variant="h5">{expression}</Typography>
      <Typography variant="h5">{message}</Typography>
      <Typography variant="h5">{message2}</Typography>
    </>
  );
}
