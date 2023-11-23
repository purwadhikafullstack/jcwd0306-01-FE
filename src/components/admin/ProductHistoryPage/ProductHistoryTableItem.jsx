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

function ProductHistoryTableItem() {
  const productHistory = useSelector((states) => states.productHistory);
  const [smOpen, setSmOpen] = useState(false);

  const handleSmOpen = () => {
    setSmOpen(true);
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
      {productHistory?.map((val) => (
        <TableRow key={val.id}>
          {/* ID column */}
          <TableCell>{idCounter++}</TableCell>

          {/* Name column */}
          <TableCell>{val?.Product?.name}</TableCell>

          {/* Email column */}
          <TableCell>{val?.Warehouse?.name}</TableCell>

          {/* Warehouse column */}
          <TableCell>{val?.quantity}</TableCell>
          <TableCell>{val?.type}</TableCell>
          <TableCell>
            {val?.User?.firstName ? val?.User?.firstName : '-'}
          </TableCell>
          <TableCell>{formatDate(moment, val?.createdAt)}</TableCell>
          <TableCell>
            <Button size="small" onClick={() => handleSmOpen()}>
              Detail <ArrowOutwardIcon sx={{ maxWidth: 15 }} />
            </Button>
          </TableCell>
        </TableRow>
      ))}
      {/* detail */}
      <StockMutationDetail open={smOpen} setSmOpen={setSmOpen} />
    </TableBody>
  );
}

export default ProductHistoryTableItem;
