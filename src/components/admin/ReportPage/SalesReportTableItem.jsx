/* eslint-disable no-plusplus */
import { TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetReports } from '../../../states/salesReport/action';

function SalesReportTableItem() {
  const dispatch = useDispatch();
  const reportData = useSelector((states) => states.salesReport);

  useEffect(() => {
    dispatch(asyncGetReports());
  }, []);

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
            bgcolor: index % 2 === 0 ? 'white' : '#9ae8f2',
            ':hover': { bgcolor: '#f5f5f5' },
          }}
        >
          <TableCell>{idCounter++}</TableCell>

          <TableCell>{val.invoiceId}</TableCell>

          <TableCell>{val.UserAddress?.City?.name}</TableCell>

          <TableCell>{val.Warehouse?.WarehouseAddress?.City?.name}</TableCell>

          <TableCell>{val.createdAt}</TableCell>

          <TableCell>{val.total}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default SalesReportTableItem;
