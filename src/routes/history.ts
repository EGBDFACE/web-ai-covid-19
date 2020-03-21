// 自定义解决 history 方案，可以在组件中使用 push 操作等
// import { createBrowserHistory } from 'history';
const createBrowserHistory = require('history').createBrowserHistory;
/**
 * 阅读 history 源码发现 createBrowserHistory 提供了参数 props
 * forceRefresh 默认值为 false，传入 ture 之后可以解决 push 之后
 * url 改变但 页面无刷新的情况
 * 内部的跳转方式是通过修改 window.location.href 来实现跳转，
 */
// export default createBrowserHistory({forceRefresh: true});
const browserHistory: any = createBrowserHistory();
export default browserHistory;
// export default createHashHistory();

/**
 * 将 React Router 与 Redux store 绑定， 获得一个增强的 history 对象
 * 将这个 history 对象传递给 React Router 中的 <Router> 组件作为 props
 * 给 React Router Redux 提供了观察路由变化并改变 store 的能力
 */
//import { browserHistory } from 'react-router' // not support in v4
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
// import createHistory from 'history/createBrowserHistory';





