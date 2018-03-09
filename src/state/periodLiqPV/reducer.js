import {
  REQUEST_PERIODLIQ_LIST,
  REQUEST_PERIODLIQ_LIST_SUCCESS,
  REQUEST_PERIODLIQ_LIST_EMPTY,
  REQUEST_PERIODLIQ_LIST_FAILED,
  REQUEST_PERIODLIQ_DELETE_SUCCESS,
  REQUEST_PERIODLIQ_DELETE_FAILED,
  REQUEST_PERIODLIQ_SAVE_PROGRESS,
  REQUEST_PERIODLIQ_SAVE_SUCCESS,
  REQUEST_PERIODLIQ_SAVE_FAILED,
  REQUEST_PERIODLIQ_GET_UPDATE,
  REQUEST_PERIODLIQ_GET_UPDATE_SUCCESS,
  REQUEST_PERIODLIQ_GET_UPDATE_FAILED,
  REQUEST_PERIODLIQ_VERIFY_NPS_SUCCESS_TRUE,
  REQUEST_PERIODLIQ_VERIFY_NPS_SUCCESS_FALSE,
  REQUEST_PERIODLIQ_VERIFY_NPS_FAILED,
} from './const';

const initialState = {
  ltPeriod: [],
  periodData: [],
  loading: false,
  bNps: true,
};

export default function periodLiqPVApp(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PERIODLIQ_LIST: {
      return {
        ...state,
        loading: true,
      };
    }
    case REQUEST_PERIODLIQ_LIST_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case REQUEST_PERIODLIQ_LIST_SUCCESS: {
      return {
        ...state,
        ltPeriod: action.ltPeriod,
        loading: false,
      };
    }
    case REQUEST_PERIODLIQ_VERIFY_NPS_SUCCESS_FALSE: {
      return {
        ...state,
        bNps: false,
      };
    }
    case REQUEST_PERIODLIQ_VERIFY_NPS_SUCCESS_TRUE: {
      return {
        ...state,
        bNps: true,
      };
    }
    case REQUEST_PERIODLIQ_LIST_EMPTY:
    case REQUEST_PERIODLIQ_VERIFY_NPS_FAILED:
    {
      return {
        ...state,
      };
    }
    case REQUEST_PERIODLIQ_DELETE_SUCCESS: {
      return {
        ...state,
      };
    }
    case REQUEST_PERIODLIQ_DELETE_FAILED: {
      return {
        ...state,
      };
    }
    case REQUEST_PERIODLIQ_SAVE_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case REQUEST_PERIODLIQ_SAVE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case REQUEST_PERIODLIQ_SAVE_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case REQUEST_PERIODLIQ_GET_UPDATE: {
      return {
        ...state,
        loadingDataForm: true,
      };
    }
    case REQUEST_PERIODLIQ_GET_UPDATE_SUCCESS: {
      return {
        ...state,
        periodData: action.periodData,
        loadingDataForm: false,
      };
    }
    case REQUEST_PERIODLIQ_GET_UPDATE_FAILED: {
      return {
        ...state,
        loadingDataForm: false,
      };
    }
    default: {
      return state;
    }
  }
}
