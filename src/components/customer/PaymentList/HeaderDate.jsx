import { Avatar, Grid, Stack } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { constant } from '../../../constants/constant';

export function HeaderDate({ order = {} }) {
  return (
    <>
      <Grid item xs={6}>
        <Stack direction="row" gap={1}>
          <Avatar
            className="d-none d-md-flex"
            sx={{
              width: '20px',
              height: '20px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ShoppingBagIcon sx={{ width: '16px', height: '16px' }} />
          </Avatar>
          <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1}>
            <b>Order-{order?.plain_id}</b>
            <small>
              {new Date(order?.createdAt).toDateString(`id-ID`)}{' '}
              {new Date(order?.createdAt).toTimeString(`id-ID`).slice(0, 8)}
            </small>
            <small>
              status:{' '}
              <span style={{ color: constant[`${order?.status}Color`] }}>
                {order?.status}
              </span>
            </small>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          gap={1}
          justifyContent="end"
          sx={{ textAlign: 'end' }}
        >
          <span>Pay before</span>
          <small className="text-primary">
            {new Date(
              new Date(order?.createdAt).setDate(
                new Date(order?.createdAt).getDate() + 1
              )
            ).toDateString()}
          </small>
        </Stack>
      </Grid>
    </>
  );
}
