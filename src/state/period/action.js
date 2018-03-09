import {
  REQUEST_PERIOD,
  REQUEST_PERIOD_SUCCESS,
  REQUEST_PERIOD_SUCCESS_EMPTY,
  REQUEST_PERIOD_FAILED,
  // List
  REQUEST_PERIODS,
  REQUEST_PERIODS_SUCCESS,
  REQUEST_PERIODS_SUCCESS_EMPTY,
  REQUEST_PERIODS_FAILED,
  // List eventualities
  REQUEST_PERIODS_EVENTUALITIES,
  REQUEST_PERIODS_EVENTUALITIES_SUCCESS,
  REQUEST_PERIODS_EVENTUALITIES_SUCCESS_EMPTY,
  REQUEST_PERIODS_EVENTUALITIES_FAILED,
  // List liquidation
  REQUEST_PERIODS_LIQUIDATION,
  REQUEST_PERIODS_LIQUIDATION_SUCCESS,
  REQUEST_PERIODS_LIQUIDATION_SUCCESS_EMPTY,
  REQUEST_PERIODS_LIQUIDATION_FAILED,
  // By ID
  REQUEST_PERIOD_EDIT,
  REQUEST_PERIOD_EDIT_FAILED,
  REQUEST_PERIOD_EDIT_SUCCESS,
  REQUEST_PERIOD_EDIT_SUCCESS_EMPTY,
  // Save or Update
  SAVE_PERIOD,
  SAVE_PERIOD_SUCCESS,
  SAVE_PERIOD_FAILED,
  // Remove
  REMOVE_PERIOD,
  REMOVE_PERIOD_SUCCESS,
  REMOVE_PERIOD_FAILED,
  // empty
  EMPTY_PERIOD_EDIT,
} from './const';
import setMessage from '../generic/action';
import {
  getPeriod,
  getPeriods,
  getPeriodById,
  saveOrUpdatePeriod,
  removePeriod,
  getPeriodsWithEventualities,
  getPeriodsWithLiquidation,
} from '../../api/newVehicle/periods';

// region period automatic
function periodSuccess(period) {
  return {
    type: REQUEST_PERIOD_SUCCESS,
    period,
  };
}

function periodProgress() {
  return {
    type: REQUEST_PERIOD,
  };
}

function periodSuccessEmpty() {
  return {
    type: REQUEST_PERIOD_SUCCESS_EMPTY,
  };
}

function periodFailed() {
  return {
    type: REQUEST_PERIOD_FAILED,
  };
}

export default function requestPeriod(isPreliminar = true) {
  return (dispatch) => {
    dispatch(periodProgress());
    getPeriod(isPreliminar)
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(periodSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(periodSuccessEmpty());
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        dispatch(periodFailed());
        dispatch(setMessage('error obteniendo el período', 'error'));
      });
  };
}
// endregion

// region list periods
const periodsSuccess = periods => ({
  type: REQUEST_PERIODS_SUCCESS, periods,
});

const periodsProgress = () => ({
  type: REQUEST_PERIODS,
});

const periodsSuccessEmpty = () => ({
  type: REQUEST_PERIODS_SUCCESS_EMPTY,
});

const periodsFailed = () => ({
  type: REQUEST_PERIODS_FAILED,
});

