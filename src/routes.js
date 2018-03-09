import asyncComponent from './AsyncComponent';

const routesVn = [
  {
    index: 1.1,
    path: '/',
    component: asyncComponent(() =>
      import('./pages/newVehicle/preliminarySettlementSteps').then(module => module.default),
    ),
    exact: true,
  },
  {
    index: 1.2,
    path: '/settlement',
    component: asyncComponent(() =>
      import('./pages/newVehicle/settlementSteps').then(module => module.default),
    ),
  },
  {
    index: 1.3,
    path: '/bonusCriteria',
    component: asyncComponent(() =>
      import('./pages/newVehicle/bonusCriteria').then(module => module.default),
    ),
  },
  {
    index: 1.4,
    path: '/dealerGroups/:type',
    component: asyncComponent(() =>
      import('./pages/newVehicle/groupsList').then(module => module.default),
    ),
  },
  {
    index: 1.5,
    path: '/accomplish',
    component: asyncComponent(() =>
      import('./pages/newVehicle/accomplishments').then(module => module.default),
    ),
  },
  {
    index: 1.6,
    path: '/parameters',
    component: asyncComponent(() =>
      import('./pages/newVehicle/parameterListPage').then(module => module.default),
    ),
  },
  {
    index: 1.7,
    path: '/periodvn',
    component: asyncComponent(() =>
      import('./pages/newVehicle/period').then(module => module.default),
    ),
  },
  {
    index: 1.8,
    path: '/reportEventualities',
    component: asyncComponent(() =>
      import('./pages/newVehicle/reportEventualities').then(module => module.default),
    ),
  },
  {
    index: 1.9,
    path: '/reportDerogateLiquidation',
    component: asyncComponent(() =>
      import('./pages/newVehicle/reportDerogateLiquidation').then(module => module.default),
    ),
  },
];

const routesPv = [
  {
    index: 2.1,
    path: '/warranty',
    component: asyncComponent(() =>
      import('./pages/postSale/warranty').then(module => module.default),
    ),
  },
  {
    index: 2.2,
    path: '/standard',
    component: asyncComponent(() =>
      import('./pages/postSale/standard').then(module => module.default),
    ),
  },
  {
    index: 2.3,
    path: '/networkShopping',
    component: asyncComponent(() =>
      import('./pages/postSale/networkShopping').then(module => module.default),
    ),
  },
  {
    index: 2.4,
    path: '/loadObjective',
    component: asyncComponent(() =>
      import('./pages/postSale/loadObjective').then(module => module.default),
    ),
  },
  {
    index: 2.5,
    path: '/period',
    component: asyncComponent(() =>
      import('./pages/postSale/periodList').then(module => module.default),
    ),
  },
  {
    index: 2.6,
    path: '/nonDerogateLiquidation',
    component: asyncComponent(() =>
      import('./pages/postSale/nonDerogateLiquidation').then(module => module.default),
    ),
  },
  {
    index: 2.7,
    path: '/consolidated',
    component: asyncComponent(() =>
      import('./pages/postSale/performConsolidated').then(module => module.default),
    ),
  },
  {
    index: 2.8,
    path: '/eventuality',
    component: asyncComponent(() =>
      import('./pages/postSale/eventuality').then(module => module.default),
    ),
  },
  {
    index: 2.9,
    path: '/nonDerogateLiquidationReport',
    component: asyncComponent(() =>
      import('./pages/postSale/nonDerogateLiquidationReport').then(module => module.default),
    ),
  },
  {
    index: 3,
    path: '/ranges',
    component: asyncComponent(() =>
      import('./pages/postSale/ranges').then(module => module.default),
    ),
  },
  {
    index: 3.1,
    path: '/segment',
    component: asyncComponent(() =>
      import('./pages/postSale/segmentList').then(module => module.default),
    ),
  },
];

export default [...routesVn, ...routesPv];
