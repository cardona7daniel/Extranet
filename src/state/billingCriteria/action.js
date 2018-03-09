import {
  // Request List
  REQUEST_BILLING_CRITERIA,
  REQUEST_BILLING_CRITERIA_SUCCESS,
  REQUEST_BILLING_CRITERIA_SUCCESS_EMPTY,
  REQUEST_BILLING_CRITERIA_FAILED,
  // Request All List
  REQUEST_ALL_BILLING_CRITERIA,
  REQUEST_ALL_BILLING_CRITERIA_SUCCESS,
  REQUEST_ALL_BILLING_CRITERIA_SUCCESS_EMPTY,
  REQUEST_ALL_BILLING_CRITERIA_FAILED,
  // Save BillingCriteriaPeriod
  SAVE_BILLING_CRITERIA_PERIOD,
  SAVE_BILLING_CRITERIA_PERIOD_FAILED,
  SAVE_BILLING_CRITERIA_PERIOD_SUCCESS,
  // Request Family vechicle
  REQUEST_FAMILY_VEHICLE,
  REQUEST_FAMILY_VEHICLE_SUCCESS,
  REQUEST_FAMILY_VEHICLE_SUCCESS_EMPTY,
  REQUEST_FAMILY_VEHICLE_FAILED,
  // Save or Update
  SAVE_BILLING_CRITERIA,
  SAVE_BILLING_CRITERIA_SUCCESS,
  SAVE_BILLING_CRITERIA_FAILED,
  // Empty into Create and Update
  EMPTY_BILLING_CRITERIA,
} from './const';
import setMessage from '../generic/action';
import {
  getBillingCriteria,
  saveBillingCriteria,
  getAllBillingCriteria,
  getAllFamilyVehicles,
  saveOrUpdate,
} from '../../api/newVehicle/billingCriteria';

// region Request List actions
function billingCriteriaSuccess(billingCriteria, selectedBillingCriteria) {
  return {
    type: REQUEST_BILLING_CRITERIA_SUCCESS,
    billingCriteria,
    selectedBillingCriteria,
  };
}

function billingCriteriaProgress() {
  return {
    type: REQUEST_BILLING_CRITERIA,
  };
}

function billingCriteriaSuccessEmpty() {
  return {
    type: REQUEST_BILLING_CRITERIA_SUCCESS_EMPTY,
  };
}

function billingCriteriaFailed() {
  return {
    type: REQUEST_BILLING_CRITERIA_FAILED,
  };
}

export function requestBillingCriteria(periodId) {
  return (dispatch) => {
    dispatch(billingCriteriaProgress());
    getBillingCriteria(periodId)
      .then((response) => {
        if (response.data.ModelData !== '' && response.data.ModelData.billingCriteria) {
          dispatch(billingCriteriaSuccess(
            response.data.ModelData.billingCriteria,
            response.data.ModelData.selected,
          ));
        } else if (response.data.Message.Flag === false) {
          dispatch(billingCriteriaSuccessEmpty());
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        dispatch(billingCriteriaFailed());
        dispatch(setMessage('error obteniendo el criterio de facturacion', 'error'));
      });
  };
}
// endregion

// region Request All List actions
function billingCriteriaAllSuccess(billingCriteria) {
  return {
    type: REQUEST_ALL_BILLING_CRITERIA_SUCCESS,
    billingCriteria,
  };
}

function billingCriteriaAllProgress() {
  return {
    type: REQUEST_ALL_BILLING_CRITERIA,
  };
}

function billingCriteriaAllSuccessEmpty() {
  return {
    type: REQUEST_ALL_BILLING_CRITERIA_SUCCESS_EMPTY,
  };
}

function billingCriteriaAllFailed() {
  return {
    type: REQUEST_ALL_BILLING_CRITERIA_FAILED,
  };
}

export function requestAllBillingCriteria() {
  return (dispatch) => {
    dispatch(billingCriteriaAllProgress());
    getAllBillingCriteria()
      .then((response) => {
        if (response.data.ModelData) {
          dispatch(billingCriteriaAllSuccess(
            response.data.ModelData,
          ));
        } else if (response.data.Message.Flag === false) {
          dispatch(billingCriteriaAllSuccessEmpty());
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        dispatch(billingCriteriaAllFailed());
        dispatch(setMessage('error obteniendo los criterios de facturacion', 'error'));
      });
  };
}
// endregion

// region Save Billing Criteria
function billingCriteriaPeriodSuccess() {
  return {
    type: SAVE_BILLING_CRITERIA_PERIOD_SUCCESS,
  };
}

function billingCriteriaPeriodProgress() {
  return {
    type: SAVE_BILLING_CRITERIA_PERIOD,
  };
}

function billingCriteriaPeriodFailed() {
  return {
    type: SAVE_BILLING_CRITERIA_PERIOD_FAILED,
  };
}

export function saveBillingCriteriaPeriod(idsBillingCriteria, periodId, next = null) {
  return (dispatch) => {
    dispatch(billingCriteriaPeriodProgress());
    saveBillingCriteria(idsBillingCriteria, periodId)
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(billingCriteriaPeriodSuccess());
          dispatch(setMessage('Criterios seleccionados guardados con éxito.', 'success'));
          if (typeof next === 'function') {
            next();
          }
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        dispatch(billingCriteriaPeriodFailed());
        dispatch(setMessage('error guardando criterio de facturación', 'error'));
      });
  };
}
// endregion

