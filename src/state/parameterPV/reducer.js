import * as types from './const';

const initialState = {
  ltParams: [],
  loading: false,
  ltColumns: [],
  ltColors: [],
};

export default function parameterPVApp(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_PARAMETER_LIST: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.REQUEST_PARAMETER_LIST_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.REQUEST_PARAMETER_LIST_SUCCESS: {
      return {
        ...state,
        ltParams: action.ltParams,
        loading: false,
      };
    }
    case types.REQUEST_PARAMETER_LIST_EMPTY: {
      return {
        ...state,
      };
    }
    case types.REQUEST_PARAMETER_LIST_COL: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.REQUEST_PARAMETER_LIST_FAILED_COL: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.REQUEST_PARAMETER_LIST_SUCCESS_COL: {
      return {
        ...state,
        ltColumns: action.ltColumns,
        loading: false,
      };
    }
    case types.REQUEST_PARAMETER_LIST_COLOR_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.REQUEST_PARAMETER_LIST_COLOR_SUCCESS: {
      return {
        ...state,
        ltColors: action.ltColors,
        loading: false,
      };
    }
    case types.REQUEST_PARAMETER_LIST_EMPTY_COL: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
}
