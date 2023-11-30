import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../../../../constants/api';
import { setAlertActionCreator } from '../../../../states/alert/action';

export default function WarehouseSelect({ formik }) {
  const [warehouses, setWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchWarehouses = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('/warehouses');
      const res = data.data;
      setWarehouses(res);
      setIsLoading(false);
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    }
  };
  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (
    <Autocomplete
      id="warehouse-select"
      sx={{ width: 300 }}
      options={isLoading ? [{ name: 'loading...' }] : warehouses}
      autoHighlight
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      value={formik.values.warehouse}
      onChange={(e, value) => {
        formik.setFieldValue('warehouseDestination', value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a Warehouse"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
