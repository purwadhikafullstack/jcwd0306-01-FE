import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyledTableCell } from './StyledTableCellAndRow';
import { TransactionList } from './TransactionList';
import { ModalDetailTransaction } from '../../customer/OrderList/ModalDetailTransaction';
import api from '../../../constants/api';
import { constant } from '../../../constants/constant';
import { ModalLoading } from '../../customer/OrderList/ModalDetailTransaction/ModalLoading';
import { ImageDetail } from '../../ImageDetail';

export function TransactionTable({
  transactions = [],
  setTransactions,
  fetchTransaction,
}) {
  const [transaction, setTransaction] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const dispatch = useDispatch();
  const fetchDetailTransaction = async (transactionId = 0) => {
    try {
      setIsFetching(true);
      const { data } = await api.get(`/order/${transactionId}`);
      setTransaction(data);
    } catch (error) {
      dispatch(constant.setError(error));
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (transaction?.id)
      setImgSrc(
        `${import.meta.env.VITE_API_BASE_URL}/order/payment_proof/${
          transaction?.id
        }`
      );
  }, [transaction]);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table" stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell
              align="center"
              sx={{ display: { xs: 'none', md: 'table-cell' } }}
            >
              WHID
            </StyledTableCell>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">
              <span className="d-none d-md-inline">Total Price</span>
              <span className="d-md-none d-inline">Price</span>
            </StyledTableCell>
            <StyledTableCell align="center" className="d-none d-sm-table-cell">
              <span className="d-none d-md-inline">Transaction Time</span>
              <span className="d-md-none d-inline">Date</span>
            </StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.length ? (
            transactions.map((order, idx) => (
              <TransactionList
                key={order?.id}
                idx={idx}
                order={order}
                setOpen={setOpen}
                fetchDetailTransaction={fetchDetailTransaction}
              />
            ))
          ) : (
            <TableRow>
              <StyledTableCell />
              <StyledTableCell />
              <StyledTableCell />
              <StyledTableCell sx={{ textAlign: 'center' }}>
                No item match
              </StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isFetching ? (
        <ModalLoading open={open} />
      ) : (
        <ModalDetailTransaction
          order={transaction}
          open={open}
          setOpen={setOpen}
          setShow={setShow}
          imgSrc={imgSrc}
          transactions={transactions}
          setTransactions={setTransactions}
          fetchTransaction={fetchTransaction}
        />
      )}
      <ImageDetail
        open={show}
        setOpen={setShow}
        imgSrc={imgSrc}
        showPreviousModal={setOpen}
      />
    </TableContainer>
  );
}
