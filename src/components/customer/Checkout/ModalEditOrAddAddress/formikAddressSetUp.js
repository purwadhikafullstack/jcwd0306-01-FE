import * as Yup from 'yup';

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
    .min(8)
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

export function addNewAddress(values) {
  console.log(values);
}
