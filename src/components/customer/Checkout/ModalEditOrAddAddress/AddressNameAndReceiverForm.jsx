import { TextField } from '@mui/material';

export function AddressNameAndReciever({ addressFormik }) {
  return (
    <>
      <div>
        <TextField
          autoFocus
          margin="dense"
          id="address-label"
          name="addressName"
          label="Address Label (e.g. Central Tower or Rumah Kakak)"
          type="text"
          fullWidth
          variant="standard"
          value={addressFormik.values.addressName}
          onChange={addressFormik.handleChange}
        />
        <div className="text-danger" style={{ fontSize: '0.8em' }}>
          {addressFormik.errors.addressName}
        </div>
      </div>
      <div>
        <TextField
          autoFocus
          margin="dense"
          id="receiver-name"
          name="receiverName"
          label="Receiver Name"
          type="text"
          fullWidth
          variant="standard"
          value={addressFormik.values.receiverName}
          onChange={addressFormik.handleChange}
        />
        <div className="text-danger" style={{ fontSize: '0.8em' }}>
          {addressFormik.errors.receiverName}
        </div>
      </div>
      <div>
        <TextField
          autoFocus
          margin="dense"
          id="receiver-phone"
          name="receiverPhone"
          label="phone number (081...)"
          type="text"
          fullWidth
          variant="standard"
          value={addressFormik.values.receiverPhone}
          onChange={addressFormik.handleChange}
        />
        <div className="text-danger" style={{ fontSize: '0.8em' }}>
          {addressFormik.errors.receiverPhone}
        </div>
      </div>
    </>
  );
}
