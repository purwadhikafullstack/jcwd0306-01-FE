import { ActionType } from './action';

function warehousesReducer(warehouses = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_WAREHOUSES:
      return action.payload.warehouses;

    case ActionType.CREATE_WAREHOUSE:
      return [...warehouses, action.payload.warehouse];

    case ActionType.EDIT_WAREHOUSE:
      return warehouses.map((warehouse) => {
        if (warehouse.id === action.payload.warehouse.id)
          return { ...warehouse, ...action.payload.warehouse };
        return warehouse;
      });

    case ActionType.ACTIVATE_WAREHOUSE:
      return warehouses.map((warehouse) => {
        if (warehouse.id === action.payload.warehouse.id)
          return { ...warehouse, ...action.payload.warehouse };
        return warehouse;
      });

    case ActionType.DEACTIVATE_WAREHOUSE:
      return warehouses.map((warehouse) => {
        if (warehouse.id === action.payload.warehouse.id)
          return { ...warehouse, ...action.payload.warehouse };
        return warehouse;
      });

    default:
      return warehouses;
  }
}

export default warehousesReducer;
