import { useMediaQuery, useTheme } from '@mui/material';
import Container from '../../components/customer/CustomerAddress/Container';
import { OrderChatTemplate } from '../../components/OrderChatTemplate';

export function CustomerAddressPage() {
  const isDesktop = useMediaQuery('(min-width:600px)');

  const theme = useTheme();
  return (
    <main
      style={{
        maxWidth: theme.breakpoints.values.lg,
        padding: isDesktop ? '1rem' : '5px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <OrderChatTemplate>
        <Container />
      </OrderChatTemplate>
    </main>
  );
}
