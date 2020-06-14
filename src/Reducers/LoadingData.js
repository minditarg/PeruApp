import {
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR
} from "../Actions/actionsTypes";
const LoadingData = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_PENDING:
      return { ...state, pending: true };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        pending: false,
        products: action.payload
      };
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default LoadingData;
