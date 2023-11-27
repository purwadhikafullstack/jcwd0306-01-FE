import { ActionType } from './action';

function categoryPaginationReducer(categoryPagination = {}, action = {}) {
  switch (action.type) {
    case ActionType.SET_CATEGORY_PAGINATION:
      return action.payload.info;

    default:
      return categoryPagination;
  }
}

export default categoryPaginationReducer;
