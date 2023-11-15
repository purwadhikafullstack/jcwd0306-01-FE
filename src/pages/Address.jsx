import { useMediaQuery, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../components/customer/CustomerAddress/Container';
import { OrderChatTemplate } from '../components/OrderChatTemplate';
import useCustomSearchParams from '../hooks/useCustomSearchParams';
import { asyncGetAddress } from '../states/Address/action';

export function CustomerAddressPage() {
  const isDesktop = useMediaQuery('(min-width:600px)');
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchParams, updateQueryParams] = useCustomSearchParams();
  const authUser = useSelector((states) => states.authUser);

  useEffect(() => {
    updateQueryParams({
      page: searchParams.get('page') || 1,
      perPage: searchParams.get('perPage') || 5,
    });
  }, []);

  useEffect(() => {
    if (authUser?.id) {
      dispatch(
        asyncGetAddress({
          userId: authUser?.id,
          name: searchParams.get('name'),
          page: searchParams.get('page'),
          perPage: searchParams.get('perPage'),
        })
      );
    }
  }, [
    dispatch,
    authUser,
    searchParams.get('page'),
    searchParams.get('perPage'),
  ]);

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
