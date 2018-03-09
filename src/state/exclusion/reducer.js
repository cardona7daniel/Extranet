import {
  // Request All
  REQUEST_ALL_EXCLUSION,
  REQUEST_ALL_EXCLUSION_SUCCESS,
  REQUEST_ALL_EXCLUSION_SUCCESS_EMPTY,
  REQUEST_ALL_EXCLUSION_FAILED,
  // Request Family Exclusion
  REQUEST_FAMILY_VEHICLE_COLUMNS_EXCLUSION,
  REQUEST_FAMILY_VEHICLE_COLUMNS_EXCLUSION_SUCCESS,
  REQUEST_FAMILY_VEHICLE_COLUMNS_EXCLUSION_SUCCESS_EMPTY,
  REQUEST_FAMILY_VEHICLE_COLUMNS_EXCLUSION_FAILED,
  // Save or Update
  SAVE_EXCLUSION,
  SAVE_EXCLUSION_SUCCESS,
  SAVE_EXCLUSION_FAILED,
} from './const';

const initialState = {
  exclusion: [],
  exclusionEdit: {},
  families: [],
  vehicles: [],
  columns: [],
  loading: false,
};

export default function exclusionApp(state = initialState, action) {
  switch (action.type) {
    case SAVE_EXCLUSION:
    case REQUEST_FAMILY_VEHICLE_COLUMNS_EXCLUSION:
    case REQUEST_ALL_EXCLUSION: {
      return {
        ...state,
        loading: true,
      };
    }
    case SAVE_EXCLUSION_SUCCESS:
    case SAVE_EXCLUSION_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case REQUEST_FAMILY_VEHICLE_COLUMNS_EXCLUSION_SUCCESS_EMPTY:
    case REQUEST_FAMILY_VEHICLE_COLUMNS_EXCLUSION_FAILED:
    case REQUEST_ALL_EXCLUSION_FAILED:
    case REQUEST_ALL_EXCLUSION_SUCCESS_EMPTY: {
      return {
        ...state,
        loading: false,
        exclusionEdit: {},
        families: [],
        vehicles: [],
        columns: [],
      };
    }
    case REQUEST_ALL_EXCLUSION_SUCCESS: {
      return {
        ...state,
        exclusion: action.exclusion,
        exclusionEdit: {},
        loading: false,
      };
    }
    case REQUEST_FAMILY_VEHICLE_COLUMNS_EXCLUSION_SUCCESS: {
      return {
        ...state,
        families: action.families,
        vehicles: action.vehicles,
        columns: action.columns,
        exclusionEdit: action.exclusion,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}