export const requestPeriods = () => (dispatch) => {
  dispatch(periodsProgress());
  getPeriods()
    .then((response) => {
      if (response.data.ModelData !== '') {
        dispatch(periodsSuccess(response.data.ModelData));
      } else if (response.data.Message.Flag === false) {
        dispatch(periodsSuccessEmpty());
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
      dispatch(periodsFailed());
      dispatch(setMessage('error obteniendo el período', 'error'));
    });
};
// endregion

// region get by id
const periodByIdSuccess = period => ({
  type: REQUEST_PERIOD_EDIT_SUCCESS, period,
});

const periodByIdProgress = () => ({
  type: REQUEST_PERIOD_EDIT,
});

const periodByIdSuccessEmpty = () => ({
  type: REQUEST_PERIOD_EDIT_SUCCESS_EMPTY,
});

const periodByIdFailed = () => ({
  type: REQUEST_PERIOD_EDIT_FAILED,
});

export const requestPeriodById = id => (dispatch) => {
  if (id === null) return;
  dispatch(periodByIdProgress());
  getPeriodById(id)
    .then((response) => {
      if (response.data.ModelData !== '') {
        dispatch(periodByIdSuccess(response.data.ModelData));
      } else if (response.data.Message.Flag === false) {
        dispatch(periodByIdSuccessEmpty());
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
      dispatch(periodByIdFailed());
      dispatch(setMessage('error obteniendo el período', 'error'));
    });
};
// endregion

// region Save or Update

function periodSaveOrUpdateProgress() {
  return {
    type: SAVE_PERIOD,
  };
}

function periodSaveOrUpdateSuccess() {
  return {
    type: SAVE_PERIOD_SUCCESS,
  };
}

function periodSaveOrUpdateFailed() {
  return {
    type: SAVE_PERIOD_FAILED,
  };
}

export function PeriodsaveOrUpdate(params, next) {
  return (dispatch) => {
    dispatch(periodSaveOrUpdateProgress());
    saveOrUpdatePeriod(params)
      .then((response) => {
        if (response.data.ModelData && response.data.Message.Flag === true) {
          dispatch(periodSaveOrUpdateSuccess());
          dispatch(setMessage('El periodo se guardó correctamente.', 'success'));
          if (typeof next === 'function') {
            next();
          }
        } else if (response.data.Message.Flag === false) {
          dispatch(periodSaveOrUpdateFailed());
          dispatch(setMessage('Error guardando el periodo.', 'error'));
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        dispatch(periodSaveOrUpdateFailed());
        dispatch(setMessage('Error guardando el periodo.', 'error'));
      });
  };
}

// endregion

// region Remove

const periodRemoveProgress = () => ({
  type: REMOVE_PERIOD,
});

const periodRemoveSuccess = () => ({
  type: REMOVE_PERIOD_SUCCESS,
});

const periodRemoveFailed = () => ({
  type: REMOVE_PERIOD_FAILED,
});

export const periodRemove = (params, next) => (dispatch) => {
  dispatch(periodRemoveProgress());
  removePeriod(params)
    .then((response) => {
      if (response.data.Message.Flag === true) {
        dispatch(periodRemoveSuccess());
        dispatch(setMessage('El periodo se eliminó correctamente.', 'success'));
        if (typeof next === 'function') {
          next();
        }
      } else if (response.data.Message.Flag === false) {
        if (typeof response.data.Message.Message === 'string' &&
          response.data.Message.Message !== ''
        ) {
          dispatch(setMessage(response.data.Message.Message, 'info'));
        }
        dispatch(periodRemoveFailed());
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
      dispatch(periodRemoveFailed());
      dispatch(setMessage('Error eliminando el periodo.', 'error'));
    });
};

// endregion

// region list periods with eventualities
const periodsEventualitiesSuccess = periods => ({
  type: REQUEST_PERIODS_EVENTUALITIES_SUCCESS, periods,
});

const periodsEventualitiesProgress = () => ({
  type: REQUEST_PERIODS_EVENTUALITIES,
});

const periodsEventualitiesSuccessEmpty = () => ({
  type: REQUEST_PERIODS_EVENTUALITIES_SUCCESS_EMPTY,
});

const periodsEventualitiesFailed = () => ({
  type: REQUEST_PERIODS_EVENTUALITIES_FAILED,
});

export const requestPeriodsEventualities = () => (dispatch) => {
  dispatch(periodsEventualitiesProgress());
  getPeriodsWithEventualities()
    .then((response) => {
      if (response.data.ModelData !== '') {
        dispatch(periodsEventualitiesSuccess(response.data.ModelData));
      } else if (response.data.Message.Flag === false) {
        dispatch(periodsEventualitiesSuccessEmpty());
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
      dispatch(periodsEventualitiesFailed());
      dispatch(setMessage('error obteniendo los períodos', 'error'));
    });
};
// endregion

// region list periods with liquidation
const periodsLiquidationSuccess = periods => ({
  type: REQUEST_PERIODS_LIQUIDATION_SUCCESS, periods,
});

const periodsLiquidationProgress = () => ({
  type: REQUEST_PERIODS_LIQUIDATION,
});

const periodsLiquidationSuccessEmpty = () => ({
  type: REQUEST_PERIODS_LIQUIDATION_SUCCESS_EMPTY,
});

const periodsLiquidationFailed = () => ({
  type: REQUEST_PERIODS_LIQUIDATION_FAILED,
});

export const requestPeriodsLiquidation = () => (dispatch) => {
  dispatch(periodsLiquidationProgress());
  getPeriodsWithLiquidation()
    .then((response) => {
      if (response.data.ModelData !== '') {
        dispatch(periodsLiquidationSuccess(response.data.ModelData));
      } else if (response.data.Message.Flag === false) {
        dispatch(periodsLiquidationSuccessEmpty());
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
      dispatch(periodsLiquidationFailed());
      dispatch(setMessage('error obteniendo los períodos', 'error'));
    });
};
// endregion

// region empty edit
export const emptyPeriodEdit = () => ({
  type: EMPTY_PERIOD_EDIT,
});
// region
