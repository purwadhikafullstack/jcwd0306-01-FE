import { Button, Card, CardContent, Stack, Typography } from '@mui/material';

export function PaymentProof({ imgSrc, setShow, setOpen }) {
  return (
    <Stack gap={1} borderTop="4px solid gainsboro" pt={2} pb={1}>
      <Typography>
        <b>Payment Proof</b>
      </Typography>
      <Card>
        <CardContent className="d-flex justify-content-center">
          <Button
            onClick={() => {
              setOpen(false);
              setShow(true);
            }}
          >
            <img
              src={imgSrc}
              alt="payment proof"
              width="100%"
              style={{ objectFit: 'cover' }}
            />
          </Button>
        </CardContent>
      </Card>
    </Stack>
  );
}
