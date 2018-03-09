import {
  REQUEST_OBJECTIVE,
  REQUEST_OBJECTIVE_SUCCESS,
  REQUEST_OBJECTIVE_FAILED,
  REQUEST_OBJECTIVE_EMPTY,
} from './const';

const initialState = {
  existsObjectives: null,
  loading: false,
};

export default function periodApp(state = initialState, action) {
  switch (action.type) {
    case REQUEST_OBJECTIVE: {
      return {
        ...state,
        loading: true,
      };
    }
    case REQUEST_OBJECTIVE_FAILED: {
      return {
        ...state,
        loading: false,
        existsObjectives: false,
      };
    }
    case REQUEST_OBJECTIVE_SUCCESS: {
      return {
        ...state,
        existsObjectives: action.existsObjectives,
        loading: false,
      };
    }
    case REQUEST_OBJECTIVE_EMPTY: {
      return {
        ...state,
        existsObjectives: false,
      };
    }
    default: {
      return state;
    }
  }
}
