import { instancePostSale } from '../instance';

const axios = instancePostSale();

// eslint-disable-next-line import/prefer-default-export
export function getConsolidatedList() {
  return axios.get('Consolidated/List');
}

// eslint-disable-next-line import/prefer-default-export
export function saveConsolidated(data) {
  return axios.post('Consolidated/Save', {
    Operator: data.Operator,
    fulfillmentConsolidated: data.fulfillmentConsolidated,
    AdicionalConsolidated: data.AdicionalConsolidated,
  });
}
