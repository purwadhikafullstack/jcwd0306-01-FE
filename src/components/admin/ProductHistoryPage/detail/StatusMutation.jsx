import { Stack, Typography } from '@mui/material';
import moment from 'moment';
import formatDate from '../../../../utils/salesReport/formatDate';

export function StatusMutation({ data }) {
  return (
    <Stack gap={1}>
      <Stack direction="row" justifyContent="space-between">
        <Typography>Mutation ID</Typography>
        <Typography>{data?.id}</Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Typography>Status</Typography>
        <Typography
          sx={{
            // color: constant[`${order?.status}Color`],
            textTransform: 'capitalize',
          }}
        >
          {data?.status}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Typography>Mutation Type</Typography>
        <Typography>{data?.type}</Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Typography>Mutation date</Typography>
        <Typography>{formatDate(moment, data?.createdAt)}</Typography>
      </Stack>
    </Stack>
  );
}
