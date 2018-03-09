import { instancePostSale } from '../instance';

const axios = instancePostSale();

// eslint-disable-next-line import/prefer-default-export
export function getNpsList() {
  return axios.get('Nps/List');
}

// eslint-disable-next-line import/prefer-default-export
export function saveNps(data) {
  return axios.post('Nps/Save', {
    Average: data.Average,
    BestRanking: data.BestRanking,
    WorseRanking: data.WorseRanking,
    BonusDiscount: data.BonusDiscount,
  });
}
