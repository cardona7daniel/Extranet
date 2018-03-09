import {
  // Request
  REQUEST_GROUPS,
  REQUEST_GROUPS_SUCCESS,
  REQUEST_GROUPS_SUCCESS_EMPTY,
  REQUEST_GROUPS_FAILED,
  // Request dealership
  REQUEST_DEALERSHIP,
  REQUEST_DEALERSHIP_SUCCESS,
  REQUEST_DEALERSHIP_SUCCESS_EMPTY,
  REQUEST_DEALERSHIP_FAILED,
  // Save
  SAVE_GROUPS,
  SAVE_GROUPS_SUCCESS,
  SAVE_GROUPS_FAILED,
  // empty info
  EMPTY_GROUPS,
} from './const';

const initialState = {
  groups: [],
  groupsEdit: {},
  dealerShips: [],
  rooms: [],
  loading: false,
};

export default function groupsApp(state = initialState, action) {
  switch (action.type) {
    case SAVE_GROUPS:
    case REQUEST_DEALERSHIP:
    case REQUEST_GROUPS: {
      return {
        ...state,
        loading: true,
      };
    }
    case SAVE_GROUPS_SUCCESS:
    case SAVE_GROUPS_FAILED:
    case REQUEST_DEALERSHIP_FAILED:
    case REQUEST_DEALERSHIP_SUCCESS_EMPTY:
    case REQUEST_GROUPS_FAILED:
    case REQUEST_GROUPS_SUCCESS_EMPTY: {
      return {
        ...state,
        loading: false,
        groupsEdit: {},
      };
    }
    case REQUEST_GROUPS_SUCCESS: {
      return {
        ...state,
        groups: action.groups,
        loading: false,
      };
    }
    case REQUEST_DEALERSHIP_SUCCESS: {
      return {
        ...state,
        dealerShips: action.dealerShips,
        rooms: action.rooms,
        groupsEdit: action.group,
        loading: false,
      };
    }
    case EMPTY_GROUPS: {
      return {
        ...state,
        dealerShips: [],
        groupsEdit: {},
      };
    }
    default: {
      return state;
    }
  }
}
