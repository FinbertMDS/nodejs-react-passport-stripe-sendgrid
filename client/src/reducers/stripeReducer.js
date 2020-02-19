import { FETCH_CHARGE, FETCH_CUSTOMER } from '../actions/types';

const initialState = {
  charges: []
}

export default function stripeReducer(state = null, action) {
  switch (action.type) {
    case FETCH_CHARGE:
      return {
        ...state,
        charges: action.payload,
      };
    case FETCH_CUSTOMER:
      return {
        ...state,
        customers: action.payload,
      };
    default:
      return initialState;
  }
}