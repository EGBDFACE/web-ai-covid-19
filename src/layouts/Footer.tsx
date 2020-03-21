import React, { Component } from 'react';
import './Footer.scss';

interface IProps {
	location: any
}

interface IStates { }

export default class Footer extends Component<IProps, IStates> {
	constructor(props: IProps) {
		super(props);
	}

	render() {
        const centerStyle = { justifyContent : 'center' };
        const isCenter = this.props.location.pathname === '/model';
        return (
            <footer>
                <div className="footer" style ={isCenter ? centerStyle : null}>
                    <p className="copyright" >&copy; {new Date().getFullYear()}
                    </p>
                </div>
            </footer>
        )
	}
}