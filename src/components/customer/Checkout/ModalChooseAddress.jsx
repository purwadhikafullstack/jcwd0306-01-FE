import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { useMediaQuery, useTheme } from '@mui/material';
import { HeaderModal } from '../../HeaderModal';
import { SearchBox } from './ModalChooseAddress/Searchbox';
import { BoxAddresses } from './ModalChooseAddress/BoxAddresses';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function ModalChooseAddress({
  open,
  setOpen,
  address,
  addresses,
  setAddress,
  setAddresses,
  setAddressToEdit,
  setShippingMethod,
  setName,
}) {
  const handleClose = () => setOpen('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Dialog
        open={open === `CHOOSE_ADDRESS`}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullScreen={fullScreen}
        aria-describedby="alert-dialog-slide-description"
      >
        <HeaderModal handleClose={handleClose} Title="Choose Address" />
        <div className="my-3">
          <SearchBox setName={setName} />
        </div>
        <Button
          variant="white"
          className="mx-3 border border-secondary-subtle rounded-pill mb-3"
          onClick={() => setOpen('ADD ADDRESS')}
        >
          Add New Address
        </Button>
        <DialogContent>
          <BoxAddresses
            address={address}
            addresses={addresses}
            setAddress={setAddress}
            setAddresses={setAddresses}
            handleClose={handleClose}
            setAddressToEdit={setAddressToEdit}
            setOpen={setOpen}
            setShippingMethod={setShippingMethod}
            open={open}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
