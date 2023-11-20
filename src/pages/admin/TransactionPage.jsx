import {
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import { TransactionTable } from '../../components/admin/TransactionPage/TransactionTable';
import { StatusFilterButton } from '../../components/customer/OrderList/StatusFilterButton';
import { SearchBox } from '../../components/customer/OrderList/Searchbox';
import { fetchTransaction } from '../../components/admin/TransactionPage/fetchTransaction';
import { PaginationTable } from '../../components/admin/TransactionPage/PaginationTable';
import { WarehouseSelect } from '../../components/admin/TransactionPage/WarehouseSelect';

function idSetter(setWarehouseIds, warehouseId = []) {
  const temp = [];
  warehouseId.forEach((val) => temp.push(val.warehouseId));
  return setWarehouseIds(temp);
}

export function TransactionPage({ warehouseId }) {
  const userSelector = useSelector((state) => state.authUser);
  const [searchParams, setSearchParams] = useSearchParams();
  const [transactions, setTransactions] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [warehouseIds, setWarehouseIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const xsOnly = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    idSetter(setWarehouseIds, warehouseId);
  }, [warehouseId]);

  useEffect(() => {
    setSearchParams((params) =>
      params.set('warehouseId', JSON.stringify(warehouseIds))
    );
  }, [warehouseIds]);

  useEffect(() => {
    if (userSelector?.id) {
      fetchTransaction(
        setIsLoading,
        setTransactions,
        setTotalPage,
        setCount,
        dispatch,
        searchParams
      );
    }
  }, [userSelector, searchParams]);
  return (
    <Container className="p-0">
      <Stack
        sx={{
          p: fullScreen ? '16px 0' : 2,
          bgcolor: 'background.paper',
          borderRadius: 1,
          gap: 2,
          minHeight: '91vh',
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" sx={{ p: fullScreen ? '0 16px' : 0 }}>
            Transaction List
          </Typography>
          <Button
            sx={{ display: xsOnly ? 'none' : 'inline' }}
            onClick={() => setShowMenu(!showMenu)}
          >
            <WidgetsRoundedIcon />
          </Button>
        </Stack>
        <Stack direction="row" className="w-100 flex-wrap gap-3">
          <SearchBox setSearchParams={setSearchParams} />
          {showMenu || xsOnly ? (
            <WarehouseSelect
              warehouseIds={warehouseIds}
              setWarehouseIds={setWarehouseIds}
            />
          ) : null}
        </Stack>
        {showMenu || xsOnly ? (
          <Stack className="flex-row justify-content-between flex-wrap">
            <StatusFilterButton
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
            <Stack flexGrow={1} className="align-items-end justify-content-end">
              <PaginationTable
                count={count}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </Stack>
          </Stack>
        ) : null}
        <Stack>
          <TransactionTable
            transactions={transactions}
            isLoading={isLoading}
            setTransactions={setTransactions}
          />
          <PaginationTable
            count={count}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </Stack>
      </Stack>
    </Container>
  );
}
