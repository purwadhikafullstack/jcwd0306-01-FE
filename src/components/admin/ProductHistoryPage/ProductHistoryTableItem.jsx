/* eslint-disable no-plusplus */
import {
  Button,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useState } from 'react';
import formatDate from '../../../utils/salesReport/formatDate';
import { StockMutationDetail } from './detail/StockMutationDetail';
import { ModalDetailTransaction } from '../../customer/OrderList/ModalDetailTransaction';
import { ModalLoading } from '../../customer/OrderList/ModalDetailTransaction/ModalLoading';
import api from '../../../constants/api';

function ProductHistoryTableItem() {
  const productHistory = useSelector((states) => states.productHistory);
  const authUser = useSelector((states) => states.authUser);
  console.log(authUser);
  const [smOpen, setSmOpen] = useState(false);
  const [orderDetailOpen, setOrderDetailOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [order, setOrder] = useState(false);
  const [stockMutationData, setStockMutationData] = useState({});

  const fetchDetailOrder = async (orderId) => {
    try {
      setIsFetching(true);
      const { data } = await api.get(`/order/${orderId}`);
      setOrder(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchStockMutation = async (stockMutationId) => {
    try {
      setIsFetching(true);
      const { data } = await api.get(
        `/product-history/stock-mutation/${stockMutationId}`
      );
      setStockMutationData(data?.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleDetailOpen = (val) => {
    if (val?.type === 'manual') alert('manual');
    else if (val?.type === 'stock-mutation') {
      fetchStockMutation(val?.stockMutationId);
      setSmOpen(true);
    } else {
      fetchDetailOrder(val?.orderId);
      setOrderDetailOpen(true);
    }
  };

  let idCounter = 1;
  return (
    <TableBody>
      {/* When Stock-History not found */}
      {!productHistory?.length && (
        <TableRow>
          <TableCell colSpan={5}>
            <Typography variant="body2" align="center" ml={10}>
              Stock History Not Found
            </Typography>
          </TableCell>
        </TableRow>
      )}

      {/* When category exist */}
      {productHistory?.map((val, index) => (
        <TableRow
          key={val.id}
          sx={{
            bgcolor: index % 2 === 0 ? 'white' : '#d2f5f9',
            ':hover': { bgcolor: '#f5f5f5' },
          }}
        >
          {/* ID column */}
          <TableCell>{idCounter++}</TableCell>

          {/* Name column */}
          <TableCell>{val?.Product?.name}</TableCell>

          {/* Email column */}
          <TableCell>{val?.Warehouse?.name}</TableCell>

          {/* Warehouse column */}
          <TableCell>{val?.quantity}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>
            {val?.updatedStock}
          </TableCell>
          <TableCell>{val?.type}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>
            {val?.User?.firstName ? val?.User?.firstName : '-'}
          </TableCell>
          <TableCell>{formatDate(moment, val?.createdAt)}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>
            {val?.type === 'manual' ? (
              '-'
            ) : (
              <Button size="small" onClick={() => handleDetailOpen(val)}>
                Detail <ArrowOutwardIcon sx={{ maxWidth: 15 }} />
              </Button>
            )}
          </TableCell>
        </TableRow>
      ))}
      {/* detail */}
      {isFetching ? (
        <ModalLoading open={isFetching} />
      ) : (
        <>
          {/* Type: Order */}
          <ModalDetailTransaction
            open={orderDetailOpen}
            setOpen={setOrderDetailOpen}
            order={order}
          />
          {/* Type: stock-mutation */}
          <StockMutationDetail
            open={smOpen}
            setSmOpen={setSmOpen}
            data={stockMutationData}
          />
        </>
      )}
    </TableBody>
  );
}

export default ProductHistoryTableItem;
