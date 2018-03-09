import
{
  REQUEST_NAMES_PERIOD,
  REQUEST_NAMES_PERIOD_SUCCESS,
  REQUEST_NAMES_PERIOD_FAILED,
  REQUEST_NAMES_PERIOD_EMPTY,
  REQUEST_OBJECTIVE_PERIOD,
  REQUEST_OBJECTIVE_PERIOD_SUCCESS,
  REQUEST_OBJECTIVE_PERIOD_FAILED,
  REQUEST_OBJECTIVE_PERIOD_EMPTY,
  REQUEST_WARRANTY_PERIOD,
  REQUEST_WARRANTY_PERIOD_SUCCESS,
  REQUEST_WARRANTY_PERIOD_FAILED,
  REQUEST_WARRANTY_PERIOD_EMPTY,
  REQUEST_SAVE_OBJECTIVE_WARRANTY_PERIOD,
  REQUEST_SAVE_OBJECTIVE_WARRANTY_PERIOD_SUCCESS,
  REQUEST_SAVE_OBJECTIVE_WARRANTY_PERIOD_FAILED,
  REQUEST_SET_STATE_PERIOD,
  REQUEST_SET_STATE_PERIOD_SUCCESS,
  REQUEST_SET_STATE_PERIOD_FAILED,
  REQUEST_GETSTATE_SUCCESS,
  REQUEST_GETSTATE_FAILED,
  REQUEST_STATE_PERIOD_SUCCESS,
  REQUEST_STATE_PERIOD_FAILED,
  REQUEST_GET_OBJECTIVE_PERIOD,
  REQUEST_GET_OBJECTIVE_PERIOD_SUCCESS,
  REQUEST_GET_OBJECTIVE_PERIOD_FAILED,
  REQUEST_EXPORT_LIQUIDATION,
  REQUEST_EXPORT_LIQUIDATION_SUCCESS,
  REQUEST_EXPORT_LIQUIDATION_FAILED,
  REQUEST_PERIOD_DATA_CLEAR,
  REQUEST_VERIFY_DATA_SUCCESS,
  REQUEST_VERIFY_DATA_FAILED,
  REQUEST_VERIFY_DATA_PROGRESS,

}
  from './const';
import setMessage from '../generic/action';
import {
  getNamesPeriodLiquidation,
  getObjectivePeriod,
  getWarrantyPeriod,
  saveObjectiveWarrantyPeriod,
  setStatePeriod,
  getStatePeriodLiquidation,
  getState,
  getObjectiveWarrantyPeriodLiquidation,
  exportExcelLiquidation,
  requestverifyDataLiquidation,
} from '../../api/postSale/nonDerogateLiquidation';

function namesPeriodListProgress() {
  return {
    type: REQUEST_NAMES_PERIOD,
  };
}

function namesPeriodListSuccess(ltNamesPeriod) {
  return {
    type: REQUEST_NAMES_PERIOD_SUCCESS,
    ltNamesPeriod,
  };
}

function namesPeriodListFailed() {
  return {
    type: REQUEST_NAMES_PERIOD_FAILED,
  };
}

function verifyDataLiquidationSuccess(bVerifyDataLiquidation) {
  return {
    type: REQUEST_VERIFY_DATA_SUCCESS,
    bVerifyDataLiquidation,
  };
}

function verifyDataLiquidationFailed() {
  return {
    type: REQUEST_VERIFY_DATA_FAILED,
  };
}

function verifyDataLiquidationProgress() {
  return {
    type: REQUEST_VERIFY_DATA_PROGRESS,
  };
}

function namesPeriodListSuccessEmpty() {
  return {
    type: REQUEST_NAMES_PERIOD_EMPTY,
  };
}

function getObjectivePeriodListProgress() {
  return {
    type: REQUEST_GET_OBJECTIVE_PERIOD,
  };
}

function getObjectivePeriodListSuccess(objectiveWarrantyPeriod) {
  return {
    type: REQUEST_GET_OBJECTIVE_PERIOD_SUCCESS,
    objectiveWarrantyPeriod,
  };
}

function getObjectivePeriodListFailed() {
  return {
    type: REQUEST_GET_OBJECTIVE_PERIOD_FAILED,
  };
}

function statesSuccess(ltStates) {
  return {
    type: REQUEST_GETSTATE_SUCCESS,
    ltStates,
  };
}

function statesFailed() {
  return {
    type: REQUEST_GETSTATE_FAILED,
  };
}

