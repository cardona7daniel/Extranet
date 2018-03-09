import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { LocaleProvider } from 'antd';
import esEs from 'antd/lib/locale-provider/es_ES';
import Document from './pages/_document';
import store from './state/store';

if (process.env.NODE_ENV === 'production') {
  require('./ant-theme-vars.production.less'); // eslint-disable-line global-require
} else {
  require('./ant-theme-vars.less'); // eslint-disable-line global-require
}
// import registerServiceWorker from './registerServiceWorker';

const history = syncHistoryWithStore(createBrowserHistory(), store);
const baseName = process.env.REACT_APP_URL_BASE;

function App() {
  return (
    <LocaleProvider locale={esEs}>
      <Provider store={store}>
        <Router history={history} basename={baseName}>
          <Document />
        </Router>
      </Provider>
    </LocaleProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
