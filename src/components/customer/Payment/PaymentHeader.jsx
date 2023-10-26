import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export function PaymentHeader({ orderData }) {
  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: '#009BD2' }}>
        <ReceiptLongIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Selesaikan pembayaran dalam
      </Typography>
      <Typography component="h1" variant="h6">
        {orderData.updatedAt}
      </Typography>
      <Typography variant="h7">Batas akhir pembayaran</Typography>
      <Typography variant="h7">Thursday, 30 October 2023 09:31:35</Typography>
      <Typography variant="h7" sx={{ textAlign: 'center', color: '#009BD2' }}>
        Your item(s) may be taken by others before you settle this payment
      </Typography>
    </>
  );
}
