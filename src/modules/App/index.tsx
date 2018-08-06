import React, { PureComponent, ReactNode } from 'react';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';

import BasicLayout from '../BasicLayout/Loadable';

class App extends PureComponent<RouteComponentProps<any, StaticContext>> {
  render(): ReactNode {
    return (
      <Switch>
        <Route exact={true} path="/" component={BasicLayout} />
      </Switch>
    );
  }
}

export default withRouter(App);