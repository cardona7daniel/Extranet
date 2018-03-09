import {
  REQUEST_PRE_SETTLEMENT_PROGRESS,
  REQUEST_PRE_SETTLEMENT_SUCCESS,
  REQUEST_PRE_SETTLEMENT_FAILED,
} from './const';
import { getGenerateSettlement } from '../../api/newVehicle/preliminarySettlement';

function settlementSuccess() {
  return {
    type: REQUEST_PRE_SETTLEMENT_SUCCESS,
  };
}

function settlementProgress() {
  return {
    type: REQUEST_PRE_SETTLEMENT_PROGRESS,
  };
}

function settlementFailed() {
  return {
    type: REQUEST_PRE_SETTLEMENT_FAILED,
  };
}

export default function requestGenerateSettlement(period) {
  return (dispatch) => {
    dispatch(settlementProgress());

    getGenerateSettlement(period)
      .then((response) => {
        if (response.data.Message.Flag !== false) {
          dispatch(settlementSuccess());
        } else {
          dispatch(settlementFailed());
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(settlementFailed());
      });
  };
}
