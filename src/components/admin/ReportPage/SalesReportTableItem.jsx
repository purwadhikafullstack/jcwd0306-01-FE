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
import formatDate from '../../../utils/salesReport/formatDate';
import formatCurrency from '../../../utils/salesReport/formatCurrency';
import api from '../../../constants/api';

function SalesReportTableItem() {
  const reportData = useSelector((states) => states.salesReport);

  const fetchDetailOrder = async (orderId) => {
    try {
      const { data } = await api.get(`/order/${orderId}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  let idCounter = 1;
  return (
    <TableBody>
      {/* When reportData not found */}
      {!reportData.length && (
        <TableRow>
          <TableCell colSpan={5}>
            <Typography variant="body2" align="center" ml={10}>
              Data tidak ditemukan
            </Typography>
          </TableCell>
        </TableRow>
      )}

      {/* When category exist */}
      {reportData.map((val, index) => (
        <TableRow
          key={val.id}
          sx={{
            bgcolor: index % 2 === 0 ? 'white' : '#d2f5f9',
            ':hover': { bgcolor: '#f5f5f5' },
          }}
        >
          <TableCell>{idCounter++}</TableCell>

          <TableCell>{val.id}</TableCell>

          <TableCell>{val.UserAddress?.City?.name}</TableCell>

          <TableCell>{val.Warehouse?.WarehouseAddress?.City?.name}</TableCell>

          <TableCell>{formatDate(moment, val.createdAt)}</TableCell>

          <TableCell>{formatCurrency(val.total)}</TableCell>

          <TableCell>
            <Button size="small" onClick={() => fetchDetailOrder(val?.id)}>
              Detail <ArrowOutwardIcon sx={{ maxWidth: 15 }} />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default SalesReportTableItem;
