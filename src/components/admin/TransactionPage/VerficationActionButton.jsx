import { Button, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import handleUpdateStatus from './handleUpdateStatus';
import { ConfirmationModal } from '../../ConfirmationModal';

export function VerficationActionButton({
  order = {},
  setOpen,
  transactions,
  setTransactions,
  receipt,
}) {
  const adminSelector = useSelector((state) => state.authUser);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState('');
  const [status, setStatus] = useState('');
  const [actionName, setActionName] = useState('');
  const dispatch = useDispatch();
  const action = {
    name: actionName,
    fn: () => {
      handleUpdateStatus(
        dispatch,
        setOpen,
        setShow,
        setIsLoading,
        setTransactions,
        transactions,
        adminSelector,
        order,
        status,
        receipt
      );
    },
  };

  return (
    <Stack gap={1} borderTop="4px solid gainsboro" pt={2} pb={1}>
      <Stack direction="row" justifyContent="center" gap={4}>
        {['unpaid', 'verifying', 'processed'].includes(order.status) && (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setShow('cancel');
              setOpen(false);
              setActionName('reject and cancel this transaction');
              setStatus('rejected');
            }}
          >
            Cancel
          </Button>
        )}
        {order.status === 'verifying' && (
          <>
            <Button
              variant="contained"
              color="warning"
              disabled={isLoading}
              onClick={() => {
                setShow(true);
                setOpen(false);
                setActionName("reject this transaction's payment");
                setStatus('unpaid');
              }}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              disabled={isLoading}
              onClick={() => {
                setShow(true);
                setOpen(false);
                setActionName('confirm this payment');
                setStatus('processed');
              }}
            >
              Confirm
            </Button>
          </>
        )}
        {order.status === 'processed' && (
          <Button
            variant="contained"
            disabled={isLoading || !receipt}
            onClick={() => {
              setShow(true);
              setOpen(false);
              setActionName('send this order');
              setStatus('shipped');
            }}
          >
            Send
          </Button>
        )}
      </Stack>
      <ConfirmationModal
        action={action.fn}
        show={show}
        setShow={setShow}
        actionName={action.name}
      />
    </Stack>
  );
}
