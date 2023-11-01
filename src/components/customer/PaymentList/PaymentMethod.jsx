import { Stack } from '@mui/material';

export function PaymentMethod({ order = {} }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      className="text-center"
    >
      <Stack>
        <div>Transfer Bank</div>
        <div>
          <b>CIMB Niaga</b>
        </div>
      </Stack>
      <Stack className="px-2">
        <div>Account Number</div>
        <div>
          <b>64459875642</b>
        </div>
      </Stack>
      <Stack className="d-md-flex d-none">
        <div>Account Name</div>
        <div>
          <b>PT GadgetGallery</b>
        </div>
      </Stack>
      <Stack className="d-sm-flex d-none">
        <div>Total Payment</div>
        <div>
          <b>Rp{Number(order?.total).toLocaleString(`id-ID`)}</b>
        </div>
      </Stack>
    </Stack>
  );
}
