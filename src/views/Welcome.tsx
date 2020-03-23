import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import { push } from 'connected-react-router';
import Footer from 'src/layouts/Footer';
// import Login from 'src/components/Welcome/Login';
import Nav from 'src/components/Welcome/Nav';
import UploadBtn from 'src/components/Welcome/UploadBtn';
import { IStoreState } from 'src/redux/reducer';
import * as welcomeReducer from 'src/views/WelcomeRedux';
import './Welcome.scss';
// import { _history } from 'src/index';

interface IProps {
    goto: (value: string) => void,
    // isLogin: boolean;
    // isScrollTop: boolean,
    // loginDialog: (value: boolean) => void,
    // welcomeScroll: (value: boolean) => void
}
interface IStates {
    // isLoginDialog: boolean,
    // isTop: boolean;
}

/**
 * 去抖
 * 
 * 在React事件调用时，React传递给事件处理程序是一个合成事件对象的实例。
 * SyntheticEvent对象是通过合并得到的。 这意味着在事件回调被调用后，
 * SyntheticEvent 对象将被重用并且所有属性都将被取消。 这是出于性能
 * 原因。 因此无法以异步方式访问该事件
 */
function debounce (func: Function, wait = 500){
    // 定时器变量
    let timeout: any; 

    return function ( event: any) {
        // 每次触发时先清除上一次的定时器，然后重新计时
        clearTimeout( timeout );
        // 保留对事件的引用
        event.persist && event.persist();
        // 深拷贝事件对象
        event = event && { ...event }
        // 指示 wait ms 后触发真正想进行的操作 handler
        timeout = setTimeout (() => {
            func(event);
        },wait);
    }
}

/**
 * 节流
 */
function throttle (fn: Function, interval = 300): Function {
    let canRun = true;

    return function () {
        if (!canRun) return;
        canRun = false;
        setTimeout ( () => {
            fn.apply(this, arguments);
            canRun = true;
        }, interval);
    };
}

class Welcome extends Component<IProps,IStates> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            // isLoginDialog: false,
            // isTop: true,
        };
        // this.handleWelcomeScroll = this.handleWelcomeScroll.bind(this);
        // this.handleRunClick = this.handleRunClick.bind(this);
    }

    // handleWelcomeScroll (e: any) {
    //     const scrollTop: Number = e.target.scrollTop;
    //     const isTop = this.props.isScrollTop;
    //     const submitTopChange = this.props.welcomeScroll;
    //     if (scrollTop > 5 && isTop) {
    //         submitTopChange(false);
    //     } else if (scrollTop === 0 && !isTop) {
    //         submitTopChange(true);
    //     }
    // }

    // handleRunClick () {
    //     const { isLogin, loginDialog } = this.props;
    //     if (!isLogin) {
    //         loginDialog(true);
    //     } else {
    //         // store 控制路由 页面跳转
    //     }
    // }

    // UNSAFE_componentWillReceiveProps(newProps: IProps) {
    //     console.log(newProps.isLogin);
    //     console.log(this.props.isLogin);
    //     if(newProps.isLogin && !this.props.isLogin) {
    //         // console.log('before',_history);
    //         this.props.goto('/model');
    //         // console.log('after',_history);
    //     }
    // }

    render() {
        return (
            <div className='welcome'>
                <Nav />
                <UploadBtn />
                <Footer />
            </div>
        )
    }
}


function mapStateToProps ( state: IStoreState ) {
    return {
        // isLoginDialog: state.welcome.displayState.isLoginDialog,
        // isLogin: state.welcome.login.isLogined,
        // isScrollTop: state.welcome.displayState.isScrollTop
    }
}

function mapDispatchToProps (dispatch: Dispatch<any> ) {
    return {
        goto: (value: string) => dispatch(push(value)),
        // loginDialog: (value: boolean) => dispatch(welcomeReducer.actionCreator(welcomeReducer.LOGIN_DIALOG, value)),
        // welcomeScroll: (value: boolean) => dispatch(welcomeReducer.actionCreator(welcomeReducer.WELCOME_SCROLL, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)