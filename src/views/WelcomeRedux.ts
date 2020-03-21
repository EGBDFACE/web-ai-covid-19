/// 整合分发 默认导出当前路由需要的所有 reducer 的集合
import { combineReducers } from 'redux';

// 引入 reducer 及 actionCreator
import login , { ILoginState } from 'src/components/Welcome/LoginRedux';

// TODO: can not export it at the same time
// import * as loginAction from 'src/components/Welcome/LoginRedux';
export interface IDisplayState {
    isLoginDialog: boolean,
    isScrollTop: boolean,
}
export interface IWelcomeState {
    displayState: IDisplayState,
    login: ILoginState
}

const initialState: IDisplayState = {
    isLoginDialog: false,
    isScrollTop: true
}

// export const LOGIN_DIALOG_SHOW = 'LOGIN_DIALOG_SHOW';
// export const LOGIN_DIALOG_HIDDEN = 'LOGIN_DIALOG_HIDDEN';
// export const WELCOME_SCROLL_TOP = 'SCROLL_TOP';
// export const WELCOME_SCROLL_NOT_TOP = 'SCROLL_NOT_TOP';

export const LOGIN_DIALOG = 'LOGIN_DIALOG';
export const WELCOME_SCROLL = 'WELCOME_SCROLL';
// function loginDialogShow () {
//     return {
//         type: LOGIN_DIALOG_SHOW
//     }
// }
// function loginDialogHidden () {
//     return {
//         type: LOGIN_DIALOG_HIDDEN
//     }
// }
// function welcomeScrollTop () {
//     return {
//         type: WELCOME_SCROLL_TOP
//     }
// }
// function welcomeScrollNotTop () {
//     return {
//         type: WELCOME_SCROLL_NOT_TOP
//     }
// }
export function actionCreator (actionType: String, value: boolean) {
    return {
        type: actionType,
        payload: value
    }
}

function displayState (state = initialState, action: any) {
    switch ( action.type ) {
        case 'LOGIN_DIALOG': {
            return {
                ...state,
                isLoginDialog: action.payload
            }
        }
        case 'WELCOME_SCROLL': {
            return {
                ...state,
                isScrollTop: action.payload
            }
        }
        // case 'LOGIN_DIALOG_SHOW': {
        //     return {
        //         ...state,
        //         isLoginDialog: true,
        //     }
        // }
        // case 'LOGIN_DIALOG_HIDDEN': {
        //     return {
        //         ...state,
        //         isLoginDialog: false
        //     }
        // }
        // case 'WELCOME_SCROLL_TOP': {
        //     return {
        //         ...state,
        //         isScrollTop: true
        //     }
        // }
        // case 'WELCOME_SCROLL_NOT_TOP': {
        //     return {
        //         ...state,
        //         isScrollTop: false
        //     }
        // }
        default: return state;
    }
}

// export default combineReducers({
//     login,
// });
export const welcomeReducer = combineReducers({
    login,
    displayState
});

