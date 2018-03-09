import {
  REQUEST_EVENTUALITY_VN,
  GET_EVENTUALITY,
  SAVE_UPDATE_EVENTUALITY,
  REQUEST_EVENTUALITY_COLUMNS,
  EMPTY_EVENTUALITY,
  EMPTY_TAB_EVENTUALITY,
  EXPORT_EVENTUALITIESREPORT_SUCCESS,
  REQUEST_HADEVENTUALITY,
  SUCCESS_HADEVENTUALITY,
  EMPTY_HADEVENTUALITY,
  FAILED_HADEVENTUALITY,
} from './const';
import { listResolve, resolveAction } from '../../utils/generateActionsApi';
import setMessage from '../generic/action';

import {
  getEventualitiesByPeriod,
  saveOrUpdate,
  getColumnsEventuality,
  getEventuality,
  getListLogEventualities,
} from '../../api/newVehicle/eventualy';

export const requestEventualities = periodId => dispatch => (
  listResolve(
    getEventualitiesByPeriod,
    REQUEST_EVENTUALITY_VN,
    'eventualities',
    dispatch,
    { periodId },
    (err, result) => {
      if (result !== true) {
        dispatch(setMessage('Error obteniendo las eventualidades.', 'error'));
      }
    },
  )
);

export const requestEventualitiesColumns = () => dispatch => (
  listResolve(
    getColumnsEventuality,
    REQUEST_EVENTUALITY_COLUMNS,
    'columns',
    dispatch,
    { type: 'SD' },
    (err, result) => {
      if (result !== true) {
        dispatch(setMessage('Error obteniendo las columnas.', 'error'));
      }
    },
  )
);

export const requestEventuality = id => (dispatch) => {
  if (!id) {
    return;
  }
  listResolve(getEventuality, GET_EVENTUALITY, 'eventuality', dispatch, { id }, (err, result) => {
    if (result !== true) {
      dispatch(setMessage('Error obteniendo la eventualidad.', 'error'));
    }
  });
};


export const eventualitiesSaveOrUpdate = (params, next) => dispatch => (
  resolveAction(
    saveOrUpdate,
    SAVE_UPDATE_EVENTUALITY,
    dispatch,
    params,
    (err, result) => {
      if (result === true) {
        dispatch(setMessage('La eventualidad se guardó correctamente.', 'success'));
        if (typeof next === 'function') {
          next();
        }
      } else {
        dispatch(setMessage('Error guardando la eventualidad.', 'error'));
      }
    },
  )
);

export const emptyEventuality = () => ({
  type: EMPTY_EVENTUALITY,
});

export const emptyTabEventuality = () => ({
  type: EMPTY_TAB_EVENTUALITY,
});


// #region "exportNonDerogateLiquidation"
export function expNDLSuccess(urlDownload) {
  return {
    type: EXPORT_EVENTUALITIESREPORT_SUCCESS,
    urlDownload,
  };
}

export function exportEventualitiesReport(period) {
  return (dispatch) => {
    const URL_BASE = process.env.REACT_APP_PATH_API;
    const urlDownload = `${URL_BASE}${process.env.REACT_APP_EVENTUALITIESREPORT_DOWNLOAD_EXCEL}?Period=${period}`;
    dispatch(expNDLSuccess(urlDownload));
  };
}
// #endregion

// #region "getListLogEventualities"
export function requestListLogEventualities() {
  return { type: REQUEST_HADEVENTUALITY };
}

export function successListLogEventualities() {
  return {
    type: SUCCESS_HADEVENTUALITY,
  };
}

export function emptyListLogEventualities() {
  return { type: EMPTY_HADEVENTUALITY };
}

export function failedListLogEventualities() {
  return { type: FAILED_HADEVENTUALITY };
}

export function getListLogEventuality(period) {
  return (dispatch) => {
    dispatch(requestListLogEventualities());
    getListLogEventualities(period)
      .then((response) => {
        if (response.data.Message.Flag === false) {
          dispatch(setMessage('No hay eventualidades para el periodo seleccionado.', 'warning'));
        } else {
          dispatch(exportEventualitiesReport(period));
        }
      })
      .catch(() => {
        dispatch(failedListLogEventualities());
        dispatch(setMessage('Error verificando datos de Eventualidades.', 'error'));
      });
  };
}
// #endregion

