import Grid from '@mui/material/Grid';

export function ImagePayment({ imgSrc, setOpen }) {
  return (
    <Grid container mb={2}>
      <Grid
        type="button"
        item
        xs={12}
        display={imgSrc ? 'grid' : 'none'}
        onClick={() => setOpen(true)}
        justifyContent="center"
      >
        <img
          id="paymentProof"
          alt="paymentProof receipt"
          src={imgSrc}
          style={{
            width: '100%',
            maxWidth: '800px',
            objectFit: 'cover',
          }}
        />
      </Grid>
    </Grid>
  );
}
