/* eslint-disable no-plusplus */
import {
  Button,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useState, useContext } from 'react';
import formatDate from '../../../utils/salesReport/formatDate';
import { StockMutationDetail } from './detail/StockMutationDetail';
import { ModalDetailTransaction } from '../../customer/OrderList/ModalDetailTransaction';
import { ModalLoading } from '../../customer/OrderList/ModalDetailTransaction/ModalLoading';
import api from '../../../constants/api';
import ModeContext from '../../../contexts/ModeContext';
import { setAlertActionCreator } from '../../../states/alert/action';

function ProductHistoryTableItem() {
  const productHistory = useSelector((states) => states.productHistory);
  const [smOpen, setSmOpen] = useState(false);
  const [orderDetailOpen, setOrderDetailOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [order, setOrder] = useState(false);
  const [stockMutationData, setStockMutationData] = useState({});
  const { mode } = useContext(ModeContext);
  const dispatch = useDispatch();

  const isDarkMode = mode === 'dark';
  const evenRowColor = isDarkMode ? '#1a1a1a' : 'white';
  const oddRowColor = isDarkMode ? '#262626' : '#d2f5f9';
  const hoverColor = isDarkMode ? '#333333' : '#f5f5f5';

  const fetchDetailOrder = async (orderId) => {
    try {
      setIsFetching(true);
      const { data } = await api.get(`/order/${orderId}`);
      setOrder(data);
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
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
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    } finally {
      setIsFetching(false);
    }
  };

  const handleDetailOpen = (val) => {
    if (val?.type === 'stock-mutation') {
      fetchStockMutation(val?.stockMutationId);
      setSmOpen(true);
    } else {
      fetchDetailOrder(val?.orderId);
      setOrderDetailOpen(true);
    }
  };

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
            bgcolor: index % 2 === 0 ? evenRowColor : oddRowColor,
            ':hover': { bgcolor: hoverColor },
          }}
        >
          {/* No column */}
          <TableCell>{index + 1}</TableCell>

          {/* Name column */}
          <TableCell>{val?.Product?.name}</TableCell>

          {/* Email column */}
          <TableCell>{val?.Warehouse?.name}</TableCell>

          {/* quantity column */}
          <TableCell sx={{ textAlign: 'center' }}>
            <span
              style={{
                color: val?.quantity.toString().includes('-') ? 'red' : 'green',
                fontWeight: 'bold',
                fontSize: '15px',
              }}
            >
              {val?.quantity.toString().includes('-')
                ? val?.quantity
                : `+${val?.quantity}`}
            </span>
          </TableCell>

          {/* updated stock column */}
          <TableCell sx={{ textAlign: 'center' }}>
            {val?.updatedStock}
          </TableCell>

          {/* type column */}
          <TableCell>{val?.type}</TableCell>

          {/* admin name column */}
          <TableCell sx={{ textAlign: 'center' }}>
            {val?.User?.firstName ? val?.User?.firstName : '-'}
          </TableCell>

          {/* date column */}
          <TableCell>{formatDate(moment, val?.createdAt)}</TableCell>

          {/* Button Detail column */}
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
