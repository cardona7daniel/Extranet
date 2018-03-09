import {
  REQUEST_EVENTUALITY_VN,
  REQUEST_EVENTUALITY_COLUMNS,
  SAVE_UPDATE_EVENTUALITY,
  GET_EVENTUALITY,
  EMPTY_EVENTUALITY,
  EMPTY_TAB_EVENTUALITY,
  EXPORT_EVENTUALITIESREPORT_SUCCESS,
  REQUEST_HADEVENTUALITY,
  SUCCESS_HADEVENTUALITY,
  EMPTY_HADEVENTUALITY,
  FAILED_HADEVENTUALITY,
} from './const';
import {
  PROGRESS,
  SUCCESS,
  SUCCESS_EMPTY,
  FAILED,
} from '../../utils/generateActionsApi';

const initialState = {
  eventualities: [],
  eventualityEdit: {},
  columns: [],
  columnsAssigned: [],
  loading: false,
  defaultTab: null,
  generateLiq: false,
  urlDownload: [],
};

const defaultTab = (state, action) => {
  if (state.defaultTab !== null) {
    return state.defaultTab;
  }
  return action.eventualities.length > 0
    ? 2
    : 1;
};

export default function eventualityApp(state = initialState, action) {
  switch (action.type) {
    case `${GET_EVENTUALITY}_${PROGRESS}`:
    case `${SAVE_UPDATE_EVENTUALITY}_${PROGRESS}`:
    case `${REQUEST_EVENTUALITY_VN}_${PROGRESS}`: {
      return { ...state, loading: true };
    }
    case EMPTY_EVENTUALITY:
    case `${GET_EVENTUALITY}_${FAILED}`:
    case `${GET_EVENTUALITY}_${SUCCESS_EMPTY}`:
    case `${SAVE_UPDATE_EVENTUALITY}_${FAILED}`:
    case `${REQUEST_EVENTUALITY_VN}_${SUCCESS_EMPTY}`:
    case `${REQUEST_EVENTUALITY_VN}_${FAILED}`: {
      return { ...state, loading: false, eventualities: [], eventualityEdit: {} };
    }
    case `${REQUEST_EVENTUALITY_COLUMNS}_${SUCCESS_EMPTY}`:
    case `${REQUEST_EVENTUALITY_COLUMNS}_${FAILED}`: {
      return { ...state, columns: [], loading: false };
    }
    case `${REQUEST_EVENTUALITY_VN}_${SUCCESS}`: {
      return {
        ...state,
        loading: false,
        eventualities: action.eventualities,
        columnsAssigned: action.eventualities.length > 0
          && action.eventualities.map(eventuality => eventuality.IdColumn),
        defaultTab: defaultTab(state, action),
      };
    }
    case `${REQUEST_EVENTUALITY_COLUMNS}_${SUCCESS}`: {
      return { ...state, columns: action.columns };
    }
    case `${SAVE_UPDATE_EVENTUALITY}_${SUCCESS}`: {
      return { ...state, loading: false };
    }
    case `${GET_EVENTUALITY}_${SUCCESS}`: {
      return { ...state, eventualityEdit: action.eventuality, loading: false };
    }
    case EMPTY_TAB_EVENTUALITY: {
      return { ...state, defaultTab: null };
    }
    case EXPORT_EVENTUALITIESREPORT_SUCCESS: {
      return {
        ...state,
        loading: false,
        generateLiq: true,
        urlDownload: action.urlDownload,
      };
    }
    case REQUEST_HADEVENTUALITY: {
      return {
        ...state,
        loading: true,
      };
    }
    case EMPTY_HADEVENTUALITY: {
      return {
        ...state,
        loading: false,
      };
    }
    case SUCCESS_HADEVENTUALITY: {
      return {
        ...state,
        loading: false,
      };
    }
    case FAILED_HADEVENTUALITY: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}
