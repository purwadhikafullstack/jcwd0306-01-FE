import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { PaymentHeader } from '../../components/customer/Payment/PaymentHeader';
import { PaymentBody } from '../../components/customer/Payment/PaymentBody';

export function Payment() {
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
        <PaymentHeader />
        <PaymentBody />
      </Box>
    </Container>
  );
}
