import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../../constants/api';

export function WarehouseSelect({ warehouseIds = [], setWarehouseIds }) {
  const [show, setShow] = useState(false);
  const [warehouses, setWarehouses] = useState([]);

  const userSelector = useSelector((state) => state.authUser);

  const fetchWarehouseCityName = async () => {
    const { data } = await api.get(`/warehouses/admin/${userSelector?.id}`, {
      params: { warehouseId: warehouseIds },
    });
    setWarehouses(data);
  };

  useEffect(() => {
    if (warehouseIds.length && userSelector?.id) fetchWarehouseCityName();
  }, [warehouseIds, userSelector]);
  return (
    <Stack className="position-relative" style={{ flexGrow: 2 }}>
      <Button onClick={() => setShow(!show)} className="d-flex">
        Warehouse
      </Button>
      <FormGroup
        className="position-absolute bg-white rounded border border-secondary-subtle p-2"
        sx={{
          top: 40,
          left: '50%',
          transform: 'translate(-50%,0)',
          zIndex: 3,
          display: show ? 'flex' : 'none',
        }}
      >
        {warehouses.map((whse) => (
          <FormControlLabel
            key={whse?.id}
            control={
              <Checkbox
                defaultChecked
                value={whse?.id}
                name="warehouseIdCheckBox"
                onChange={() =>
                  document.getElementsByName('warehouseIdCheckBox')
                }
              />
            }
            label={`${whse?.id} ${whse?.WarehouseAddress?.City?.name}`}
          />
        ))}
        <Button
          onClick={() => setShow(false)}
          variant="outlined"
          className="text-dark"
        >
          Close
        </Button>
      </FormGroup>
    </Stack>
  );
}
