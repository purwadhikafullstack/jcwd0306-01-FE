import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import thunk from 'redux-thunk';
import alertReducer from './alert/reducer';
import categoriesReducer from './categories/reducer';
import categoryPaginationReducer from './categoryPagination/reducer';
import cartReducer from './cart/reducer';
import productsReducer from './products/reducer';
import productPaginationReducer from './productPagination/reducer';
import carouselsReducer from './carousels/reducer';
import { addressReducer, selectedAddressReducer } from './userAddress/reducer';
import authUserReducer from './authUser/reducer';
import productReducer from './product/reducer';
import warehousesReducer from './warehouses/reducer';
import orderReducer from './order/reducer';
import provincesReducer from './provinces/reducer';
import citiesReducer from './cities/reducer';
import orderStatusReducer from './order/orderStatusReducer';
import { chatReducer } from './chat/reducer';
import { warehouseUserReducer } from './warehouses/warehouseUserReducer';
import warehouseReducer from './warehouse/reducer';
import administratorReducer from './Administrator/reducer';
import userAddressReducer from './Address/reducer';
import stockMutationsReducer from './stockMutations/reducer';
import stockMutationPaginationReducer from './stockMutationPagination/reducer';
import warehouseAdminPaginationReducer from './AdministratorPagination/reducer';
import allUsersReducer from './users/reducer';
import allUsersPaginationReducer from './allUsersPagination/reducer';
import addressPaginationReducer from './AddressPagination/reducer';
import salesReportReducer from './salesReport/reducer';
import reportPaginationReducer from './salesReportPagination/reducer';
import productHistoryReducer from './productHistory/reducer';
import productHistoryPaginationReducer from './productHistoryPagination/reducer';

const store = configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
    alert: alertReducer,
    carousels: carouselsReducer,
    categories: categoriesReducer,
    categoryPagination: categoryPaginationReducer,
    cart: cartReducer,
    product: productReducer,
    products: productsReducer,
    productPagination: productPaginationReducer,
    address: addressReducer,
    selectedAddress: selectedAddressReducer,
    authUser: authUserReducer,
    warehouse: warehouseReducer,
    warehouses: warehousesReducer,
    order: orderReducer,
    provinces: provincesReducer,
    cities: citiesReducer,
    orderStatus: orderStatusReducer,
    chatRoom: chatReducer,
    warehouseUser: warehouseUserReducer,
    administrator: administratorReducer,
    userAddress: userAddressReducer,
    stockMutations: stockMutationsReducer,
    stockMutationPagination: stockMutationPaginationReducer,
    warehouseAdminPagination: warehouseAdminPaginationReducer,
    allUser: allUsersReducer,
    allUserPagination: allUsersPaginationReducer,
    addressPagination: addressPaginationReducer,
    salesReport: salesReportReducer,
    salesReportPagination: reportPaginationReducer,
    productHistory: productHistoryReducer,
    productHistoryPagination: productHistoryPaginationReducer,
  },
  middleware: [thunk],
});

export default store;
