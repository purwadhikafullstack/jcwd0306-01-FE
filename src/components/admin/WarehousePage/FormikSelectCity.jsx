import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetCities } from '../../../states/cities/action';
import FormikSelect from '../../FormikSelect';

function FormikSelectCity() {
  const cities = useSelector((states) => states.cities);
  const dispatch = useDispatch();
  const { values } = useFormikContext();

  useEffect(() => {
    dispatch(asyncGetCities({ provinceId: values.provinceId }));
  }, [values.provinceId]);

  return (
    <FormikSelect
      name="cityId"
      label="Kota / Kabupaten"
      values={cities}
      itemValueName="id"
      itemValueLabel="name"
    />
  );
}

export default FormikSelectCity;
