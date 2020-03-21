import { isFSA } from 'flux-standard-action';

function isPromise (val:any) {
    return val && typeof val.then === 'function';
}

// action 为网络请求时，处理的中间件
const fetchMiddleware = (store: any) => (next: any) => (action: any) => {

    // if (!isFSA (action) ) {
    //     if (isPromise(action)) {
    //         return action.then(store.dispatch);
    //     }
    //     if (Array.isArray(action)) {
    //         const acl = action.length;
    //         for (let i=0; i<acl; i++) {
    //             if (isFSA(action[i])) {
    //                 if (i === acl-1) {
    //                     return next(action[i]);
    //                 }else {
    //                     next(action[i]);
    //                 }
    //             }else if (isPromise(action[i])) {

    //             }
    //         }
    //     }
    // }
    if (isFSA (action)) {
        return next(action);
    }

    // if (Array.isArray (action)) {
    //     for(let i=0; i<action.length; i++) {

    //     }
    // }

    if (isPromise(action)) {
        // 返回 store.dispatch 之后就可以在 action 中返回正常 action 重新发起 action
        // ？？？
        // 应该是此异步 action resolve 之后返回的正常的 action 为参数执行了这里的 store.dispatch

        // 这里其实是自动将 action.then 的返回值执行了 store.dispatch
        return action.then(store.dispatch);
        // .then( (result: any) => {
        //     return result;
        // })
        // .catch( (err: any) => {
        //     return {
        //         type: 'PROMISE_ERROR',
        //         payload: err
        //     }
        // })
    }

    if (!isPromise(action.func) || !Array.isArray(action.types)) {
        // console.log(action);
        if (Array.isArray(action.types)) {
            const [ SUCCESS, WRONG ] = action.types;
            if (action.payload.code === '000001') {
                return next ({
                    type: SUCCESS,
                    payload: action.payload.data
                })
            } else {
                return next ({
                    type: WRONG,
                    payload: action.payload.msg
                })
            }
        }
        return next(action);
    }

    const [ LOADING, SUCCESS, WRONG, ERROR ] = action.types;

    next({
        type: LOADING,
        // loading: true,
        // ...action,
    });

    action.func
    .then( (result:any) => {
        if (result.data.code === '000001') {
            next({
                type: SUCCESS,
                payload: result.data.data
            })
            if (action.payload) {
                next(action.payload);
            }
        } else {
            next({
                type: WRONG,
                payload: result.data.msg
            })
        }
    })
    .catch( (err:any) => {
        next({
            type: ERROR,
            // loading: false,
            error: err,
        });
    });
}

export default fetchMiddleware;