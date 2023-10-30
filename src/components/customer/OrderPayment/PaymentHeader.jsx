import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { countDownTimer } from './countDownTimer';

export function PaymentHeader({ orderData }) {
  const [timer, setTimer] = useState(0);

  const deadline = new Date(orderData?.createdAt).setDate(
    new Date(orderData?.createdAt).getDate() + 1
  );

  useEffect(() => {
    setTimer(
      new Date(orderData?.createdAt).setDate(
        new Date(orderData?.createdAt).getDate() + 1
      ) - new Date()
    );
  }, [orderData]);
  useEffect(() => {
    if (timer > 0) setTimeout(() => setTimer(timer - 1000), 1000);
  }, [timer]);
  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: '#009BD2' }}>
        <ReceiptLongIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Selesaikan pembayaran dalam
      </Typography>
      <Typography variant="h6">
        {timer > 0 ? countDownTimer(timer) : '00:00:00'}
      </Typography>
      <Typography variant="h7">Batas akhir pembayaran</Typography>
      <Typography variant="h7">
        {`${new Date(deadline).toDateString()} ${new Date(deadline)
          .toLocaleTimeString(`id-ID`)
          .replace(/\./g, `:`)}`}
      </Typography>
      <Typography variant="h7" sx={{ textAlign: 'center', color: 'orange' }}>
        <b>
          Your item(s) may be taken by others before you settle this payment
        </b>
      </Typography>
    </>
  );
}
