import {
  REQUEST_NPS_LIST,
  REQUEST_NPS_LIST_SUCCESS,
  REQUEST_NPS_LIST_EMPTY,
  REQUEST_NPS_LIST_FAILED,
  REQUEST_NPS_SAVE,
  REQUEST_NPS_SAVE_SUCCESS,
  REQUEST_NPS_SAVE_FAILED,
} from './const';

const initialState = {
  ltNps: [],
  loading: false,
};

export default function npsPVApp(state = initialState, action) {
  switch (action.type) {
    case REQUEST_NPS_LIST: {
      return {
        ...state,
        loading: true,
      };
    }
    case REQUEST_NPS_LIST_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case REQUEST_NPS_LIST_SUCCESS: {
      return {
        ...state,
        ltNps: action.ltNps,
        loading: false,
      };
    }
    case REQUEST_NPS_LIST_EMPTY: {
      return {
        ...state,
      };
    }
    case REQUEST_NPS_SAVE: {
      return {
        ...state,
        loading: true,
      };
    }
    case REQUEST_NPS_SAVE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case REQUEST_NPS_SAVE_FAILED: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
}
