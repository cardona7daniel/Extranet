import {
  // Request
  REQUEST_BILLING_CRITERIA,
  REQUEST_BILLING_CRITERIA_SUCCESS,
  REQUEST_BILLING_CRITERIA_SUCCESS_EMPTY,
  REQUEST_BILLING_CRITERIA_FAILED,
  // Request All
  REQUEST_ALL_BILLING_CRITERIA,
  REQUEST_ALL_BILLING_CRITERIA_SUCCESS,
  REQUEST_ALL_BILLING_CRITERIA_SUCCESS_EMPTY,
  REQUEST_ALL_BILLING_CRITERIA_FAILED,
  // Save
  SAVE_BILLING_CRITERIA_PERIOD,
  SAVE_BILLING_CRITERIA_PERIOD_SUCCESS,
  SAVE_BILLING_CRITERIA_PERIOD_FAILED,
  // Request Family vechicle
  REQUEST_FAMILY_VEHICLE,
  REQUEST_FAMILY_VEHICLE_SUCCESS,
  REQUEST_FAMILY_VEHICLE_SUCCESS_EMPTY,
  REQUEST_FAMILY_VEHICLE_FAILED,
  // Save or Update
  SAVE_BILLING_CRITERIA,
  SAVE_BILLING_CRITERIA_SUCCESS,
  SAVE_BILLING_CRITERIA_FAILED,
  // empty info create update
  EMPTY_BILLING_CRITERIA,
} from './const';

const initialState = {
  selectedBillingCriteria: [],
  billingCriteria: [],
  billingCriteriaEdit: {},
  families: [],
  vehicles: [],
  loading: false,
};

export default function billingCriteriaApp(state = initialState, action) {
  switch (action.type) {
    case SAVE_BILLING_CRITERIA:
    case REQUEST_FAMILY_VEHICLE:
    case REQUEST_ALL_BILLING_CRITERIA:
    case SAVE_BILLING_CRITERIA_PERIOD:
    case REQUEST_BILLING_CRITERIA: {
      return {
        ...state,
        loading: true,
      };
    }
    case SAVE_BILLING_CRITERIA_SUCCESS:
    case SAVE_BILLING_CRITERIA_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case REQUEST_FAMILY_VEHICLE_SUCCESS_EMPTY:
    case REQUEST_FAMILY_VEHICLE_FAILED:
    case REQUEST_ALL_BILLING_CRITERIA_FAILED:
    case REQUEST_ALL_BILLING_CRITERIA_SUCCESS_EMPTY:
    case SAVE_BILLING_CRITERIA_PERIOD_SUCCESS:
    case SAVE_BILLING_CRITERIA_PERIOD_FAILED:
    case REQUEST_BILLING_CRITERIA_FAILED:
    case EMPTY_BILLING_CRITERIA:
    case REQUEST_BILLING_CRITERIA_SUCCESS_EMPTY: {
      return {
        ...state,
        loading: false,
        billingCriteriaEdit: {},
        families: [],
        vehicles: [],
      };
    }
    case REQUEST_BILLING_CRITERIA_SUCCESS: {
      return {
        ...state,
        billingCriteria: action.billingCriteria,
        selectedBillingCriteria: action.selectedBillingCriteria,
        loading: false,
      };
    }
    case REQUEST_ALL_BILLING_CRITERIA_SUCCESS: {
      return {
        ...state,
        billingCriteria: action.billingCriteria,
        loading: false,
      };
    }
    case REQUEST_FAMILY_VEHICLE_SUCCESS: {
      return {
        ...state,
        families: action.families,
        vehicles: action.vehicles,
        billingCriteriaEdit: action.billingCriteria,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}
