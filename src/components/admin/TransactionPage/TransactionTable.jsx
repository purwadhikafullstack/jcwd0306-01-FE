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

export function TransactionTable({ transactions = [], setTransactions }) {
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
      <Table sx={{ minWidth: 700 }} aria-label="customized table" stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">No</StyledTableCell>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Total Price</StyledTableCell>
            <StyledTableCell align="center">Transaction Time</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((order, idx) => (
            <TransactionList
              key={order?.id}
              idx={idx}
              order={order}
              setOpen={setOpen}
              fetchDetailTransaction={fetchDetailTransaction}
            />
          ))}
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
