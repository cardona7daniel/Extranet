import {
  REQUEST_PERIOD_SUCCESS,
  REQUEST_PERIOD_SUCCESS_EMPTY,
  REQUEST_PERIOD_FAILED,
} from './const';

const initialState = {
  periodData: [],
};

export default function periodPVApp(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PERIOD_SUCCESS: {
      return {
        ...state,
        periodData: action.periodData,
      };
    }
    case REQUEST_PERIOD_FAILED:
    case REQUEST_PERIOD_SUCCESS_EMPTY: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
}
