import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import generic from './generic/reducer';
import period from './period/reducer';
import objective from './objective/reducer';
import preliminarySettlement from './preliminarySettlement/reducer';
import billingCriteria from './billingCriteria/reducer';
import exclusion from './exclusion/reducer';
import periodPV from './periodPV/reducer';
import exclusionPV from './exclusionPV/reducer';
import npsPV from './npsPV/reducer';
import consolidatedPV from './consolidatedPV/reducer';
import periodLiqPV from './periodLiqPV/reducer';
import networkShoppingPV from './networkShoppingPV/reducer';
import NDLiquidation from './derogateLiquidation/reducer';
import nonDerogateLiquidation from './nonDerogateLiquidation/reducer';
import eventualityPV from './eventualityPV/reducer';
import parameterPV from './parameterPV/reducer';
import groups from './groups/reducer';
import parameter from './parameters/reducer';
import accomplishments from './accomplishments/reducer';
import rangesPVApp from './rangePV/reducer';
import eventuality from './eventuality/reducer';
import segmentPV from './segmentPV/reducer';

export default combineReducers({
  generic,
  period,
  objective,
  preliminarySettlement,
  billingCriteria,
  exclusion,
  periodPV,
  exclusionPV,
  npsPV,
  consolidatedPV,
  networkShoppingPV,
  periodLiqPV,
  NDLiquidation,
  nonDerogateLiquidation,
  eventualityPV,
  parameterPV,
  groups,
  parameter,
  accomplishments,
  rangesPVApp,
  eventuality,
  segmentPV,
  routing: routerReducer,
});
