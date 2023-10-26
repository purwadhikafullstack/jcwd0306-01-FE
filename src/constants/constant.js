import { setAlertActionCreator } from '../states/alert/action';

export const constant = {
  createCart: 'CREATE_CART',
  updateProductOnCart: 'UPDATE_CART',
  deleteProductFromCart: 'DELETE_FROM_CART',
  resetCart: 'RESET_CART',
  success: 'SUCCESS',
  addAddress: 'ADD_ADDRESS',
  updateAddress: 'UPADATE_ADDRESS',
  deleteAddress: 'DELETE_ADDRESS',
  selectAddress: 'SELECT_ADDRESS',
  logout: 'LOGOUT',
  login: 'LOGIN',
  setError: (error) =>
    setAlertActionCreator({
      val: {
        status: 'error',
        message: error?.response?.data?.message || error?.message,
      },
    }),
  setSuccess: (message = '') =>
    setAlertActionCreator({ val: { status: 'success', message } }),
};
