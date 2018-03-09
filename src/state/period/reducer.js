import {
  REQUEST_PERIOD,
  REQUEST_PERIOD_SUCCESS,
  REQUEST_PERIOD_SUCCESS_EMPTY,
  REQUEST_PERIOD_FAILED,
  // List
  REQUEST_PERIODS,
  REQUEST_PERIODS_SUCCESS,
  REQUEST_PERIODS_SUCCESS_EMPTY,
  REQUEST_PERIODS_FAILED,
  // List eventualities
  REQUEST_PERIODS_EVENTUALITIES,
  REQUEST_PERIODS_EVENTUALITIES_SUCCESS,
  REQUEST_PERIODS_EVENTUALITIES_SUCCESS_EMPTY,
  REQUEST_PERIODS_EVENTUALITIES_FAILED,
  // List liquidation
  REQUEST_PERIODS_LIQUIDATION,
  REQUEST_PERIODS_LIQUIDATION_SUCCESS,
  REQUEST_PERIODS_LIQUIDATION_SUCCESS_EMPTY,
  REQUEST_PERIODS_LIQUIDATION_FAILED,
  // By ID
  REQUEST_PERIOD_EDIT,
  REQUEST_PERIOD_EDIT_FAILED,
  REQUEST_PERIOD_EDIT_SUCCESS,
  REQUEST_PERIOD_EDIT_SUCCESS_EMPTY,
  // Save or Update
  SAVE_PERIOD,
  SAVE_PERIOD_SUCCESS,
  SAVE_PERIOD_FAILED,
  // empty
  EMPTY_PERIOD_EDIT,
} from './const';

const initialState = {
  period: {},
  periodEdit: {},
  periods: [],
  periodsEventualities: [],
  periodsLiquidations: [],
  loading: false,
};

export default function periodApp(state = initialState, action) {
  switch (action.type) {
    case SAVE_PERIOD:
    case REQUEST_PERIOD_EDIT:
    case REQUEST_PERIODS_EVENTUALITIES:
    case REQUEST_PERIODS_LIQUIDATION:
    case REQUEST_PERIODS:
    case REQUEST_PERIOD: {
      return {
        ...state,
        loading: true,
      };
    }
    case SAVE_PERIOD_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case SAVE_PERIOD_SUCCESS:
    case EMPTY_PERIOD_EDIT:
    case REQUEST_PERIOD_EDIT_FAILED:
    case REQUEST_PERIOD_EDIT_SUCCESS_EMPTY:
    case REQUEST_PERIODS_FAILED:
    case REQUEST_PERIODS_SUCCESS_EMPTY:
    case REQUEST_PERIOD_FAILED:
    case REQUEST_PERIODS_EVENTUALITIES_SUCCESS_EMPTY:
    case REQUEST_PERIODS_EVENTUALITIES_FAILED:
    case REQUEST_PERIODS_LIQUIDATION_SUCCESS_EMPTY:
    case REQUEST_PERIODS_LIQUIDATION_FAILED:
    case REQUEST_PERIOD_SUCCESS_EMPTY: {
      return {
        ...state,
        loading: false,
        periodEdit: {},
        periodsEventualities: [],
        periodsLiquidations: [],
      };
    }
    case REQUEST_PERIOD_SUCCESS: {
      return {
        ...state,
        period: action.period,
        loading: false,
      };
    }
    case REQUEST_PERIODS_SUCCESS: {
      return {
        ...state,
        periods: action.periods,
        loading: false,
      };
    }
    case REQUEST_PERIOD_EDIT_SUCCESS: {
      return {
        ...state,
        periodEdit: action.period,
        loading: false,
      };
    }
    case REQUEST_PERIODS_EVENTUALITIES_SUCCESS: {
      return {
        ...state,
        periodsEventualities: action.periods,
        loading: false,
      };
    }
    case REQUEST_PERIODS_LIQUIDATION_SUCCESS: {
      return {
        ...state,
        periodsLiquidations: action.periods,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}
