import * as types from './const';

const initialState = {
  accomplishments: [],
  loading: false,
  validationMessage: [],
  originalData: [],
};

export default function rangesPVApp(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_ALL_RANGES: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.REQUEST_ALL_RANGES_SUCCESS: {
      return {
        ...state,
        accomplishments: action.accomplishments,
        originalData: action.accomplishments,
        loading: false,
      };
    }
    case types.REQUEST_ALL_RANGES_SUCCESS_EMPTY: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.REQUEST_ALL_RANGES_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.ONREMOVE_ITEM_RANGES: {
      return {
        ...state,
        accomplishments: state.accomplishments.filter(data => data.Id !== action.item),
        loading: false,
      };
    }
    case types.ONADD_ITEM_RANGES: {
      return {
        ...state,
        accomplishments: state.accomplishments.concat({
          Id: action.Id,
          InitialRange: null,
          FinalRange: null,
          BonusRange: null,
          SegmentId: null,
          ColorId: null,
        }),
        loading: false,
      };
    }
    case types.SAVE_ALL_RANGES_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
}
