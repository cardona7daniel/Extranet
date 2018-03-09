import {
  REQUEST_NETWORDKSHOPPING_DOWNLOAD,
  REQUEST_NETWORDKSHOPPING_DOWNLOAD_FAILED,
  REQUEST_NETWORDKSHOPPING_DOWNLOAD_TRUE,
  REQUEST_NETWORDKSHOPPING_DOWNLOAD_FALSE,
} from './const';

const initialState = {
  ltNfileDownloadps: [],
  loading: false,
  state: false,
};

export default function networkShoppingPVApp(state = initialState, action) {
  switch (action.type) {
    case REQUEST_NETWORDKSHOPPING_DOWNLOAD: {
      return {
        ...state,
        loading: true,
      };
    }
    case REQUEST_NETWORDKSHOPPING_DOWNLOAD_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case REQUEST_NETWORDKSHOPPING_DOWNLOAD_TRUE: {
      return {
        ...state,
        state: true,
        loading: false,
      };
    }
    case REQUEST_NETWORDKSHOPPING_DOWNLOAD_FALSE: {
      return {
        ...state,
        state: false,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}