// region Request FamilyVehicle actions
function billingCriteriaFamilyVehicleSuccess(
  families,
  vehicles,
  billingCriteria = {},
) {
  return {
    type: REQUEST_FAMILY_VEHICLE_SUCCESS,
    families,
    vehicles,
    billingCriteria,
  };
}

function billingCriteriaFamilyVehicleProgress() {
  return {
    type: REQUEST_FAMILY_VEHICLE,
  };
}

function billingCriteriaFamilyVehicleSuccessEmpty() {
  return {
    type: REQUEST_FAMILY_VEHICLE_SUCCESS_EMPTY,
  };
}

export function billingCriteriaFamilyVehicleFailed() {
  return {
    type: REQUEST_FAMILY_VEHICLE_FAILED,
  };
}

export function requestFamilyVehicle(id) {
  return (dispatch) => {
    dispatch(billingCriteriaFamilyVehicleProgress());
    getAllFamilyVehicles(id)
      .then((response) => {
        if (response.data.ModelData) {
          const {
            families,
            vehicles,
            billingCriteria = {},
          } = response.data.ModelData;

          dispatch(billingCriteriaFamilyVehicleSuccess(
            families,
            vehicles,
            billingCriteria,
          ));
        } else if (response.data.Message.Flag === false) {
          dispatch(billingCriteriaFamilyVehicleSuccessEmpty());
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        dispatch(billingCriteriaFamilyVehicleFailed());
        dispatch(setMessage('error obteniendo las familias para el criterio de facturación', 'error'));
      });
  };
}
// endregion

// region Save or Update

function billingCriteriaSaveOrUpdateProgress() {
  return {
    type: SAVE_BILLING_CRITERIA,
  };
}

function billingCriteriaSaveOrUpdateSuccess() {
  return {
    type: SAVE_BILLING_CRITERIA_SUCCESS,
  };
}

function billingCriteriaSaveOrUpdateFailed() {
  return {
    type: SAVE_BILLING_CRITERIA_FAILED,
  };
}

export function saveOrUpdateBillingCriteria(params, next) {
  return (dispatch) => {
    dispatch(billingCriteriaSaveOrUpdateProgress());
    saveOrUpdate(params)
      .then((response) => {
        if (response.data.ModelData) {
          dispatch(billingCriteriaSaveOrUpdateSuccess());
          dispatch(setMessage('El criterio de facturación se guardó correctamente.', 'success'));
          next();
        } else if (response.data.Message.Flag === false) {
          dispatch(billingCriteriaSaveOrUpdateFailed());
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        dispatch(billingCriteriaSaveOrUpdateFailed());
        dispatch(setMessage('Error guardando el criterio de facturación.', 'error'));
      });
  };
}

// endregion

// region Empty data create update

export function emptyBillingCriteria() {
  return {
    type: EMPTY_BILLING_CRITERIA,
  };
}

// endregion
