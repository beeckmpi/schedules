import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { Provider } from 'react-redux';
import Store from '../../store/store';

// route components
import AppContainer from '../../ui/containers/AppContainer';
import HomeContainer from '../../ui/containers/HomeContainer';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn';
import AuthPageJoin from '../../ui/pages/AuthPageJoin';
import NotFoundPage from '../../ui/pages/NotFoundPage';
import TemplatePageContainer from '../../ui/containers/TemplatePageContainer';

export const renderRoutes = () => (
  <Provider store={Store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={HomeContainer} />
        <Route path="template/:templateId" component={TemplatePageContainer} />
        <Route path="signin" component={AuthPageSignIn} />
        <Route path="join" component={AuthPageJoin} />
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>
);
