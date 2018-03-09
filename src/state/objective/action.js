import {
  REQUEST_OBJECTIVE,
  REQUEST_OBJECTIVE_SUCCESS,
  REQUEST_OBJECTIVE_FAILED,
  REQUEST_OBJECTIVE_EMPTY,
} from './const';
import setMessage from '../generic/action';
import { getExistsObjectives } from '../../api/newVehicle/objectives';

export function existObjectivesSuccess(existsObjectives) {
  return {
    type: REQUEST_OBJECTIVE_SUCCESS,
    existsObjectives,
  };
}

function existObjectivesProgress() {
  return {
    type: REQUEST_OBJECTIVE,
  };
}

function objectiveFailed() {
  return {
    type: REQUEST_OBJECTIVE_FAILED,
  };
}

function objectiveEmpty() {
  return {
    type: REQUEST_OBJECTIVE_EMPTY,
  };
}

export default function requestExistObjectives(periodId) {
  return (dispatch) => {
    dispatch(existObjectivesProgress());

    getExistsObjectives(periodId)
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(existObjectivesSuccess(response.data.ModelData));
        } else {
          dispatch(objectiveEmpty());
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        dispatch(objectiveFailed());
        dispatch(setMessage('Error obteniendo los objetivos', 'error'));
      });
  };
}
