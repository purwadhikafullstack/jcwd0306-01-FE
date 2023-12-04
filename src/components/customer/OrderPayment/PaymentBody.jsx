import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { renderImage } from '../../../constants/renderImage';
import { ImageDetail } from '../../ImageDetail';
import { ImagePayment } from './ImagePayment';
import { ConfirmationModal } from '../../ConfirmationModal';
import { handleSubmit } from './handleSubmit';
import { handleCancel } from './handleCancle';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export function PaymentBody({ orderData, setOrderData }) {
  const userSelector = useSelector((state) => state.authUser);
  const orderStatus = useSelector((state) => state.orderStatus);
  const unpaid = useSelector((state) => state.order);
  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState({});
  const [imgSrc, setImgSrc] = useState('');
  const [open, setOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [action, setAction] = useState({ fn: () => {}, name: '' });
  const [disableButton, setDisableButton] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [hiddenCancel, setHiddenCancel] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    if (orderData?.paymentProof)
      setImgSrc(
        `${import.meta.env.VITE_API_BASE_URL}/order/payment_proof/${
          orderData?.id
        }`
      );
  }, [orderData?.paymentProof]);

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        mt: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ImageDetail open={open} setOpen={setOpen} imgSrc={imgSrc} />
      <ImagePayment setOpen={setOpen} imgSrc={imgSrc} />
      {orderData?.status === 'unpaid' || orderData?.status === 'verifying' ? (
        <>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload payment proof
            <VisuallyHiddenInput
              type="file"
              accept="image"
              id="inputPaymentProof"
              onChange={async (e) => {
                if (e.target.files[0].type.split('/')[0] !== 'image') return;
                await renderImage(e, 'paymentProof', setImgSrc);
                setImage(e.target.files[0]);
                setImageUrl(e.target.value);
                setDisableSubmit(false);
              }}
            />
          </Button>
          <div className="d-flex justify-content-even gap-3 mt-3">
            <Button
              variant="contained"
              color="error"
              className={
                orderData?.status !== `unpaid` || hiddenCancel
                  ? 'd-none'
                  : 'd-inline'
              }
              onClick={() =>
                handleCancel(
                  setShowConfirmModal,
                  setAction,
                  nav,
                  dispatch,
                  setDisableButton,
                  userSelector,
                  orderData,
                  null,
                  null,
                  unpaid
                )
              }
              disabled={disableButton}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() =>
                handleSubmit(
                  setDisableButton,
                  setDisableSubmit,
                  setShowConfirmModal,
                  setHiddenCancel,
                  setOrderData,
                  nav,
                  setAction,
                  dispatch,
                  image,
                  imageUrl,
                  orderData,
                  unpaid,
                  orderStatus
                )
              }
              disabled={disableButton || disableSubmit}
            >
              Submit
            </Button>
          </div>
        </>
      ) : null}
      <ConfirmationModal
        action={action.fn}
        actionName={action.name}
        actionDescription={action.desc}
        setShow={setShowConfirmModal}
        show={showConfirmModal}
      />
    </Box>
  );
}
