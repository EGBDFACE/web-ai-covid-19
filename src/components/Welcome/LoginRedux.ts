import { fetchGetSalt, fetchLogin } from 'src/api';
import { hmacTime } from 'src/utils/hmacTime';
// import { IStoreState } from 'src/redux/reducer';
import { push } from 'connected-react-router';

export interface ILoginState {
    errMsg: any,
    isLogined: boolean,
    isLogining: boolean,
    isLoginError: boolean,
    isLoginWrong: boolean,
    salt: string,
    wrongMsg: any,
}

const initialState: ILoginState = {
    errMsg: undefined,
    isLogined: false,
    isLogining: false,
    isLoginError: false,
    isLoginWrong: false,
    salt: '',
    wrongMsg: undefined,
};

const GET_SALT_ING = 'GET_SALT_ING';
const GET_SALT_SUCCESS = 'GET_SALT_SUCCESS';
const GET_SALT_ERROR = 'GET_SALT_ERROR';
const GET_SALT_WRONG = 'GET_SALT_WRONG';

const LOGIN_ING = 'LOGIN_ING';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGIN_WRONG = 'LOGIN_WRONG';

export interface IUserInfo {
    username: string,
    password: string
}

// function getLoginParamsWithState (params: IUserInfo, getState: any) {
//     return {
//         username: params.username,
//         password: hmacTime(params.password, getState().welcome.login.salt)
//     }
// }

// export function login (params: IUserInfo) {
//     const getSaltParams = {username: params.username};
//     return [
//         {
//             types: [GET_SALT_ING, GET_SALT_SUCCESS, GET_SALT_WRONG, GET_SALT_ERROR],
//             func: fetchGetSalt(getSaltParams)
//         },
//         (dispatch: any, getState: any) => {
//             dispatch({
//                 types: [LOGIN_ING, LOGIN_SUCCESS, LOGIN_WRONG, LOGIN_ERROR],
//                 func: fetchLogin(getLoginParamsWithState(params,getState))
//             })
//         }
//     ]
// }
// function getSalt (params: IUserInfo) {
//     return {
//         url: '/getSalt',
//         params,
//         types: [GET_SALT_ING, GET_SALT_SUCCESS, GET_SALT_WRONG, GET_SALT_ERROR],
//     }
// }
// function login (params: IUserInfo) {
//     return {
//         url: '/signIn',
//         params,
//         types: 
//     }
// }

// export function loginInit (params: IUserInfo) {

// }
// async function getSalt (params: IUserInfo) {
//     const getSaltParams = {username: params.username};
//     let getSaltResult = await fetchGetSalt(getSaltParams);
//     return {
//         types: [ GET_SALT_ING, GET_SALT_SUCCESS, GET_SALT_WRONG, GET_SALT_ERROR ],
//         payload: getSaltResult
//     }
// }

function loginSuccess () {
    return push('/model');
}

function loginWithSalt (params: IUserInfo, salt: string) {
    const loginParams = { ...params, password: hmacTime(params.password, salt)};
    return {
        types: [null, LOGIN_SUCCESS, LOGIN_WRONG, LOGIN_ERROR],
        func: fetchLogin(loginParams),
        payload: loginSuccess()
    }
}

// function getLoginParamsWithState (params: IUserInfo) {
//     return {
//         ...params,
//         password: hmacTime(params.password, )
//     }
// }

export function login (params: IUserInfo) {
    const startLogin = new Promise( (resolve, reject) => {
        resolve({
            type: GET_SALT_ING
        })
    });
    

    const getSaltParams = { username: params.username };
    const getSaltPro = new Promise ( (resolve, reject) => {
        fetchGetSalt(getSaltParams)
        .then( (result) => {
            resolve({
                types: [GET_SALT_SUCCESS, GET_SALT_WRONG],
                payload: result.data
            })
        })
        .catch( (err) => {
            reject({
                type: GET_SALT_ERROR,
                payload: err
            })
        })
    });

    return [
        startLogin,
        // (dispatch: any, getState: any) => { dispatch({ type: GET_SALT_ING }) },
        getSaltPro,
        (dispatch: any, getState: any): any => {
            if (getState().welcome.login.salt === '') {
                return null;
            }else {
                dispatch(loginWithSalt(params, getState().welcome.login.salt));
            }
        }
    ]
}

    
    // const loginPro = new Promise ( (resolve, reject) => {
    //     fetchLogin(getLoginParamsWithState(params)
    // })
// 如果是一个 async 函数 则 属于一个 promise action 而不是 函数 action
// export function beforeLogin (params: IUserInfo) {
//     const getSaltPro = new Promise((resolve, reject) => {
//         const getSaltParams = { username: params.username };
//         fetchGetSalt(getSaltParams)
//         .then( (result) => {
//             resolve(result);
//         })
//         .catch( (err) => {
//             reject(err);
//         })
//     });
    
//     const loginPro = new Promise( (resolve, reject) => {
//         const loginParams = {username: params.username}
//     })
    
    // const getSaltParams = {username: params.username};
    // return {
    //     types: [ GET_SALT_ING, GET_SALT_SUCCESS, GET_SALT_WRONG, GET_SALT_ERROR ],
    //     func: fetchGetSalt(getSaltParams)
    // }

    // store.dispatch({
    //     type: LOGIN_ING,
    // });

    // let getSaltResult = undefined;
    // try{
    // //    getSaltResult = await fetchGetSalt(getSaltParams);
    // }catch (err) {
    //     return {
    //         type: LOGIN_ERROR,
    //         err,
    //     }
    // }
    // if (getSaltResult.data.code === '000001') {
    //     // let loginResult = undefined;
    //     const loginParams = { ...params, password: hmacTime(params.password, getSaltResult.data.data)};
    //     return {
    //         types: [LOGIN_ING, LOGIN_SUCCESS, LOGIN_WRONG, LOGIN_ERROR],
    //         func: fetchLogin(loginParams),
    //     }
    // } else {
    //     return {
    //         type: LOGIN_WRONG,
    //         title: 'wrong username or password'
    //     }
    // }
// }

export default function loginState (state = initialState, action:any) {
    switch( action.type ) {
        case GET_SALT_ING:
        case LOGIN_ING: {
            return {
                ...state,
                errMsg: undefined,
                isLogined: false,
                isLoginError: false,
                isLogining: true,
                isLoginWrong: false,
                salt: '',
                wrongMsg: undefined,
            };
        }
        case GET_SALT_SUCCESS: {
            return {
                ...state,
                salt: action.payload
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                isLogined: true,
                isLoginError: false,
                isLogining: false
            };
        }
        case GET_SALT_ERROR:
        case LOGIN_ERROR: {
            return {
                ...state,
                isLogined: false,
                isLoginError: true,
                isLogining: false,
                errMsg: action.payload
            };
        }
        case GET_SALT_WRONG:
        case LOGIN_WRONG: {
            return {
                ...state,
                isLogined: false,
                isLoginEror: false,
                isLogining: false,
                isLoginWrong: true,
                wrongMsg: action.payload
            }
        }
        default : 
            return state;
    }
}