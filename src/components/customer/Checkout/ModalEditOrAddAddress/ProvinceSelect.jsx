import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import api from '../../../../constants/api';

function provinceSetter(e, value, addressFormik) {
  addressFormik.setFieldValue('cityId', 0);
  addressFormik.setFieldValue('City', { name: '' });
  if (value === null) {
    addressFormik.setFieldValue('provinceId', 0);
    addressFormik.setFieldValue('Province', { name: '' });
    return;
  }
  addressFormik.setFieldValue('provinceId', value?.id);
  addressFormik.setFieldValue('Province', { name: value?.name });
}

export default function ProvinceSelect({ addressFormik }) {
  const [provinces, setProvinces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchProvince, setSearchProvince] = useState('');
  const [val, setVal] = useState({ id: 0, name: '' });
  const fetchProvinces = async (provinceName = '') => {
    const { data } = await api.get(`/province?name=${provinceName}`);
    setProvinces(data.rows);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetch = setTimeout(() => {
      fetchProvinces(searchProvince);
    }, 500);

    return () => clearTimeout(fetch);
  }, [searchProvince]);
  useEffect(() => {
    const { provinceId } = addressFormik.values;
    setVal({
      id: provinceId,
      name: addressFormik.values.Province?.name,
    });
  }, [addressFormik.values.provinceId]);

  return (
    <Autocomplete
      id="province-select"
      sx={{ width: 300 }}
      options={isLoading ? [{ name: 'loading...' }] : provinces}
      autoHighlight
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      value={val.id !== 0 ? val : null}
      onChange={(e, value) => {
        provinceSetter(e, value, addressFormik);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a province"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          onChange={(e) => setSearchProvince(e.target.value)}
          onClick={() => setSearchProvince('')}
        />
      )}
    />
  );
}
