import * as types from './const';

const initialState = {
  generateNDLiquidation: false,
  loading: false,
  generateLiq: false,
  urlDownload: [],
};

export default function NDLiquidationApp(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_NON_DEROGATE_LIQUIDATION_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.REQUEST_NON_DEROGATE_LIQUIDATION_SUCCESS: {
      return {
        ...state,
        generateNDLiquidation: true,
        loading: false,
      };
    }
    case types.REQUEST_NON_DEROGATE_LIQUIDATION_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.EXPORT_NON_DEROGATE_LIQUIDATION_PROGRESS: {
      return {
        ...state,
        loading: true,
        generateLiq: false,
        urlDownload: [],
      };
    }
    case types.EXPORT_NON_DEROGATE_LIQUIDATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        generateLiq: true,
        urlDownload: action.urlDownload,
      };
    }
    default: {
      return state;
    }
  }
}
