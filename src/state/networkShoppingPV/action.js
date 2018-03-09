import {
  REQUEST_NETWORDKSHOPPING_DOWNLOAD,
  REQUEST_NETWORDKSHOPPING_DOWNLOAD_FAILED,
  REQUEST_NETWORDKSHOPPING_DOWNLOAD_TRUE,
  REQUEST_NETWORDKSHOPPING_DOWNLOAD_FALSE,
} from './const';
import setMessage from '../generic/action';
import { getFileDownloadNetworkShopping } from '../../api/postSale/networkShopping';

function networkShoppingProgress() {
  return {
    type: REQUEST_NETWORDKSHOPPING_DOWNLOAD,
  };
}

function networkShoppingDownloadFailed() {
  return {
    type: REQUEST_NETWORDKSHOPPING_DOWNLOAD_FAILED,
  };
}

function networkShoppingDownloadTrue() {
  return {
    type: REQUEST_NETWORDKSHOPPING_DOWNLOAD_TRUE,
  };
}

function networkShoppingDownloadFalse() {
  return {
    type: REQUEST_NETWORDKSHOPPING_DOWNLOAD_FALSE,
  };
}


export default function requestNetworkShopping(start, end, callBack) {
  return (dispatch) => {
    dispatch(networkShoppingProgress());
    getFileDownloadNetworkShopping(start, end)
      .then((response) => {
        if (response.data.length > 0) {
          dispatch(networkShoppingDownloadTrue(response.data));
          callBack();
        } else if (response.data.Message.Flag === false) {
          dispatch(networkShoppingDownloadFalse());
          dispatch(setMessage('No hay registros para esta consulta', 'warning'));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(networkShoppingDownloadFailed());
        dispatch(setMessage('Error obteniendo el informe', 'error'));
      });
  };
}
