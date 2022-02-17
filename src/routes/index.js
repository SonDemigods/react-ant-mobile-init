import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import EsintHome from '../functions/esint-home';
import EsintList from '../functions/esint-list';
import EsintEdit from '../functions/esint-edit';
import EsintDetails from '../functions/esint-details';


class BasicRoute extends Component {
  render () {
    return (
        <Switch>
          {/* <Route exact path="/list" component={EsintList} /> */}
          <Route exact path="/edit/:id" component={EsintEdit} />
          {/* <Route exact path="/details" component={EsintDetails} /> */}
          <Route exact path="/" component={EsintList} />
        </Switch>
    )
  }
}

export default BasicRoute;
