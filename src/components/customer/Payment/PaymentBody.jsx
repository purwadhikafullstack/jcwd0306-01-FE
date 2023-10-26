import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { renderImage } from '../../../constants/renderImage';
import api from '../../../constants/api';

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

export function PaymentBody() {
  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState({});
  const handleSubmit = async () => {
    const form = new FormData();
    form.append('imageUrl', imageUrl);
    form.append(`image`, image);
    await api.post(`/order/payment_proof`, form);
  };
  const [imgSrc, setImgSrc] = useState('');
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
      <Grid container>
        <Grid item xs={12} display={imgSrc ? 'grid' : 'none'}>
          <img
            id="paymentProof"
            alt="paymentProof receipt"
            src=""
            style={{
              height: '300px',
              aspectRatio: `1/1`,
              objectFit: 'cover',
            }}
          />
        </Grid>
      </Grid>
      <div className="d-flex justify-content-even gap-3">
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
              await renderImage(e, 'paymentProof');
              setImgSrc('uploaded');
              setImage(e.target.file[0]);
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
