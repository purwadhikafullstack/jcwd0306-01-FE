import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { renderImage } from '../../../constants/renderImage';
import api from '../../../constants/api';
import { constant } from '../../../constants/constant';
import { ImageDetail } from '../../ImageDetail';
import { ImagePayment } from './ImagePayment';

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

export function PaymentBody({ orderData }) {
  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState({});
  const [imgSrc, setImgSrc] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    const form = new FormData();
    form.append('imageUrl', imageUrl);
    form.append(`image`, image);
    await api
      .post(`/order/payment_proof/${orderData?.id}`, form)
      .then(() => dispatch(constant.setSuccess('Success uploading image')));
  };
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
      <div className="d-flex justify-content-even gap-3 mt-3">
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            accept="image"
            id="inputPaymentProof"
            onChange={async (e) => {
              await renderImage(e, 'paymentProof', setImgSrc);
              setImage(e.target.files[0]);
              setImageUrl(e.target.value);
            }}
          />
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Box>
  );
}
