import {
  Container,
  Stack,
  TablePagination,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { useSearchParams } from 'react-router-dom';
import { TransactionTable } from '../../components/admin/TransactionPage/TransactionTable';
import api from '../../constants/api';
import { constant } from '../../constants/constant';
import { StatusFilterButton } from '../../components/customer/OrderList/StatusFilterButton';
import { SearchBox } from '../../components/customer/OrderList/Searchbox';
import { fetchTransaction } from '../../components/admin/TransactionPage/fetchTransaction';

export function TransactionPage() {
  const userSelector = useSelector((state) => state.authUser);
  const [searchParams, setSearchParams] = useSearchParams();
  const [transactions, setTransactions] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (userSelector?.id)
      fetchTransaction(
        setIsLoading,
        setTransactions,
        setTotalPage,
        setCount,
        dispatch,
        searchParams
      );
  }, [userSelector, searchParams]);
  return (
    <Container className="p-0">
      <Stack
        sx={{
          p: fullScreen ? 0 : 2,
          bgcolor: 'background.paper',
          borderRadius: 1,
          gap: 2,
        }}
      >
        <Typography variant="h5" sx={{ p: fullScreen ? '0 16px' : 0 }}>
          Transaction List
        </Typography>
        <SearchBox setSearchParams={setSearchParams} />
        <Stack className="flex-row justify-content-between flex-wrap">
          <StatusFilterButton
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <Stack flexGrow={1}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={count}
              rowsPerPage={Number(searchParams.get('limit') || 5)}
              page={
                searchParams.get('page')
                  ? Number(searchParams.get('page')) - 1
                  : 0
              }
              onPageChange={(e, value) => {
                setSearchParams((params) => {
                  params.set(`page`, value + 1);
                  return params;
                });
              }}
              onRowsPerPageChange={(e) => {
                setSearchParams((params) => {
                  params.set('limit', parseInt(e.target.value, 10));
                  params.set('page', 1);
                  return params;
                });
              }}
              sx={{
                '.MuiTablePagination-selectLabel': { margin: '0' },
                '.MuiTablePagination-displayedRows': { margin: '0' },
                '.MuiSelect-select': { padding: '0' },
                '.MuiInputBase-root.MuiInputBase-colorPrimary.MuiTablePagination-input.css-1sm7cl9-MuiInputBase-root-MuiTablePagination-select':
                  { margin: '0 12px 0 0' },
                '.MuiTablePagination-actions': { margin: 0 },
              }}
            />
          </Stack>
        </Stack>
        <TransactionTable
          transactions={transactions}
          isLoading={isLoading}
          setTransactions={setTransactions}
        />
      </Stack>
    </Container>
  );
}
