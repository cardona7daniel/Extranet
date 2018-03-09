import {
  // Request
  REQUEST_PARAMETERS,
  REQUEST_PARAMETERS_SUCCESS,
  REQUEST_PARAMETERS_SUCCESS_EMPTY,
  REQUEST_PARAMETERS_FAILED,
  // Update
  UPDATE_PARAMETERS,
  UPDATE_PARAMETERS_SUCCESS,
  UPDATE_PARAMETERS_FAILED,
} from './const';

const initialState = {
  parameters: [],
  parameterEdit: {},
  loading: false,
};

export default function parameterApp(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PARAMETERS:
    case REQUEST_PARAMETERS: {
      return {
        ...state,
        loading: true,
      };
    }
    case UPDATE_PARAMETERS_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case UPDATE_PARAMETERS_SUCCESS:
    case REQUEST_PARAMETERS_FAILED:
    case REQUEST_PARAMETERS_SUCCESS_EMPTY: {
      return {
        ...state,
        loading: false,
        parameterEdit: {},
      };
    }
    case REQUEST_PARAMETERS_SUCCESS: {
      return {
        ...state,
        parameters: action.parameters,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}
