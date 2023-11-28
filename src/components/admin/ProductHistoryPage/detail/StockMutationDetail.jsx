import {
  Dialog,
  DialogContent,
  Fade,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import * as React from 'react';
import { HeaderModal } from '../../../HeaderModal';
import { StatusMutation } from './StatusMutation';
import { Products } from './Products';
import { WarehouseSender } from './WarehouseSender';
import { WarehouseReceiver } from './WarehouseReceiver';

const Transition = React.forwardRef((props, ref) => (
  <Fade ref={ref} {...props} />
));

export function StockMutationDetail({ open, setSmOpen, data }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Dialog
      open={open}
      onClose={() => setSmOpen(false)}
      keepMounted
      TransitionComponent={Transition}
      maxWidth="sm"
      fullScreen={fullScreen}
      scroll="paper"
    >
      <HeaderModal
        Title="Stock Mutation Detail"
        handleClose={() => setSmOpen(false)}
      />
      <DialogContent>
        <Stack gap={2}>
          <StatusMutation data={data} />
          <Products data={data} />
          <WarehouseSender data={data} />
          <WarehouseReceiver data={data} />
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
