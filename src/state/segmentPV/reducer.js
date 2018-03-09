import * as types from './const';

const initialState = {
  ltsGroupSegment: [],
  loading: false,
  segmentData: [],
};

export default function segmentPVApp(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_SEGMENT_LIST_SUCCESS: {
      return {
        ...state,
        ltsGroupSegment: action.ltsGroupSegment,
        loading: false,
      };
    }
    case types.REQUEST_SEGMENT_LIST_FAILED:
    case types.REQUEST_SEGMENT_LIST_EMPTY:
    {
      return {
        ...state,
      };
    }
    case types.REQUEST_SEGMENT_LIST:
    case types.REQUEST_SEGMENT_SAVE_SUCCESS:
    case types.REQUEST_SEGMENT_GET_UPDATE:
    case types.REQUEST_SEGMENT_UPDATE:
    {
      return {
        ...state,
        loading: true,
      };
    }
    case types.REQUEST_SEGMENT_SAVE_PROGRESS:
    case types.REQUEST_SEGMENT_SAVE_FAILED:
    case types.REQUEST_SEGMENT_GET_UPDATE_FAILED:
    case types.REQUEST_SEGMENT_UPDATE_SUCCESS:
    case types.REQUEST_SEGMENT_UPDATE_FAILED:
    {
      return {
        ...state,
        loading: false,
      };
    }
    case types.REQUEST_SEGMENT_GET_UPDATE_SUCCESS: {
      return {
        ...state,
        segmentData: action.segmentData,
        loading: false,
      };
    }
    case types.REQUEST_SEGMENT_DATA_CLEAR: {
      return {
        ...state,
        segmentData: [],
      };
    }
    default: {
      return state;
    }
  }
}
