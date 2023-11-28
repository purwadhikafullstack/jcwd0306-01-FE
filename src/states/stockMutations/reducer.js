import { ActionType } from './action';

function stockMutationsReducer(stockMutations = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_STOCKMUTATIONS:
      return action.payload.stockMutations;

    case ActionType.UPDATE_STOCKMUTATION_STATUS:
      return stockMutations.map((stockMutation) => {
        if (stockMutation.id === action.payload.stockMutation.id)
          return { ...stockMutation, ...action.payload.stockMutation };
        return stockMutation;
      });

    case ActionType.DELETE_STOCKMUTATION:
      return stockMutations.filter(
        (stockMutation) => stockMutation.id !== action.payload.stockMutationId
      );

    default:
      return stockMutations;
  }
}

export default stockMutationsReducer;
