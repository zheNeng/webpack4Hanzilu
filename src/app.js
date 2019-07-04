import React, { Suspense } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import reducer from './reducers';
import './app.less';

function Loading() {
  return <div>Loading...</div>;
}

const PageMain = React.lazy(() => import('./components/pageMain'));
const PageSearch = React.lazy(() => import('./components/pageSearch'));
const PageReader = React.lazy(() => import('./components/pageReader'));


const store = createStore(reducer, applyMiddleware(thunk, createLogger, promiseMiddleware));

const App = () => (
  <Provider store={store}>
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={PageMain} />
          <Route path="/search" component={PageSearch} />
          <Route path="/reader/:bookid/:link" component={PageReader} />
        </Switch>
      </Suspense>
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
