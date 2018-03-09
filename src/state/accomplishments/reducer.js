import * as types from './const';

const initialState = {
  accomplishments: [
    { Id: 1, InitialPercentage: 0 },
    { Id: 2, FinalPercentage: 99999 },
  ],
  loading: false,
  originalData: [],
};

export default function accomplishmentsReducer(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_ALL_ACCOMPLISHMENTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.REQUEST_ALL_ACCOMPLISHMENTS_SUCCESS: {
      return {
        ...state,
        accomplishments: action.accomplishments && action.accomplishments.length > 0
          ? action.accomplishments
          : state.accomplishments,
        originalData: action.accomplishments,
        loading: false,
      };
    }
    case types.REQUEST_ALL_ACCOMPLISHMENTS_SUCCESS_EMPTY: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.REQUEST_ALL_ACCOMPLISHMENTS_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.ONREMOVE_ITEM_ACCOMPLISHMENTS: {
      return {
        ...state,
        accomplishments: state.accomplishments.filter(data => data.Id !== action.item),
        loading: false,
      };
    }
    case types.ONADD_ITEM_ACCOMPLISHMENTS: {
      return {
        ...state,
        accomplishments: state.accomplishments.concat({
          Id: action.Id,
          InitialPercentage: null,
          FinalPercentage: null,
          BonusPercentage: null,
        }),
        loading: false,
      };
    }
    case types.SAVE_ALL_ACCOMPLISHMENTS_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
}
