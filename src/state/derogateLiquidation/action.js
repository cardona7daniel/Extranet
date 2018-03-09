import * as types from './const';
import * as api from '../../api/newVehicle/derogateLiquidation';

function NDLiquidationSuccess() {
  return {
    type: types.REQUEST_NON_DEROGATE_LIQUIDATION_SUCCESS,
  };
}

function NDLiquidationProgress() {
  return {
    type: types.REQUEST_NON_DEROGATE_LIQUIDATION_PROGRESS,
  };
}

function NDLiquidationFailed() {
  return {
    type: types.REQUEST_NON_DEROGATE_LIQUIDATION_FAILED,
  };
}

export default function requestGenerateNDL(period) {
  return (dispatch) => {
    dispatch(NDLiquidationProgress());

    api.generateNonDerogateLiquidation(period)
      .then((response) => {
        if (response.data.Message.Flag !== false) {
          dispatch(NDLiquidationSuccess());
        } else {
          dispatch(NDLiquidationFailed());
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(NDLiquidationFailed());
      });
  };
}

// #region "exportNonDerogateLiquidation"
export function expNDLProgress() {
  return { type: types.EXPORT_NON_DEROGATE_LIQUIDATION_PROGRESS };
}

export function expNDLSuccess(urlDownload) {
  return {
    type: types.EXPORT_NON_DEROGATE_LIQUIDATION_SUCCESS,
    urlDownload,
  };
}

export function exportNonDerogateLiquidation(period) {
  return (dispatch) => {
    const URL_BASE = process.env.REACT_APP_PATH_API;
    const urlDownload = `${URL_BASE}${process.env.REACT_APP_NONDEROGATELIQUIDATIONVN_DOWNLOAD_EXCEL}?Period=${period}`;
    dispatch(expNDLSuccess(urlDownload));
  };
}
// #endregion
