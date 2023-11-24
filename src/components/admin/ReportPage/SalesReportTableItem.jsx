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
import formatCurrency from '../../../utils/salesReport/formatCurrency';
import api from '../../../constants/api';
import { ModalDetailTransaction } from '../../customer/OrderList/ModalDetailTransaction';
import { ModalLoading } from '../../customer/OrderList/ModalDetailTransaction/ModalLoading';

function SalesReportTableItem() {
  const reportData = useSelector((states) => states.salesReport);

  const [open, setOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [order, setOrder] = useState({});

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

  let idCounter = 1;

  // Filter out items with total quantity of 0 or null
  const filteredReportData = reportData.filter(
    (val) =>
      val?.OrderProducts?.reduce((sum, product) => sum + product.quantity, 0) >
      0
  );

  return (
    <TableBody>
      {/* When filtered reportData not found */}
      {!filteredReportData.length && (
        <TableRow>
          <TableCell colSpan={5}>
            <Typography variant="body2" align="center" ml={10}>
              Data tidak ditemukan
            </Typography>
          </TableCell>
        </TableRow>
      )}

      {/* When filtered reportData exist */}
      {filteredReportData?.map((val, index) => {
        // Calculate the sum of product quantities
        const totalQuantity = val?.OrderProducts?.reduce(
          (sum, product) => sum + product.quantity,
          0
        );

        return (
          <TableRow
            key={val.id}
            sx={{
              bgcolor: index % 2 === 0 ? 'white' : '#d2f5f9',
              ':hover': { bgcolor: '#f5f5f5' },
            }}
          >
            <TableCell>{idCounter++}</TableCell>
            <TableCell>{val?.id}</TableCell>
            <TableCell>{val?.UserAddress?.City?.name}</TableCell>
            <TableCell>
              {val?.Warehouse?.WarehouseAddress?.City?.name}
            </TableCell>
            <TableCell>{formatDate(moment, val?.createdAt)}</TableCell>
            <TableCell>{totalQuantity}</TableCell>{' '}
            {/* Use the calculated value */}
            <TableCell>{val?.OrderProducts?.length}</TableCell>
            <TableCell>{formatCurrency(val?.total)}</TableCell>
            <TableCell>
              <Button
                size="small"
                onClick={() => {
                  fetchDetailOrder(val?.id);
                  setOpen(true);
                }}
              >
                Detail <ArrowOutwardIcon sx={{ maxWidth: 15 }} />
              </Button>
            </TableCell>
          </TableRow>
        );
      })}
      {isFetching ? (
        <ModalLoading open={open} />
      ) : (
        <ModalDetailTransaction open={open} setOpen={setOpen} order={order} />
      )}
    </TableBody>
  );
}

export default SalesReportTableItem;
