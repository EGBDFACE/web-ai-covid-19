/// 整合分发 默认导出当前路由需要的所有 reducer 的集合
import { combineReducers } from 'redux';

// 引入 reducer 及 actionCreator
// import login , { ILoginState } from 'src/components/Welcome/LoginRedux';

// TODO: can not export it at the same time
// import * as loginAction from 'src/components/Welcome/LoginRedux';
// export interface IDisplayState {
//     isLoginDialog: boolean,
//     isScrollTop: boolean,
// }
// export interface IWelcomeState {
//     displayState: IDisplayState,
//     login: ILoginState
// }
export interface IFileItem {
    fileName: string;
    fileSize: number;
    fileObj: any;
    fileResult: any;
}
export interface IFileState {
    uploadState: string;
    fileList: IFileItem[];
}
// const initialState: IDisplayState = {
//     isLoginDialog: false,
//     isScrollTop: true
// }
const initialState: IFileState = {
    uploadState: 'begin',
    fileList: []
}

export function actionCreator(type: string, payload?: any) {
    return {
        type,
        payload
    }
}
// export const LOGIN_DIALOG_SHOW = 'LOGIN_DIALOG_SHOW';
// export const LOGIN_DIALOG_HIDDEN = 'LOGIN_DIALOG_HIDDEN';
// export const WELCOME_SCROLL_TOP = 'SCROLL_TOP';
// export const WELCOME_SCROLL_NOT_TOP = 'SCROLL_NOT_TOP';

export const START_UPLOAD = 'START_UPLOAD';
export const UPLOAD_MORE = 'UPLOAD_MORE';
export const CLEAR_ALL = 'CLEAR_ALL';
export const START_ANALYSIS = 'START_ANALYSIS';

export function fileReducer (state = initialState, action: any) {
    switch ( action.type ) {
        case 'START_UPLOAD': {
            return {
                uploadState: 'start-upload',
                fileList: action.payload
            }
        }
        case 'UPLOAD_MORE': {
            return {
                ...state,
                fileList: action.payload
            }
        }
        case 'CLEAR_ALL': {
            return {
                uploadState: 'begin',
                fileList: []
            }
        }
        case 'START_ANALYSIS': {
            return {
                ...state,
                uploadState: 'start-analysis'
            }
        }
        default: return state;
    }
}

// export default combineReducers({
//     login,
// });
// export const welcomeReducer = combineReducers({
//     login,
//     displayState
// });

