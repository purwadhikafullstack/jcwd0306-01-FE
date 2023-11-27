import { Pagination, Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { OrderChatTemplate } from '../../components/OrderChatTemplate';
import { fetchOrder } from '../../components/customer/OrderList/fetchOrder';
import { OrderListItem } from '../../components/customer/OrderList/OrderListItem';
import { SearchBox } from '../../components/customer/OrderList/Searchbox';
import { StatusFilterButton } from '../../components/customer/OrderList/StatusFilterButton';
import { ModalDetailTransaction } from '../../components/customer/OrderList/ModalDetailTransaction';

export function OrderList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [orderDetail, setOrderDetail] = useState({});
  const [open, setOpen] = useState(false);
  const userSelector = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userSelector?.id)
      fetchOrder(
        searchParams,
        setOrders,
        setTotalPage,
        userSelector,
        setIsLoading,
        dispatch
      );
  }, [userSelector?.id, searchParams]);
  return (
    <OrderChatTemplate>
      <Stack gap={2}>
        <h5>Your order</h5>
        <Stack direction="row" gap={1}>
          <SearchBox setSearchParams={setSearchParams} />
        </Stack>
        <StatusFilterButton
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
        {isLoading ? (
          <div
            className="w-100 d-flex justify-content-center align-items-center"
            style={{ minHeight: '200px' }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Stack direction="column" gap={1} sx={{ fontSize: '0.9em' }}>
            {orders.length ? (
              orders.map((order) => (
                <OrderListItem
                  order={order}
                  setOrders={setOrders}
                  key={order?.id}
                  setOrderDetail={setOrderDetail}
                  setOpen={setOpen}
                />
              ))
            ) : (
              <div
                className="w-100 d-flex align-items-center justify-content-center"
                style={{ height: '50vh' }}
              >
                {window.location.path === '/payment/payment-list'
                  ? 'You have no payment to be settled'
                  : 'You have no record'}
              </div>
            )}
          </Stack>
        )}
        {totalPage > 1 ? (
          <Stack spacing={2} alignItems="center">
            <Pagination
              count={totalPage}
              variant="outlined"
              shape="rounded"
              onChange={(e, value) => {
                setSearchParams((params) => {
                  params.set('page', value);
                  return params;
                });
                window.scrollTo(0, 0);
              }}
            />
          </Stack>
        ) : null}
      </Stack>
      <ModalDetailTransaction
        open={open}
        setOpen={setOpen}
        order={orderDetail}
      />
    </OrderChatTemplate>
  );
}
