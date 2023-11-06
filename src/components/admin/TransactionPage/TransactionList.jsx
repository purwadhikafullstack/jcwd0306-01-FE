import { Button } from '@mui/material';
import { constant } from '../../../constants/constant';
import { StyledTableCell, StyledTableRow } from './StyledTableCellAndRow';

export function TransactionList({
  order = {},
  idx = 0,
  setOpen,
  fetchDetailTransaction,
}) {
  return (
    <StyledTableRow key={order?.id}>
      <StyledTableCell component="th" scope="row" align="right" width="3%">
        {idx + 1}
      </StyledTableCell>
      <StyledTableCell align="right">{order?.id}</StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{ color: constant[`${order?.status}Color`] }}
      >
        {order?.status}
      </StyledTableCell>
      <StyledTableCell align="right">
        Rp
        {Number(order.total + order.shippingPrice).toLocaleString(`id-ID`)}
      </StyledTableCell>
      <StyledTableCell align="center">
        {new Date(order?.updatedAt).toDateString()}

        {new Date(order?.updatedAt).toTimeString(`id-ID`).slice(0, 8)}
      </StyledTableCell>
      <StyledTableCell align="center">
        <div className="d-flex gap-2 justify-content-center">
          <Button
            sx={{ p: 0 }}
            onClick={() => {
              setOpen(true);
              fetchDetailTransaction(order?.id);
            }}
          >
            Verify
          </Button>
          <Button sx={{ p: 0 }}>Message</Button>
        </div>
      </StyledTableCell>
    </StyledTableRow>
  );
}
