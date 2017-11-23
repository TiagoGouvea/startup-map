import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import { Switch, Router, Route } from 'react-router';
import createHistory from 'history/createBrowserHistory';

import { reducers } from './reducers/index'
import commonQuestions from './components/views/commonQuestions';
import listAllCompanies from './components/views/listAllCompanies';
import companyDetails from './components/views/companyDetails';
import './styles/styles.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin()
const middleware = applyMiddleware(thunk, logger)
const store = createStore(reducers, middleware)
const history = createHistory()

const run = () => {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <Router history={history}>
          <Switch>
            <Route exact path='/startups/entrar-no-mapa/' component={commonQuestions}></Route>
            <Route exact path='/startups/admin/dashboard/' component={listAllCompanies}></Route>
            <Route path='/startups/admin/dashboard/list/:id' component={companyDetails}></Route>
          </Switch>
        </Router>
      </MuiThemeProvider>
    </Provider>, document.getElementById('root'));
}

run()
store.subscribe(run)
