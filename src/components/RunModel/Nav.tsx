import React from 'react';
import './Nav.scss';

interface IProps {}

function Nav (props: IProps) {
    return (
        <header>
            <div className='model_nav'>
                <div className='model_nav_title'>Cancer Classifier</div>
                <p className='model_nav_description'>for precisely predicting the classification of 12 cancer types</p>
                <p className='model_nav_labels'>CESC LUAD BRCA PAAD ACC KIRP STAD PRAD UCS HNSC BLCA LGG</p>
                <i className='model_nav_icon'/>
            </div>
        </header>
    )
}

export default Nav;