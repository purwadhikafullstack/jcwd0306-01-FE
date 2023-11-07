import { Container, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBoxAndFilter } from '../../components/admin/TransactionPage/SearchBoxAndFilter';
import { TransactionTable } from '../../components/admin/TransactionPage/TransactionTable';
import api from '../../constants/api';
import { constant } from '../../constants/constant';

export function TransactionPage() {
  const userSelector = useSelector((state) => state.authUser);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const fetchTransaction = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/order`);
      setTransactions(data.rows);
    } catch (error) {
      dispatch(constant.setError(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userSelector?.id) fetchTransaction();
  }, [userSelector]);
  return (
    <Container className="p-0">
      <Stack
        sx={{
          p: 2,
          bgcolor: 'background.paper',
          borderRadius: 1,
          gap: 2,
        }}
      >
        <Typography variant="h5">Transaction List</Typography>
        <SearchBoxAndFilter />
        <TransactionTable
          transactions={transactions}
          isLoading={isLoading}
          setTransactions={setTransactions}
        />
      </Stack>
    </Container>
  );
}
