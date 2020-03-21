import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
// import { syncHistoryWithStore } from 'react-router-redux';
import routes from 'src/routes';
import configureStore from 'src/redux/configureStore';
import 'src/index.scss';
import DevTools from 'src/redux/devTools';
// import browserHistory from 'src/routes/history';

export const store = configureStore();
// export const _history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render((
    <Provider store={store}>
        {routes}
        {/* <DevTools /> */}
    </Provider>
), document.getElementById('root'))