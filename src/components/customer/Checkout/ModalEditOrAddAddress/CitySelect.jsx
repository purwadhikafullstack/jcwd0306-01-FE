import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import api from '../../../../constants/api';

function citySetter(e, value, addressFormik) {
  if (value === null) {
    addressFormik.setFieldValue('cityId', 0);
    addressFormik.setFieldValue('City', { name: '' });
    return;
  }
  addressFormik.setFieldValue('cityId', value?.id);
  addressFormik.setFieldValue('City', { name: value?.name });
}

export default function CitySelect({ addressFormik }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchCity, setSearchCity] = useState('');
  const fetchCities = async (provinceId = 0, cityName = '') => {
    const { data } = await api.get(`/city`, {
      params: { name: cityName, provinceId },
    });
    setCities(data.rows);
    setIsLoading(false);
  };
  const [val, setVal] = useState({ id: 0, name: '' });

  useEffect(() => {
    setIsLoading(true);
    const fetch = setTimeout(() => {
      fetchCities(addressFormik.values.provinceId, searchCity);
    }, 500);

    return () => clearTimeout(fetch);
  }, [searchCity, addressFormik.values.provinceId]);

  useEffect(() => {
    const { cityId } = addressFormik.values;
    setVal({ id: cityId, name: addressFormik.values.City?.name });
  }, [addressFormik.values.cityId]);
  return (
    <Autocomplete
      id="city-select"
      sx={{ width: 300 }}
      options={isLoading ? [{ name: 'loading...' }] : cities}
      value={val.id !== 0 ? val : null}
      autoHighlight
      disabled={!addressFormik.values.provinceId}
      getOptionLabel={(option) => option.name}
      onChange={(e, value) => citySetter(e, value, addressFormik)}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      renderInput={(params) => (
        <TextField
          {...params}
          label={
            addressFormik.values.provinceId
              ? 'Choose a city'
              : 'Choose province first'
          }
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          onChange={(e) => setSearchCity(e.target.value)}
          onClick={() => setSearchCity('')}
          disabled={!addressFormik.values.provinceId}
        />
      )}
    />
  );
}
