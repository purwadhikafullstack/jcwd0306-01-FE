import * as Yup from 'yup';
import api from '../../../../constants/api';

export const addressInitialValues = {
  receiverName: '',
  receiverPhone: '',
  addressName: '',
  country: 'Indonesia',
  postalCode: '',
  provinceId: 0,
  Province: { name: '' },
  cityId: 0,
  City: { name: '' },
  district: '',
  village: '',
  detail: '',
  longitude: null,
  latitude: null,
  isDefault: false,
};

export const addressValidationSchema = Yup.object().shape({
  receiverName: Yup.string().min(3).required(),
  receiverPhone: Yup.string()
    .min(5)
    .matches(/^\d+$/, { message: 'Only numbers allowed' })
    .required(),
  postalCode: Yup.number().min(10000).required(),
  provinceId: Yup.number().required(),
  Province: Yup.object().shape({ name: Yup.string().required() }),
  City: Yup.object().shape({ name: Yup.string().required() }),
  cityId: Yup.number().required(),
  district: Yup.string().min(3).required(),
  village: Yup.string().min(3).required(),
  detail: Yup.string().min(3).required(),
});

export async function addNewAddress(
  values,
  userId,
  addresses,
  setAddresses,
  setAddress,
  config = {}
) {
  try {
    values.userId = userId;
    const { data } = await api.post(
      `/user_address/new/${userId}`,
      values,
      config
    );
    const temp = [...addresses];
    temp.unshift({ ...values, ...data });
    setAddresses(temp);
    setAddress({ ...values, ...data });
  } catch (error) {
    console.log(error);
  }
}

const checkChanges = (initialValues, updateValues) => {
  if (JSON.stringify(initialValues) !== JSON.stringify(updateValues))
    return true;
  return false;
};

export async function updateAddress(
  values,
  userId,
  addresses,
  setAddresses,
  addressToEdit,
  setAddress,
  address,
  config = {}
) {
  try {
    if (checkChanges(addressToEdit, values)) {
      const { data } = await api.patch(
        `/user_address/${userId}/${values.id}`,
        values,
        config
      );
      const indexToUpdate = addresses.findIndex(
        (adrs) => adrs.id === values.id
      );
      if (indexToUpdate !== -1) {
        const updatedAddresses = [...addresses];
        updatedAddresses[indexToUpdate] = data;
        setAddresses(updatedAddresses);
      }
      if (address.id === values.id) setAddress(data);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function addressSubmit(
  values,
  userId,
  addresses,
  setAddresses,
  setAddress,
  addressToEdit,
  address
) {
  if (values.id) {
    await updateAddress(
      values,
      userId,
      addresses,
      setAddresses,
      addressToEdit,
      setAddress,
      address
    );
  } else {
    await addNewAddress(values, userId, addresses, setAddresses, setAddress);
  }
}
