import { Button, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import handleUpdateStatus from './handleUpdateStatus';

export function VerficationActionButton({
  order = {},
  setOpen,
  transactions,
  setTransactions,
}) {
  const adminSelector = useSelector((state) => state.authUser);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <Stack gap={1} borderTop="4px solid gainsboro" pt={2} pb={1}>
      <Stack direction="row" justifyContent="center" gap={4}>
        <Button
          variant="contained"
          color="warning"
          disabled={isLoading}
          onClick={() =>
            handleUpdateStatus(
              dispatch,
              setOpen,
              setIsLoading,
              setTransactions,
              transactions,
              adminSelector,
              order,
              'unpaid'
            )
          }
        >
          Reject
        </Button>
        <Button
          disabled={isLoading}
          onClick={() =>
            handleUpdateStatus(
              dispatch,
              setOpen,
              setIsLoading,
              setTransactions,
              transactions,
              adminSelector,
              order,
              'processed'
            )
          }
        >
          Confirm
        </Button>
      </Stack>
    </Stack>
  );
}
