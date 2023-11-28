import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { constant } from '../../../constants/constant';
import { StyledTableCell, StyledTableRow } from './StyledTableCellAndRow';

export function TransactionList({
  order = {},
  idx = 0,
  setOpen,
  fetchDetailTransaction,
}) {
  const dispatch = useDispatch();
  return (
    <StyledTableRow key={order?.id}>
      <StyledTableCell
        component="th"
        scope="row"
        align="right"
        width="3%"
        sx={{ display: { xs: 'none', md: 'table-cell' } }}
      >
        {order?.warehouseId}
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
        {Number(order.total).toLocaleString(`id-ID`)}
      </StyledTableCell>
      <StyledTableCell align="center" className="d-none d-sm-table-cell">
        <div className="d-flex gap-1 justify-content-center">
          <span className="d-none d-md-inline">
            {new Date(order?.updatedAt).toDateString()}
          </span>
          <span className="d-md-none d-inline">
            {new Date(order?.updatedAt).toLocaleDateString(`id-ID`)}
          </span>
          <span className="d-none d-md-inline">
            {new Date(order?.updatedAt).toTimeString(`id-ID`).slice(0, 8)}
          </span>
        </div>
      </StyledTableCell>
      <StyledTableCell align="center">
        <div className="d-flex gap-2 justify-content-center flex-wrap">
          <Button
            sx={{ p: 0 }}
            onClick={() => {
              setOpen(true);
              fetchDetailTransaction(order?.id);
            }}
          >
            <span className="d-none d-md-inline">
              {order.status === 'verifying' ? 'Verify' : 'Update'}
            </span>
            <span className="d-md-none d-inline">
              <MenuIcon />
            </span>
          </Button>
          <Button
            sx={{ p: 0 }}
            onClick={() => {
              dispatch({
                type: constant.setChatRoom,
                payload: new Map([
                  ['receiverId', order?.userId],
                  ['orderId', order?.id],
                  ['warehouseId', order?.warehouseId],
                  [
                    'name',
                    `${order?.User?.firstName} ${order?.User?.lastName}`,
                  ],
                ]),
              });
            }}
          >
            <span className="d-none d-md-inline">Message</span>
            <span className="d-md-none d-inline">
              <SendIcon />
            </span>
          </Button>
        </div>
      </StyledTableCell>
    </StyledTableRow>
  );
}
