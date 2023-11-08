import { Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

export function StatusFilterButton({ setSearchParams, searchParams }) {
  const [status, setStatus] = useState('');
  const [subStatus, setSubStatus] = useState('');
  const handleChange = (
    statusFilter = '',
    statusName = '',
    subStatusName = ''
  ) => {
    if (statusFilter === status && subStatusName === subStatus) return;
    setSearchParams((params) => {
      if (statusFilter !== status) params.delete(`substatus`);
      if (statusFilter === '') params.delete(`status`);
      else params.set(`status`, statusFilter);
      if (subStatusName) params.set(`substatus`, subStatusName);
      params.set(`page`, 1);
      return params;
    });
    setStatus(statusName);
    setSubStatus(subStatusName);
  };

  useEffect(() => {
    if (searchParams.get(`substatus`))
      setSubStatus(searchParams.get(`substatus`));
    setStatus(searchParams.get(`status`));
  }, [searchParams]);

  return (
    <Stack gap={1} justifyContent="center">
      <Stack direction="row" gap={1} flexWrap>
        <Button
          variant={!status ? 'contained' : 'outlined'}
          onClick={() => {
            setSearchParams((params) => {
              params.delete(`status`);
              params.delete(`page`);
              params.delete(`substatus`);
              return params;
            });
          }}
        >
          All
        </Button>
        <Button
          variant={status === 'ongoing' ? 'contained' : 'outlined'}
          onClick={() => handleChange('ongoing', 'ongoing', '')}
        >
          Ongoing
        </Button>
        <Button
          variant={status === 'received' ? 'contained' : 'outlined'}
          onClick={() => handleChange('received', 'received', '')}
        >
          Success
        </Button>
        <Button
          variant={status === 'failed' ? 'contained' : 'outlined'}
          onClick={() => handleChange('failed', 'failed', '')}
        >
          Failed
        </Button>
      </Stack>
      <Stack
        direction="row"
        gap={1}
        display={status === 'ongoing' ? 'flex' : 'none'}
      >
        <Button
          variant={subStatus === 'verifying' ? 'contained' : 'outlined'}
          onClick={() => handleChange(status, status, 'verifying')}
        >
          Payment Verification
        </Button>
        <Button
          variant={subStatus === 'processed' ? 'contained' : 'outlined'}
          onClick={() => handleChange(status, status, 'processed')}
        >
          Processed
        </Button>
        <Button
          variant={subStatus === 'shipped' ? 'contained' : 'outlined'}
          onClick={() => handleChange(status, status, 'shipped')}
        >
          On Delivery
        </Button>
      </Stack>
      <Stack
        direction="row"
        gap={1}
        display={status === 'failed' ? 'flex' : 'none'}
      >
        <Button
          variant={subStatus === 'cancelled' ? 'contained' : 'outlined'}
          onClick={() => handleChange(status, status, 'cancelled')}
        >
          cancelled
        </Button>
        <Button
          variant={subStatus === 'rejected' ? 'contained' : 'outlined'}
          onClick={() => handleChange(status, status, 'rejected')}
        >
          rejected
        </Button>
      </Stack>
    </Stack>
  );
}
