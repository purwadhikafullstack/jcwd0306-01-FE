import { Button, Dialog, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';
import Slide from '@mui/material/Slide';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { HeaderChooseAddress } from './ModalChooseAddress/HeaderChooseAddress';
import ProvinceSelect from './ModalEditOrAddAddress/ProvinceSelect';
import CitySelect from './ModalEditOrAddAddress/CitySelect';
import {
  addressInitialValues,
  addressSubmit,
  addressValidationSchema,
} from './ModalEditOrAddAddress/formikAddressSetUp';
import { AddressNameAndReciever } from './ModalEditOrAddAddress/AddressNameAndReceiverForm';
import { PostalCodeDistrictVillageDetailsForm } from './ModalEditOrAddAddress/PostalCodeDistrictVillageDetailsForm';
import { setAlertActionCreator } from '../../../states/alert/action';

const handleError = (error, dispatch) => {
  dispatch(
    setAlertActionCreator({
      val: { status: 'error', message: error?.response?.data?.message },
    })
  );
};

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export function ModalEditAndAddAddress({
  open,
  setOpen,
  addressToEdit,
  addresses,
  setAddress,
  setAddresses,
  setAddressToEdit,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const [disableButton, setDisableButton] = useState(false);

  const addressFormik = useFormik({
    initialValues:
      open === 'EDIT ADDRESS' ? addressToEdit : addressInitialValues,
    validationSchema: addressValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const { userId } = { userId: 5 };
      try {
        await addressSubmit(
          values,
          userId,
          addresses,
          setAddresses,
          setAddress,
          addressToEdit
        );
        setOpen('CHOOSE_ADDRESS');
        addressFormik.resetForm();
      } catch (error) {
        handleError(error, dispatch);
      }
    },
  });

  function handleClose() {
    setOpen('CHOOSE_ADDRESS');
    addressFormik.resetForm();
  }
  return (
    <div>
      <Dialog
        open={open === 'ADD ADDRESS' || open === 'EDIT ADDRESS'}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClose()}
        fullScreen={fullScreen}
        fullWidth
        aria-describedby="alert-dialog-slide-description"
        scroll="paper"
      >
        <div className="sticky-top">
          <HeaderChooseAddress handleClose={() => handleClose()} Title={open} />
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
        <Button
          disabled={disableButton}
          onClick={() => {
            setDisableButton(true);
            addressFormik.handleSubmit();
            setTimeout(() => {
              setDisableButton(false);
            }, 1500);
          }}
        >
          <h5>Save</h5>
        </Button>
      </Dialog>
    </div>
  );
}