function statePeriodSuccess(ltStatePeriod) {
  return {
    type: REQUEST_STATE_PERIOD_SUCCESS,
    ltStatePeriod,
  };
}

function statePeriodFailed() {
  return {
    type: REQUEST_STATE_PERIOD_FAILED,
  };
}

function objectivePeriodListProgress() {
  return {
    type: REQUEST_OBJECTIVE_PERIOD,
  };
}

function objectivePeriodListSuccess(ltObjectivePeriod) {
  return {
    type: REQUEST_OBJECTIVE_PERIOD_SUCCESS,
    ltObjectivePeriod,
  };
}

function objectivePeriodListFailed() {
  return {
    type: REQUEST_OBJECTIVE_PERIOD_FAILED,
  };
}

function objectivePeriodListSuccessEmpty() {
  return {
    type: REQUEST_OBJECTIVE_PERIOD_EMPTY,
  };
}

function warrantyPeriodListProgress() {
  return {
    type: REQUEST_WARRANTY_PERIOD,
  };
}

function warrantyPeriodListSuccess(ltWarrantyPeriod) {
  return {
    type: REQUEST_WARRANTY_PERIOD_SUCCESS,
    ltWarrantyPeriod,
  };
}

function warrantyPeriodListFailed() {
  return {
    type: REQUEST_WARRANTY_PERIOD_FAILED,
  };
}

function warrantyPeriodListSuccessEmpty() {
  return {
    type: REQUEST_WARRANTY_PERIOD_EMPTY,
  };
}

function objectiveWarrantyPeriodSaveProgress() {
  return {
    type: REQUEST_SAVE_OBJECTIVE_WARRANTY_PERIOD,
  };
}

function objectiveWarrantyPeriodSaveSuccess() {
  return {
    type: REQUEST_SAVE_OBJECTIVE_WARRANTY_PERIOD_SUCCESS,
  };
}

function objectiveWarrantyPeriodSaveFailed() {
  return {
    type: REQUEST_SAVE_OBJECTIVE_WARRANTY_PERIOD_FAILED,
  };
}

function setStatePeriodSaveProgress() {
  return {
    type: REQUEST_SET_STATE_PERIOD,
  };
}

function setStatePeriodSaveSuccess() {
  return {
    type: REQUEST_SET_STATE_PERIOD_SUCCESS,
  };
}

function setStatePeriodSaveFailed() {
  return {
    type: REQUEST_SET_STATE_PERIOD_FAILED,
  };
}

function exportExcelLiquidationProgress() {
  return {
    type: REQUEST_EXPORT_LIQUIDATION,
  };
}

function exportExcelLiquidationSuccess() {
  return {
    type: REQUEST_EXPORT_LIQUIDATION_SUCCESS,
  };
}

function exportExcelLiquidationFailed() {
  return {
    type: REQUEST_EXPORT_LIQUIDATION_FAILED,
  };
}

function periodDataClear() {
  return {
    type: REQUEST_PERIOD_DATA_CLEAR,
  };
}

export function requestExportLiquidation(periodId, generateLiquidation, next) {
  return (dispatch) => {
    dispatch(exportExcelLiquidationProgress());
    exportExcelLiquidation(periodId, generateLiquidation)
      .then((response) => {
        if (!response.data.Message.Flag) {
          dispatch(exportExcelLiquidationFailed());
          dispatch(setMessage('No hay datos para guardar la liquidación sin derogación', 'warning'));
          return;
        }
        dispatch(exportExcelLiquidationSuccess());
        dispatch(setMessage(response.data.Message.Message, 'success'));
        next();
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(setStatePeriodSaveFailed());
        dispatch(setMessage(error.response.data.Message.Message, 'error', 'Error', 'Modal'));
      });
  };
}

