import { Button, Dialog, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';
import Slide from '@mui/material/Slide';
import { useFormik } from 'formik';
import { HeaderChooseAddress } from './ModalChooseAddress/HeaderChooseAddress';
import ProvinceSelect from './ModalEditOrAddAddress/ProvinceSelect';
import CitySelect from './ModalEditOrAddAddress/CitySelect';
import {
  addNewAddress,
  addressInitialValues,
  addressValidationSchema,
} from './ModalEditOrAddAddress/formikAddressSetUp';
import { AddressNameAndReciever } from './ModalEditOrAddAddress/AddressNameAndReceiverForm';
import { PostalCodeDistrictVillageDetailsForm } from './ModalEditOrAddAddress/PostalCodeDistrictVillageDetailsForm';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export function ModalEditAndAddAddress({ open, setOpen, addressToEdit }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const addressFormik = useFormik({
    initialValues:
      open === 'EDIT ADDRESS' ? addressToEdit : addressInitialValues,
    validationSchema: addressValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => addNewAddress(values),
  });

  const handleClose = () => {
    setOpen('CHOOSE_ADDRESS');
    addressFormik.resetForm();
  };
  return (
    <div>
      <Dialog
        open={open === 'ADD ADDRESS' || open === 'EDIT ADDRESS'}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullScreen={fullScreen}
        fullWidth
        aria-describedby="alert-dialog-slide-description"
        scroll="paper"
      >
        <div className="sticky-top">
          <HeaderChooseAddress handleClose={handleClose} Title={open} />
        </div>
        <div className="my-3 px-2 d-flex flex-column gap-2">
          <AddressNameAndReciever addressFormik={addressFormik} />
          <div>
            <div className="d-flex gap-2">
              <ProvinceSelect addressFormik={addressFormik} />
              <CitySelect addressFormik={addressFormik} />
            </div>
            <div>{addressFormik.errors.provinceId}</div>
          </div>
          <div>
            <PostalCodeDistrictVillageDetailsForm
              addressFormik={addressFormik}
            />
          </div>
        </div>
        <Button onClick={addressFormik.handleSubmit}>
          <h5>Save</h5>
        </Button>
      </Dialog>
    </div>
  );
}
