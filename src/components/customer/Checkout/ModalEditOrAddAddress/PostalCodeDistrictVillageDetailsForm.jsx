import { TextField } from '@mui/material';

export function PostalCodeDistrictVillageDetailsForm({ addressFormik }) {
  return (
    <>
      <div>
        <TextField
          autoFocus
          margin="dense"
          id="postal-code"
          name="postalCode"
          label="Postal Code"
          type="text"
          fullWidth
          variant="standard"
          value={addressFormik.values.postalCode}
          onChange={addressFormik.handleChange}
        />
        <div className="text-danger" style={{ fontSize: '0.8em' }}>
          {addressFormik.errors.postalCode}
        </div>
      </div>
      <div>
        <TextField
          autoFocus
          margin="dense"
          id="district"
          name="district"
          label="District"
          type="text"
          fullWidth
          variant="standard"
          value={addressFormik.values.district}
          onChange={addressFormik.handleChange}
        />
        <div className="text-danger" style={{ fontSize: '0.8em' }}>
          {addressFormik.errors.district}
        </div>
      </div>
      <div>
        <TextField
          autoFocus
          margin="dense"
          id="village"
          name="village"
          label="Village"
          type="text"
          fullWidth
          variant="standard"
          value={addressFormik.values.village}
          onChange={addressFormik.handleChange}
        />
        <div className="text-danger" style={{ fontSize: '0.8em' }}>
          {addressFormik.errors.village}
        </div>
      </div>
      <div>
        <TextField
          autoFocus
          margin="dense"
          name="detail"
          id="detail-address"
          label="Detail Address (e.g. RT/RW Number)"
          type="text"
          fullWidth
          variant="standard"
          value={addressFormik.values.detail}
          onChange={addressFormik.handleChange}
        />
        <div className="text-danger" style={{ fontSize: '0.8em' }}>
          {addressFormik.errors.detail}
        </div>
      </div>
    </>
  );
}
