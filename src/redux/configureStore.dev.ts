// 生成 Redux store
import { applyMiddleware, createStore, combineReducers, compose, } from 'redux';
// react-router-redux 只兼容 react-route 2.x and 3.x
// import { routerReducer, routerMiddleware } from 'react-router-redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import ThunkMiddleware from 'redux-thunk';
import { persistState } from 'redux-devtools';
import fetchMiddleware from 'src/utils/fetchMiddleware'; 
import sequenceMiddleware from 'src/utils/sequenceMiddleware';
import DevTools from 'src/redux/devTools';
import rootReducer from 'src/redux/reducer';   
import browserHistory from 'src/routes/history';

// let createBrowserHistory = require('history').createBrowserHistory;

function getDebugSessionKey () {
    // You can write custom logic here!
    // By default we try to read the key from ?debug_session=<key> in the address bar
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return matches && matches.length > 0 ? matches[1] : null;
}

/**
 * @function finalCreateStore
 * 不直接使用 createStore ，利用 compose 方法对 createStore 增强
 * 
 * 使用 middleware，可以让 Redux 解析各种类型的 action（方法、promise 等）
 * 
 * React Router 是一个独立的路由处理库，routerMiddleware 将 React Router 
 * 中维持的状态暴露给 Redux 应用，即在 Redux 应用中修改 React Router 的状态
 * 之后就可以在任何可以拿到 store.dispatch 的环境中通过 
 * store.dispatch(push('routerPath')) 修改路由
 * 
 * fetchMiddle 是自己写的中间件，当发送特定类型的 action 时就会被使用，
 * 用于网络请求的分发与响应数据的处理
 * 
 * thunk middle ：当 action 为函数时不调用 next 或 dispatch，而是返回 action
 * 的调用
 */
const finalCreateStore = compose(
    applyMiddleware( ThunkMiddleware, fetchMiddleware, sequenceMiddleware, routerMiddleware(browserHistory)),
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument(),
    // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
    persistState(getDebugSessionKey())
)(createStore);

const routerReducer = connectRouter(browserHistory);
// rootReducer 中已经汇总整个应用的 reducer，
// routerReducer 帮助实现路由状态和 Redux store 的统一
const reducer = combineReducers(Object.assign({}, rootReducer, {
    router: routerReducer,
}));

export function configureStore (initialState: any) {
    /**
     * 阅读 applyMiddleWare 和 compose 可以发现返回的 store 
     * 中的 dispatch 被改写为 各个 middleWare 传入 {getStore, dispatch}
     * 之后的链式结构（middleWare 传入 {getStore, dispatch} 返回一个匿名函数 ），
     * 该匿名函数的参数是 next ，各个 middleWare 中的 next 指的是其包裹的内层 middleware 链
     * 调用 next 返回的是一个参数为 action 的函数，这个函数即在此 middleware 中对 action 进行处理
     *  */ 
    const store = finalCreateStore( reducer, initialState);

    // module.hot error 
    // if (module as any).hot or npm i -D @types/webpack-env
    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
        module.hot.accept ('./reducer', () => {
            store.replaceReducer(
                require('./reducer')
            )
        })
    }
    return store;
}