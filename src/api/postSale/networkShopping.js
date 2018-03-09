import { instancePostSale } from '../instance';

const axios = instancePostSale();

// eslint-disable-next-line import/prefer-default-export
export function getFileDownloadNetworkShopping(start, end) {
  console.log('consultando url', start, end);
  return axios.get('NetworkShopping/ExportPreliminaryLiquidationNS', {
    params: {
      dInitialDate: start,
      dFinalDate: end,
    },
  },
  );
}
