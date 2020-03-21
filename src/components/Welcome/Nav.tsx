import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import './Nav.scss';
import { IStoreState } from 'src/redux/reducer';
import * as welcomeReducer from 'src/views/WelcomeRedux';

interface IProps {
    isLogin: boolean;
    isTop: boolean;
    prefix: string;
    loginDialog?: (value: boolean) => void
}
interface IStates {}

class WelcomeNav extends Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);
        this.handleRunClick = this.handleRunClick.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleRunClick () {
        if (this.props.isLogin) {
            // store 控制路由跳转
        } else {
            this.props.loginDialog(true);
        }
    }

    handleLoginClick () {
        this.props.loginDialog(true);
    }

    render() {
        const { isLogin, isTop, prefix } = this.props; 
        const hidden = isLogin ? {display: 'none'} : null;
        return (
            <nav className={isTop ? prefix+'_main_header' : `${prefix}_main_header-scroll`}>
                <span className={prefix+'_main_header__icon'}>CANCER CLASSIFIER</span>
                <div className={prefix+'_main_header__menu'}>
                    <div className={isTop ? 
                        prefix+'_main_header__menu_run' :
                        prefix+'_main_header__menu_run-scroll'
                        }><button onClick={this.handleRunClick}>RUN CLASSIFICATION</button></div>
                    <div style={hidden} className={ isTop ?
                        prefix+'_main_header__menu_login':
                        prefix+'_main_header__menu_login-scroll'
                        }><button onClick={this.handleLoginClick}>LOG IN</button></div>
                </div>
            </nav>
        )
    }
}

export default connect( ( state: IStoreState) => {
    return {
        isLogin: state.welcome.login.isLogined,
        isTop: state.welcome.displayState.isScrollTop
    }
}, ( dispatch: Dispatch<any>) => {
    return {
        loginDialog: (value: boolean) => dispatch(welcomeReducer.actionCreator(welcomeReducer.LOGIN_DIALOG, value))
    }
})(WelcomeNav);