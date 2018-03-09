import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Components from './components';
import routes from '../routes';


function document() {
  return (
    <div>
      <Switch>
        {routes.map(route => (
          <Route
            key={route.index}
            exact={route.exact ? route.exact : false}
            path={route.path}
            component={route.component}
          />
        ))}
        { process.env.NODE_ENV !== 'production' && (
          /* Solo habilitado para pruebas */
          <Route path="/components" component={Components} />
        )}
      </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  message: state.generic.message,
});

export default connect(
  mapStateToProps,
)(document);
