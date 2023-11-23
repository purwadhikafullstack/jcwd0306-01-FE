import { Stack, Typography } from '@mui/material';

export function StatusMutation() {
  return (
    <Stack gap={1}>
      <Stack direction="row" justifyContent="space-between">
        <Typography>Mutation ID</Typography>
        <Typography>
          {/* {order?.createdAt ? new Date(order?.createdAt).toDateString() : null} */}
          27
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography>Status</Typography>
        <Typography
          sx={{
            // color: constant[`${order?.status}Color`],
            textTransform: 'capitalize',
          }}
        >
          {/* <b>{order?.status}</b> */}mutation.status
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Typography>Mutation date</Typography>
        <Typography>
          {/* {order?.createdAt ? new Date(order?.createdAt).toDateString() : null} */}
          12 november 2023
        </Typography>
      </Stack>
    </Stack>
  );
}
