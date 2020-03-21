/**
 * 
 * @param param0 
 * 多异步串联处理中间件
 * 
 */

const sequenceMiddleware = ({dispatch, getState} : any) => (next : any) => (action : any) => {
    if ( !Array.isArray( action )) {
        return next(action);
    }

    /**
     * 构建 action creator 时，传递一个数组，数组中每一个值都将是按顺序执行的步骤，
     * 这里的步骤既可以是异步的，也可以是同步的。（通过对 promise 封装可以做到无论
     * 是否是异步请求都可以通过 promise 来传递以达到统一的效果）
     * 使用 Promise.resolve() 来初始化action.reduce 方法，然后始终使用 
     * Promise.then() 方法串联起数组，实现串联步骤
     * 
     * 这里如果中间有多种 action 被 dispatch ，是一个接一个的链式触发
     */
    // console.log(action);
    return action.reduce( (result, currAction) => {
        return result.then( () => {
            // console.log('1');
            // console.log('result', result);
            // console.log('currAction', currAction);
            return Array.isArray( currAction ) ? 
                Promise.all(currAction.map(item => dispatch(item))) : 
                dispatch(currAction);
        });
    }, Promise.resolve());

    // for (let i=0 ; i<action.length; i++) {
        
    //     if (isPromise(action[i].func) && Array.isArray(action[i].types)) {
    //         const [ LOADING, SUCCESS, WRONG, ERROR ] = action[i].types;
    //         next ({
    //             type: LOADING
    //         })
    //         action[i].func
    //         .then ( (result: any) => {

    //         }) 
    //     }
    // }
}

export default sequenceMiddleware;

function isPromise (val: any) {
    return val && typeof val.then === 'function';
}