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
  setWarehouseUser: 'SET_WAREHOUSE_USER',
  logout: 'UNSET_AUTH_USER',
  login: 'LOGIN',
  updateUnpaid: 'UPDATE_UNPAID_ORDER',
  addUnpaid: 'ADD_UNPAID_ORDER',
  updateOrderStatus: 'UPDATE_ORDER_STATUS',
  setChatRoom: 'SET_CHAT_ROOM',
  resetChatRoom: 'RESET_CHAT_ROOM',
  unpaidColor: 'darkorange',
  cancelledColor: 'red',
  verifyingColor: 'dodgerblue',
  processedColor: 'blue',
  shippedColor: 'blue',
  receivedColor: 'green',
  rejectedColor: 'red',
  status: {
    ongoing: ['verifying', 'processed', 'shipped'],
    failed: ['cancelled', 'rejected'],
  },
  setError: (error) =>
    setAlertActionCreator({
      val: {
        status: 'error',
        message:
          error?.response?.data?.message ||
          error?.message?.code ||
          error?.message,
      },
    }),
  setSuccess: (message = '') =>
    setAlertActionCreator({ val: { status: 'success', message } }),
};