export function requestNamesPeriod() {
  return (dispatch) => {
    dispatch(namesPeriodListProgress());
    getNamesPeriodLiquidation()
      .then((response) => {
        if (response.data.Message.Flag) {
          dispatch(namesPeriodListSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(namesPeriodListSuccessEmpty());
          dispatch(setMessage('No existen periodos de liquidación configurados', 'warning'));
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(namesPeriodListFailed());
        dispatch(setMessage('Error obteniendo los nombres de periodos de liquidación', 'error'));
      });
  };
}

export function requestGetObjectiveWarrantyPeriod(periodId, type) {
  return (dispatch) => {
    dispatch(getObjectivePeriodListProgress());
    getObjectiveWarrantyPeriodLiquidation(periodId, type)
      .then((response) => {
        if (response.data.ModelData !== null && response.data.Message.Flag) {
          dispatch(getObjectivePeriodListSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(getObjectivePeriodListFailed());
          dispatch(setMessage('Error consultando el periodo del objetivo', 'error'));
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(getObjectivePeriodListFailed());
        dispatch(setMessage('Error consultando el periodo del objetivo de liquidación', 'error'));
      });
  };
}

export function requestGetStates() {
  return (dispatch) => {
    getState()
      .then((response) => {
        if (response.data.Message.Flag) {
          dispatch(statesSuccess(response.data.ModelData));
        } else if (!response.data.Message.Flag) {
          dispatch(statesFailed());
          dispatch(setMessage('Error obteniendo los estados de la liquidación', 'error'));
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(statesFailed());
        dispatch(setMessage('Error obteniendo los estados de la liquidación', 'error'));
      });
  };
}

export function requestGetStatePeriod() {
  return (dispatch) => {
    getStatePeriodLiquidation()
      .then((response) => {
        if (response.data.Message.Flag) {
          dispatch(statePeriodSuccess(response.data.ModelData));
        } else if (!response.data.Message.Flag) {
          dispatch(statePeriodFailed());
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(statePeriodFailed());
        dispatch(setMessage('Error obteniendo los estados del periodo de liquidación', 'error'));
      });
  };
}

export function requestObjectivePeriod() {
  return (dispatch) => {
    dispatch(objectivePeriodListProgress());
    getObjectivePeriod()
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(objectivePeriodListSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(objectivePeriodListSuccessEmpty());
          dispatch(setMessage('No existen periodos de objetivos configurados', 'warning'));
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(objectivePeriodListFailed());
        dispatch(setMessage('Error obteniendo los periodos de objetivos', 'error'));
      });
  };
}

export function requestWarrantyPeriod() {
  return (dispatch) => {
    dispatch(warrantyPeriodListProgress());
    getWarrantyPeriod()
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(warrantyPeriodListSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(warrantyPeriodListSuccessEmpty());
          dispatch(setMessage('No existen periodos de garantías configurados', 'warning'));
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(warrantyPeriodListFailed());
        dispatch(setMessage('Error obteniendo los periodos de garantías', 'error'));
      });
  };
}

export function requestSaveObjectiveWarrantyPeriod(year, month, periodId, type, next) {
  return (dispatch) => {
    dispatch(objectiveWarrantyPeriodSaveProgress());
    saveObjectiveWarrantyPeriod(year, month, periodId, type)
      .then((response) => {
        if (response.data.Message.Flag) {
          dispatch(objectiveWarrantyPeriodSaveSuccess());
          next();
          dispatch(setMessage(response.data.Message.Message, 'success'));
        } else if (!response.data.Message.Flag) {
          dispatch(objectiveWarrantyPeriodSaveFailed());
          dispatch(setMessage('Error guardando el periodo', 'error'));
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(objectiveWarrantyPeriodSaveFailed());
        dispatch(setMessage('Error guardando el periodo', 'error'));
      });
  };
}

export function requestSetStatePeriod(periodId, index) {
  return (dispatch) => {
    dispatch(setStatePeriodSaveProgress());
    setStatePeriod(periodId, index)
      .then((response) => {
        if (response.data.Message.Flag) {
          dispatch(setStatePeriodSaveSuccess());
        } else if (!response.data.Message.Flag) {
          dispatch(setStatePeriodSaveFailed());
          dispatch(setMessage('Error actualizando el estado del periodo de liquidación', 'error'));
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(setStatePeriodSaveFailed());
        dispatch(setMessage('Error actualizando el estado del periodo de liquidación', 'error'));
      });
  };
}

export function requestDataObjectivePeriodClear() {
  return (dispatch) => {
    dispatch(periodDataClear());
  };
}

export function verifyDataLiquidation(periodId) {
  return (dispatch) => {
    dispatch(verifyDataLiquidationProgress());
    requestverifyDataLiquidation(periodId)
      .then((response) => {
        if (response.data.Message.Flag) {
          dispatch(verifyDataLiquidationSuccess(true));
        } else {
          dispatch(verifyDataLiquidationSuccess(false));
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(verifyDataLiquidationFailed());
        dispatch(setMessage('Error verificando la existencia de datos del periodo de liquidación', 'error'));
      });
  };
}

