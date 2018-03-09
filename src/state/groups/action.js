import {
  // Request List
  REQUEST_GROUPS,
  REQUEST_GROUPS_SUCCESS,
  REQUEST_GROUPS_SUCCESS_EMPTY,
  REQUEST_GROUPS_FAILED,
  // Request dealership
  REQUEST_DEALERSHIP,
  REQUEST_DEALERSHIP_SUCCESS,
  REQUEST_DEALERSHIP_SUCCESS_EMPTY,
  REQUEST_DEALERSHIP_FAILED,
  // Save
  SAVE_GROUPS,
  SAVE_GROUPS_FAILED,
  SAVE_GROUPS_SUCCESS,
  // empty info
  EMPTY_GROUPS,
} from './const';
import setMessage from '../generic/action';
import {
  getGroups,
  getCreateEditInfo,
  saveOrUpdate,
} from '../../api/newVehicle/groups';
import { GROUPS_TYPE_DEALER } from '../../utils/formats';

// region Request List actions
const groupsSuccess = groups => ({
  type: REQUEST_GROUPS_SUCCESS,
  groups,
});

const groupsProgress = () => ({
  type: REQUEST_GROUPS,
});

const groupsSuccessEmpty = () => ({
  type: REQUEST_GROUPS_SUCCESS_EMPTY,
});

export const groupsFailed = () => ({
  type: REQUEST_GROUPS_FAILED,
});

export const requestGroups = (type = GROUPS_TYPE_DEALER) => (
  (dispatch) => {
    dispatch(groupsProgress());
    getGroups(type)
      .then((response) => {
        if (response.data.ModelData && typeof response.data.ModelData === 'object') {
          dispatch(groupsSuccess(
            response.data.ModelData,
          ));
        } else if (response.data.Message.Flag === false) {
          dispatch(groupsSuccessEmpty());
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        dispatch(groupsFailed());
        dispatch(setMessage('error obteniendo los grupos', 'error'));
      });
  }
);
// endregion

// region Request FamilyVehicle actions
const groupInfoSuccess = (
  dealerShips,
  rooms,
  group = {},
) => ({
  type: REQUEST_DEALERSHIP_SUCCESS,
  dealerShips,
  rooms,
  group,
});

const groupInfoProgress = () => ({
  type: REQUEST_DEALERSHIP,
});

const groupInfoSuccessEmpty = () => ({
  type: REQUEST_DEALERSHIP_SUCCESS_EMPTY,
});

const groupInfoFailed = () => ({
  type: REQUEST_DEALERSHIP_FAILED,
});

export const requestGroupInfo = (type, id) => (
  (dispatch) => {
    dispatch(groupInfoProgress());
    getCreateEditInfo(type, id)
      .then((response) => {
        if (response.data.ModelData) {
          const {
            dealerShips,
            rooms,
            group = {},
          } = response.data.ModelData;

          dispatch(groupInfoSuccess(
            dealerShips,
            rooms,
            group,
          ));
        } else if (response.data.Message.Flag === false) {
          dispatch(groupInfoSuccessEmpty());
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        dispatch(groupInfoFailed());
        dispatch(setMessage('error obteniendo', 'error'));
      });
  }
);
// endregion

// region Save or Update

const groupSaveOrUpdateProgress = () => ({
  type: SAVE_GROUPS,
});

const groupSaveOrUpdateSuccess = () => ({
  type: SAVE_GROUPS_SUCCESS,
});

const groupSaveOrUpdateFailed = () => ({
  type: SAVE_GROUPS_FAILED,
});

export const saveOrUpdateGroup = (params, next) => (dispatch) => {
  dispatch(groupSaveOrUpdateProgress());
  saveOrUpdate(params)
    .then((response) => {
      if (response.data.ModelData) {
        dispatch(groupSaveOrUpdateSuccess());
        dispatch(setMessage('El grupo se guardó correctamente.', 'success'));
        next();
      } else if (response.data.Message.Flag === false) {
        dispatch(groupSaveOrUpdateFailed());
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
      dispatch(groupSaveOrUpdateFailed());
      dispatch(setMessage('Error guardando el grupo.', 'error'));
    });
};

// endregion

// region empty info

export const emptyGroupsInfo = () => ({
  type: EMPTY_GROUPS,
});

// endregion
