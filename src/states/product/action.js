import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setAlertActionCreator } from '../alert/action';
import api from '../../constants/api';

const ActionType = {
  GET_PRODUCT: 'GET_PRODUCT',
  UPDATE_WAREHOUSEPRODUCT_STOCK: 'UPDATE_WAREHOUSEPRODUCT_STOCK',
};

function getProductActionCreator(product) {
  return {
    type: ActionType.GET_PRODUCT,
    payload: { product },
  };
}

function updateWarehouseProductStockActionCreator(product) {
  return {
    type: ActionType.UPDATE_WAREHOUSEPRODUCT_STOCK,
    payload: { product },
  };
}

function asyncGetProduct(productId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { data } = await api.get(`/products/${productId}`);
      dispatch(getProductActionCreator(data.data));
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpdateWarehouseProductStock({
  productId,
  warehouseId,
  quantity,
}) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { data } = await api.patch(
        `/products/${productId}/warehouseproducts`,
        { warehouseId, quantity }
      );
      dispatch(updateWarehouseProductStockActionCreator(data.data));
      dispatch(setAlertActionCreator());
      return true;
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  getProductActionCreator,
  updateWarehouseProductStockActionCreator,
  asyncGetProduct,
  asyncUpdateWarehouseProductStock,
};
