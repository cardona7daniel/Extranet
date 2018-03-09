import {
  REQUEST_PERIOD_SUCCESS,
  REQUEST_PERIOD_SUCCESS_EMPTY,
  REQUEST_PERIOD_FAILED,
} from './const';
import { getLastPeriod } from '../../api/postSale/period';

function periodSuccess(periodData) {
  return {
    type: REQUEST_PERIOD_SUCCESS,
    periodData,
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

export default function requestPeriod(next) {
  return (dispatch) => {
    getLastPeriod()
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(periodSuccess(response.data.ModelData));
          next();
        } else if (response.data.Message.Flag === false) {
          dispatch(periodSuccessEmpty());
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        dispatch(periodFailed());
      });
  };
}
