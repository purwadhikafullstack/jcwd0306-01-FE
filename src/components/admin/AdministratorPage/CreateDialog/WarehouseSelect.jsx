import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../../../constants/api';

export default function WarehouseSelect({ formik }) {
  const [warehouses, setWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchWarehouse, setSearchWarehouse] = useState('');

  // const fetchWarehouses = async (warehouseName = '') => {
  //   setIsLoading(true);
  //   const { data } = await api.get(`/warehouse?name=${warehouseName}`);
  //   setWarehouses(data);
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   fetchWarehouses(searchWarehouse);
  // }, [searchWarehouse]);

  const fetchWarehouses = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('/warehouses');
      const res = data.data;
      setWarehouses(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
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
      value={formik.values.warehouse} // Assuming formik.values.warehouse represents the selected warehouse
      onChange={(e, value) => {
        formik.setFieldValue('warehouseDestination', value); // Update formik with the selected warehouse
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a Warehouse"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          onChange={(e) => setSearchWarehouse(e.target.value)}
          onClick={() => setSearchWarehouse('')}
        />
      )}
    />
  );
}
