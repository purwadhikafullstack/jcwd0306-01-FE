import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Col } from 'react-bootstrap';
import { useState } from 'react';

export default function ShippingSelect({
  shippingOptions,
  shippingMethod,
  setShippingMethod,
  disableButton,
}) {
  const [show, setShow] = useState(false);
  const handleChange = (e) => {
    setShippingMethod(e.target.value);
    setShow(false);
  };

  return (
    <Box sx={{ minWidth: 120, fontSize: '0.8em' }}>
      <FormControl fullWidth>
        <InputLabel id="select-shipping-method-label">
          Shipping method
        </InputLabel>
        <Select
          labelId="select-shipping-method-label"
          id="select-shipping-method"
          value={shippingMethod?.name ? shippingMethod : ''}
          label="Shipping method"
          onChange={handleChange}
          onClose={() => setShow(false)}
          disabled={disableButton}
          onMouseDownCapture={() => setShow(true)}
        >
          {shippingOptions.length ? (
            shippingOptions.map((method) => (
              <MenuItem
                value={method}
                key={method.name}
                sx={{ minWidth: '340px' }}
              >
                <Col xs={5} className="p-0 m-0">
                  {method.name}
                </Col>
                <Col
                  xs={4}
                  className="p-0 m-0"
                  style={{ display: show ? 'flex' : 'none' }}
                >
                  {method.etd}
                </Col>
                <Col
                  xs={3}
                  className="p-0 m-0"
                  style={{ display: show ? 'flex' : 'none' }}
                >
                  Rp{method.price.toLocaleString(`id-ID`)}
                </Col>
              </MenuItem>
            ))
          ) : (
            <MenuItem>Fetching</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
