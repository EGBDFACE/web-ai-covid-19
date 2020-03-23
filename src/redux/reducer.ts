// 将各个 view 中的 reducer 汇总成整个应用的 reducer
import { fileReducer as welcome , IFileState }from 'src/views/WelcomeRedux';
// import {picState as pic, IPicState} from 'src/views/MainPageRedux';

export interface IStoreState {
    welcome: IFileState
    // pic: IPicState
}

export default {
    welcome,
    // pic
}