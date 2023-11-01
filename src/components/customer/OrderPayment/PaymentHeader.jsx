import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@mui/material';
import { countDownTimer } from './countDownTimer';
import { PaymentMethod } from '../PaymentList/PaymentMethod';
import { TotalPayment } from '../PaymentList/TotalPayment';

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
        Complete your payment
      </Typography>
      <Typography variant="h6">
        {timer > 0 ? countDownTimer(timer) : '00:00:00'}
      </Typography>
      <Typography variant="h7">
        Deadline:{' '}
        {`${new Date(deadline).toDateString()} ${new Date(deadline)
          .toLocaleTimeString(`id-ID`)
          .replace(/\./g, `:`)}`}
      </Typography>
      <Typography variant="h7" sx={{ textAlign: 'center', color: 'orange' }}>
        <b>
          Your item(s) may be taken by others before you settle this payment
        </b>
      </Typography>
      <Card>
        <CardContent>
          <PaymentMethod order={orderData} />
          <div className="mt-2 d-block d-md-none">
            <TotalPayment order={orderData} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
