import React from 'react';
// import Loadable from 'react-loadable';
import { Route, Router, Switch } from 'react-router-dom';
// import LoadingMask from 'src/components/shared/Mask/LoadingMask';
import { ConnectedRouter } from 'connected-react-router';
import browserHistory from 'src/routes/history';
import Welcome from 'src/views/Welcome';
// import RunModel from 'src/views/RunModel';
import MainPage from 'src/views/MainPage';

// const Welcome = Loadable({
//     loader: () => import('src/views/Welcome.tsx'),
//     loading: () => <LoadingMask />
// });
// const RunModel = Loadable({
//     loader: () => import('src/views/RunModel.tsx'),
//     loading: () => <LoadingMask />
// })

// export default (
//     <Router history={history}>
//         <div className='router-content'>
//             <Route exact path='/' component={Welcome} />
//             <Route path='/model' component={RunModel} />
//         </div>
//     </Router>
// )

/**
 * 此时 _history 中的 listen 还是只有一个，如果直接用 browserHistory 的时候
 * 也是一个，但这个 是 Route.js 中的 listen ，通过 setState 使页面刷新，
 * _history 中的一个 listen 是 sync.js 中的 handleLocationChange 。
 * ConnectedRouter 中 history 的 listen 有两个，一个是 handleLocationChange ，
 * 另一个是 Route.js 中的。
 * handleLocationChange 发起的 action 都是 @@router/LOCATION_CHANGE
 */
// 传入将 React Router 与 Redux store 绑定之后的增强 history 对象
// const routes = (_history:any) => (
//     <Router history={_history} >
//         <Switch>
//             <Route exact path='/' component={Welcome} />
//             <Route path='/model' component={RunModel} />
//         </Switch>
//     </Router>
// );
// export default routes;

export default (
    <ConnectedRouter history={browserHistory}>
        <Switch>
            <Route exact path='/' component={Welcome} />
            {/* <Route path='/model' component={RunModel} /> */}
            <Route path='/main' component={MainPage} />
        </Switch>
    </ConnectedRouter>
)