import {
  // Request All List
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
import setMessage from '../generic/action';
import {
  getAllExclusion,
  getAllFamilyVehiclesColumnsExclusion,
  saveOrUpdate,
} from '../../api/newVehicle/exclusion';

// region Request All List actions
function exclusionAllSuccess(exclusion) {
  return {
    type: REQUEST_ALL_EXCLUSION_SUCCESS,
    exclusion,
  };
}

function exclusionAllProgress() {
  return {
    type: REQUEST_ALL_EXCLUSION,
  };
}

function exclusionAllSuccessEmpty() {
  return {
    type: REQUEST_ALL_EXCLUSION_SUCCESS_EMPTY,
  };
}

export function exclusionAllFailed() {
  return {
    type: REQUEST_ALL_EXCLUSION_FAILED,
  };
}

export function requestAllExclusion() {
  return (dispatch) => {
    dispatch(exclusionAllProgress());
    getAllExclusion()
      .then((response) => {
        if (response.data.ModelData) {
          dispatch(exclusionAllSuccess(
            response.data.ModelData,
          ));
        } else if (response.data.Message.Flag === false) {
          dispatch(exclusionAllSuccessEmpty());
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        dispatch(exclusionAllFailed());
        dispatch(setMessage('error obteniendo las exclusiones', 'error'));
      });
  };
}
// endregion

// region Request FamilyVehicleColumns Exclusion actions
function exclusionFamilyVehicleColumnsSuccess(
  families,
  vehicles,
  columns,
  exclusion = {},
) {
  return {
    type: REQUEST_FAMILY_VEHICLE_COLUMNS_EXCLUSION_SUCCESS,
    families,
    vehicles,
    columns,
    exclusion,
  };
}

function exclusionFamilyVehicleColumnsProgress() {
  return {
    type: REQUEST_FAMILY_VEHICLE_COLUMNS_EXCLUSION,
  };
}

function exclusionFamilyVehicleColumnsSuccessEmpty() {
  return {
    type: REQUEST_FAMILY_VEHICLE_COLUMNS_EXCLUSION_SUCCESS_EMPTY,
  };
}

export function exclusionFamilyVehicleColumnsFailed() {
  return {
    type: REQUEST_FAMILY_VEHICLE_COLUMNS_EXCLUSION_FAILED,
  };
}

export function requestFamilyVehicleColumnsExclusion(id) {
  return (dispatch) => {
    dispatch(exclusionFamilyVehicleColumnsProgress());
    getAllFamilyVehiclesColumnsExclusion('SD', id)
      .then((response) => {
        if (response.data.ModelData) {
          const {
            families,
            vehicles,
            columns,
            exclusion = {},
          } = response.data.ModelData;

          dispatch(exclusionFamilyVehicleColumnsSuccess(
            families,
            vehicles,
            columns,
            exclusion,
          ));
        } else if (response.data.Message.Flag === false) {
          dispatch(exclusionFamilyVehicleColumnsSuccessEmpty());
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        dispatch(exclusionFamilyVehicleColumnsFailed());
        dispatch(setMessage('error obteniendo las familias exclusiones', 'error'));
      });
  };
}
// endregion

// region Save or Update

function exclusionSaveOrUpdateProgress() {
  return {
    type: SAVE_EXCLUSION,
  };
}

function exclusionSaveOrUpdateSuccess() {
  return {
    type: SAVE_EXCLUSION_SUCCESS,
  };
}

function exclusionSaveOrUpdateFailed() {
  return {
    type: SAVE_EXCLUSION_FAILED,
  };
}

export function saveOrUpdateExclusion(params, next) {
  return (dispatch) => {
    dispatch(exclusionSaveOrUpdateProgress());
    saveOrUpdate(params)
      .then((response) => {
        if (response.data.ModelData) {
          dispatch(exclusionSaveOrUpdateSuccess());
          dispatch(setMessage('La exclusión se guardó correctamente.', 'success'));
          next();
        } else if (response.data.Message.Flag === false) {
          dispatch(exclusionSaveOrUpdateFailed());
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        dispatch(exclusionSaveOrUpdateFailed());
        dispatch(setMessage('Error guardando la exclusión.', 'error'));
      });
  };
}

// endregion
