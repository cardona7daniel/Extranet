import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import app from './reducers';

let middleware = {};
if (process.env.NODE_ENV !== 'production') {
  middleware = composeWithDevTools(
    applyMiddleware(thunk),
  );
} else {
  middleware = applyMiddleware(thunk);
}

export default createStore(
  app,
  middleware,
);
