import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Skeleton,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { HeaderModal } from '../../../HeaderModal';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export function ModalLoading({ open }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      fullScreen={fullScreen}
      aria-describedby="alert-dialog-slide-description"
      scroll="paper"
    >
      <HeaderModal />
      <DialogTitle>
        <Skeleton animation="wave" />
      </DialogTitle>
      <DialogContent>
        <Stack gap={3}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
