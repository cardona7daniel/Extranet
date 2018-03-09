import {
  REQUEST_PRE_SETTLEMENT_PROGRESS,
  REQUEST_PRE_SETTLEMENT_SUCCESS,
  REQUEST_PRE_SETTLEMENT_FAILED,
} from './const';

const initialState = {
  generateSettlement: false,
  loading: false,
};

export default function preliminarySettlementApp(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PRE_SETTLEMENT_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case REQUEST_PRE_SETTLEMENT_SUCCESS: {
      return {
        ...state,
        generateSettlement: true,
        loading: false,
      };
    }
    case REQUEST_PRE_SETTLEMENT_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}
