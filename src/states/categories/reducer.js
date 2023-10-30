import { ActionType } from './action';

function categoriesReducer(categories = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_CATEGORIES:
      return action.payload.categories;

    case ActionType.CREATE_CATEGORY:
      return [...categories, action.payload.category];

    case ActionType.EDIT_CATEGORY:
      return categories.map((category) =>
        category.id === action.payload.category.id
          ? { ...category, ...action.payload.category }
          : category
      );

    case ActionType.DELETE_CATEGORY:
      return categories.filter(
        (category) => category.id !== action.payload.categoryId
      );

    default:
      return categories;
  }
}

export default categoriesReducer;
