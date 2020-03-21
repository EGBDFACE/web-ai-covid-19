import React, { Component } from 'react';
import './LoadingMask.scss';

export default class LoadingMask extends Component {
    public render() {
        return(
            <div className='lds-content'>
                <div className='lds-roller'>
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        )
    }
}