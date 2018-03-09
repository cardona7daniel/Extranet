import
{
  REQUEST_NAMES_PERIOD,
  REQUEST_NAMES_PERIOD_SUCCESS,
  REQUEST_NAMES_PERIOD_FAILED,
  REQUEST_NAMES_PERIOD_EMPTY,
  REQUEST_OBJECTIVE_PERIOD,
  REQUEST_OBJECTIVE_PERIOD_SUCCESS,
  REQUEST_OBJECTIVE_PERIOD_FAILED,
  REQUEST_OBJECTIVE_PERIOD_EMPTY,
  REQUEST_WARRANTY_PERIOD,
  REQUEST_WARRANTY_PERIOD_SUCCESS,
  REQUEST_WARRANTY_PERIOD_FAILED,
  REQUEST_WARRANTY_PERIOD_EMPTY,
  REQUEST_SAVE_OBJECTIVE_WARRANTY_PERIOD,
  REQUEST_SAVE_OBJECTIVE_WARRANTY_PERIOD_SUCCESS,
  REQUEST_SAVE_OBJECTIVE_WARRANTY_PERIOD_FAILED,
  REQUEST_SET_STATE_PERIOD,
  REQUEST_SET_STATE_PERIOD_SUCCESS,
  REQUEST_SET_STATE_PERIOD_FAILED,
  REQUEST_GETSTATE_SUCCESS,
  REQUEST_GETSTATE_FAILED,
  REQUEST_STATE_PERIOD_SUCCESS,
  REQUEST_STATE_PERIOD_FAILED,
  REQUEST_GET_OBJECTIVE_PERIOD,
  REQUEST_GET_OBJECTIVE_PERIOD_SUCCESS,
  REQUEST_GET_OBJECTIVE_PERIOD_FAILED,
  REQUEST_EXPORT_LIQUIDATION,
  REQUEST_EXPORT_LIQUIDATION_SUCCESS,
  REQUEST_EXPORT_LIQUIDATION_FAILED,
  REQUEST_PERIOD_DATA_CLEAR,
  REQUEST_VERIFY_DATA_SUCCESS,
  REQUEST_VERIFY_DATA_FAILED,
  REQUEST_VERIFY_DATA_PROGRESS,

}
  from './const';

const initialState = {
  ltNamesPeriod: [],
  ltObjectivePeriod: [],
  ltWarrantyPeriod: [],
  ltStates: [],
  objectiveWarrantyPeriod: {},
  ltStatePeriod: [],
  loading: false,
  bVerifyDataLiquidation: null,
  loadingVerify: false,
};

export default function nonDerogateLiquidationApp(state = initialState, action) {
  switch (action.type) {
    case REQUEST_NAMES_PERIOD:
    case REQUEST_GET_OBJECTIVE_PERIOD:
    case REQUEST_OBJECTIVE_PERIOD:
    case REQUEST_SAVE_OBJECTIVE_WARRANTY_PERIOD:
    case REQUEST_SET_STATE_PERIOD:
    case REQUEST_EXPORT_LIQUIDATION:
    {
      return {
        ...state,
        loading: true,
      };
    }
    case REQUEST_SAVE_OBJECTIVE_WARRANTY_PERIOD_FAILED:
    case REQUEST_SET_STATE_PERIOD_SUCCESS:
    case REQUEST_SAVE_OBJECTIVE_WARRANTY_PERIOD_SUCCESS:
    case REQUEST_WARRANTY_PERIOD_FAILED:
    case REQUEST_WARRANTY_PERIOD:
    case REQUEST_OBJECTIVE_PERIOD_FAILED:
    case REQUEST_GET_OBJECTIVE_PERIOD_FAILED:
    case REQUEST_NAMES_PERIOD_FAILED:
    case REQUEST_SET_STATE_PERIOD_FAILED:
    case REQUEST_EXPORT_LIQUIDATION_SUCCESS:
    case REQUEST_EXPORT_LIQUIDATION_FAILED:
    {
      return {
        ...state,
        loading: false,
      };
    }
    case REQUEST_VERIFY_DATA_PROGRESS:
    {
      return {
        ...state,
        loadingVerify: true,
      };
    }
    case REQUEST_VERIFY_DATA_FAILED:
    {
      return {
        ...state,
        loadingVerify: false,
      };
    }
    case REQUEST_NAMES_PERIOD_EMPTY:
    case REQUEST_WARRANTY_PERIOD_EMPTY:
    case REQUEST_GETSTATE_FAILED:
    case REQUEST_STATE_PERIOD_FAILED:
    case REQUEST_OBJECTIVE_PERIOD_EMPTY:
    {
      return {
        ...state,
      };
    }
    case REQUEST_NAMES_PERIOD_SUCCESS: {
      return {
        ...state,
        ltNamesPeriod: action.ltNamesPeriod,
        loading: false,
      };
    }
    case REQUEST_VERIFY_DATA_SUCCESS:
    {
      return {
        ...state,
        bVerifyDataLiquidation: action.bVerifyDataLiquidation,
        loadingVerify: false,
      };
    }
    case REQUEST_GET_OBJECTIVE_PERIOD_SUCCESS: {
      return {
        ...state,
        objectiveWarrantyPeriod: action.objectiveWarrantyPeriod,
        loading: false,
      };
    }
    case REQUEST_GETSTATE_SUCCESS: {
      return {
        ...state,
        ltStates: action.ltStates,
      };
    }
    case REQUEST_STATE_PERIOD_SUCCESS: {
      return {
        ...state,
        ltStatePeriod: action.ltStatePeriod,
      };
    }
    case REQUEST_OBJECTIVE_PERIOD_SUCCESS: {
      return {
        ...state,
        ltObjectivePeriod: action.ltObjectivePeriod,
        loading: false,
      };
    }
    case REQUEST_WARRANTY_PERIOD_SUCCESS: {
      return {
        ...state,
        ltWarrantyPeriod: action.ltWarrantyPeriod,
        loading: false,
      };
    }
    case REQUEST_PERIOD_DATA_CLEAR: {
      return {
        ...state,
        objectiveWarrantyPeriod: {},
      };
    }
    default: {
      return state;
    }
  }
}
