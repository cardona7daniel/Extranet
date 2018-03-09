import {
  // Request List
  REQUEST_PARAMETERS,
  REQUEST_PARAMETERS_SUCCESS,
  REQUEST_PARAMETERS_SUCCESS_EMPTY,
  REQUEST_PARAMETERS_FAILED,
  // Update
  UPDATE_PARAMETERS,
  UPDATE_PARAMETERS_SUCCESS,
  UPDATE_PARAMETERS_FAILED,
} from './const';
import setMessage from '../generic/action';
import {
  getParameters,
  updateParameter,
} from '../../api/newVehicle/parameters';

// region Request List actions
const parametersSuccess = parameters => ({
  type: REQUEST_PARAMETERS_SUCCESS,
  parameters,
});

const parametersProgress = () => ({
  type: REQUEST_PARAMETERS,
});

const parametersSuccessEmpty = () => ({
  type: REQUEST_PARAMETERS_SUCCESS_EMPTY,
});

const parametersFailed = () => ({
  type: REQUEST_PARAMETERS_FAILED,
});

export const requestParameters = () => (
  (dispatch) => {
    dispatch(parametersProgress());
    getParameters()
      .then((response) => {
        if (response.data.ModelData && typeof response.data.ModelData === 'object') {
          dispatch(parametersSuccess(
            response.data.ModelData,
          ));
        } else if (response.data.Message.Flag === false) {
          dispatch(parametersSuccessEmpty());
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        dispatch(parametersFailed());
        dispatch(setMessage('error obteniendo los parámetros', 'error'));
      });
  }
);
// endregion

// region Update

function parametersUpdateProgress() {
  return {
    type: UPDATE_PARAMETERS,
  };
}

function parametersUpdateSuccess() {
  return {
    type: UPDATE_PARAMETERS_SUCCESS,
  };
}

function parametersUpdateFailed() {
  return {
    type: UPDATE_PARAMETERS_FAILED,
  };
}

export function updateParameters(params, next) {
  return (dispatch) => {
    dispatch(parametersUpdateProgress());
    updateParameter(params)
      .then((response) => {
        if (response.data.Message.Flag === true) {
          dispatch(parametersUpdateSuccess());
          dispatch(setMessage('El parámetro se actualizó correctamente.', 'success'));
          if (typeof next === 'function') {
            next();
          }
        } else if (response.data.Message.Flag === false) {
          dispatch(parametersUpdateFailed());
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        dispatch(parametersUpdateFailed());
        dispatch(setMessage('Error actualizando el parámetro.', 'error'));
      });
  };
}

// endregion
