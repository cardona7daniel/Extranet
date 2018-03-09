import {
  REQUEST_CONSOLIDATED_LIST,
  REQUEST_CONSOLIDATED_LIST_SUCCESS,
  REQUEST_CONSOLIDATED_LIST_EMPTY,
  REQUEST_CONSOLIDATED_LIST_FAILED,
  REQUEST_CONSOLIDATED_SAVE,
  REQUEST_CONSOLIDATED_SAVE_SUCCESS,
  REQUEST_CONSOLIDATED_SAVE_FAILED,
} from './const';

const initialState = {
  ltConsolidated: [],
  loading: false,
};

export default function consolidatedPVApp(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CONSOLIDATED_LIST: {
      return {
        ...state,
        loading: true,
      };
    }
    case REQUEST_CONSOLIDATED_LIST_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case REQUEST_CONSOLIDATED_LIST_SUCCESS: {
      return {
        ...state,
        ltConsolidated: action.ltConsolidated,
        loading: false,
      };
    }
    case REQUEST_CONSOLIDATED_LIST_EMPTY: {
      return {
        ...state,
      };
    }
    case REQUEST_CONSOLIDATED_SAVE: {
      return {
        ...state,
        loading: true,
      };
    }
    case REQUEST_CONSOLIDATED_SAVE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case REQUEST_CONSOLIDATED_SAVE_FAILED: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
}
