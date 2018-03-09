import {
  REQUEST_EXCLUSION_LIST,
  REQUEST_EXCLUSION_LIST_SUCCESS,
  REQUEST_EXCLUSION_LIST_EMPTY,
  REQUEST_EXCLUSION_LIST_FAILED,
  REQUEST_EXCLUSION_DELETE_SUCCESS,
  REQUEST_EXCLUSION_DELETE_FAILED,
  REQUEST_EXCLUSION_RANGE_SUCCESS,
  REQUEST_EXCLUSION_RANGE_FAILED,
  REQUEST_EXCLUSION_SEGMENT_LIST_SUCCESS,
  REQUEST_EXCLUSION_SEGMENT_LIST_EMPTY,
  REQUEST_EXCLUSION_SEGMENT_LIST_FAILED,
  REQUEST_EXCLUSION_LIQUIDATION_SUCCESS,
  REQUEST_EXCLUSION_LIQUIDATION_FAILED,
  REQUEST_EXCLUSION_FAMILY,
  REQUEST_EXCLUSION_FAMILY_SUCCESS,
  REQUEST_EXCLUSION_FAMILY_FAILED,
  REQUEST_EXCLUSION_REFERENCE,
  REQUEST_EXCLUSION_REFERENCE_SUCCESS,
  REQUEST_EXCLUSION_REFERENCE_FAILED,
  REQUEST_EXCLUSION_SAVE_PROGRESS,
  REQUEST_EXCLUSION_SAVE_SUCCESS,
  REQUEST_EXCLUSION_SAVE_FAILED,
  REQUEST_EXCLUSION_GET_UPDATE,
  REQUEST_EXCLUSION_GET_UPDATE_SUCCESS,
  REQUEST_EXCLUSION_GET_UPDATE_FAILED,
  REQUEST_EXCLUSION_UPDATE,
  REQUEST_EXCLUSION_UPDATE_SUCCESS,
  REQUEST_EXCLUSION_UPDATE_FAILED,
  REQUEST_EXCLUSION_DATA_CLEAR,
} from './const';

const initialState = {
  ltExcl: [],
  groupSegment: [],
  exSegment: [],
  exFamily: [],
  exReference: [],
  loading: false,
  groupLiquidation: [],
  exclusionData: [],
  loadingDataForm: false,
};

export default function exclusionPVApp(state = initialState, action) {
  switch (action.type) {
    case REQUEST_EXCLUSION_LIST: {
      return {
        ...state,
        loading: true,
      };
    }
    case REQUEST_EXCLUSION_LIST_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case REQUEST_EXCLUSION_LIST_SUCCESS: {
      return {
        ...state,
        ltExcl: action.ltExcl,
        loading: false,
      };
    }
    case REQUEST_EXCLUSION_LIST_EMPTY: {
      return {
        ...state,
      };
    }
    case REQUEST_EXCLUSION_DELETE_SUCCESS: {
      return {
        ...state,
      };
    }
    case REQUEST_EXCLUSION_DELETE_FAILED: {
      return {
        ...state,
      };
    }
    case REQUEST_EXCLUSION_RANGE_SUCCESS: {
      return {
        ...state,
        groupSegment: action.groupSegment,
      };
    }
    case REQUEST_EXCLUSION_RANGE_FAILED: {
      return {
        ...state,
      };
    }
    case REQUEST_EXCLUSION_SEGMENT_LIST_EMPTY: {
      return {
        ...state,
      };
    }
    case REQUEST_EXCLUSION_SEGMENT_LIST_SUCCESS: {
      return {
        ...state,
        exSegment: action.exSegment,
      };
    }
    case REQUEST_EXCLUSION_SEGMENT_LIST_FAILED: {
      return {
        ...state,
      };
    }
    case REQUEST_EXCLUSION_FAMILY_SUCCESS: {
      return {
        ...state,
        exFamily: action.exFamily,
        loadingDataForm: false,
      };
    }
    case REQUEST_EXCLUSION_FAMILY: {
      return {
        ...state,
        loadingDataForm: true,
      };
    }
    case REQUEST_EXCLUSION_FAMILY_FAILED: {
      return {
        ...state,
        loadingDataForm: false,
      };
    }
    case REQUEST_EXCLUSION_REFERENCE: {
      return {
        ...state,
        loading: true,
      };
    }
    case REQUEST_EXCLUSION_REFERENCE_SUCCESS: {
      return {
        ...state,
        exReference: action.exReference,
        loading: false,
      };
    }
    case REQUEST_EXCLUSION_REFERENCE_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case REQUEST_EXCLUSION_LIQUIDATION_SUCCESS: {
      return {
        ...state,
        groupLiquidation: action.groupLiquidation,
      };
    }
    case REQUEST_EXCLUSION_LIQUIDATION_FAILED: {
      return {
        ...state,
      };
    }
    case REQUEST_EXCLUSION_SAVE_PROGRESS: {
      return {
        ...state,
        loadingDataForm: true,
      };
    }
    case REQUEST_EXCLUSION_SAVE_SUCCESS: {
      return {
        ...state,
        loadingDataForm: false,
      };
    }
    case REQUEST_EXCLUSION_SAVE_FAILED: {
      return {
        ...state,
        loadingDataForm: false,
      };
    }
    case REQUEST_EXCLUSION_GET_UPDATE: {
      return {
        ...state,
        loadingDataForm: true,
      };
    }
    case REQUEST_EXCLUSION_GET_UPDATE_SUCCESS: {
      return {
        ...state,
        exclusionData: action.exclusionData,
        loadingDataForm: false,
      };
    }
    case REQUEST_EXCLUSION_GET_UPDATE_FAILED: {
      return {
        ...state,
        loadingDataForm: false,
      };
    }
    case REQUEST_EXCLUSION_UPDATE: {
      return {
        ...state,
        loadingDataForm: true,
      };
    }
    case REQUEST_EXCLUSION_UPDATE_SUCCESS: {
      return {
        ...state,
        loadingDataForm: false,
      };
    }
    case REQUEST_EXCLUSION_UPDATE_FAILED: {
      return {
        ...state,
        loadingDataForm: false,
      };
    }
    case REQUEST_EXCLUSION_DATA_CLEAR: {
      return {
        ...state,
        exclusionData: [],
      };
    }
    default: {
      return state;
    }
  }
}
