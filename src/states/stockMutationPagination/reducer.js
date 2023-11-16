import { ActionType } from './action';

function stockMutationPaginationReducer(
  stockMutationPagination = {},
  action = {}
) {
  switch (action.type) {
    case ActionType.SET_STOCKMUTATION_PAGINATION:
      return action.payload.info;

    default:
      return stockMutationPagination;
  }
}

export default stockMutationPaginationReducer;
