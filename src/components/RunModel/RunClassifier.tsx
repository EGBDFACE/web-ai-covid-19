import React , { Component } from 'react';
import './RunClassifier.scss';

class RunClassifier extends Component {

    render() {
        const RunButtonText = 'Run it now'
        return(
            <div className='model_content__step'>
                <div className='model_content__step_title'>Run Cancer Classifier</div>
                <div className='model_content__run_classifier'>
                    <p>Choose Model</p>
                    <div className='run_classifier__menu'>
                        <div className='run_classifier__menu__our_model'>
                            <a className='our_model__btn'>
                                <i className='our_model__icon' />
                            </a>
                            <p>Our Classifier</p>
                        </div>
                        <p className='run_classifier__menu__compare'>compared with</p>
                        <ul className='run_classifier__menu__other_model'>
                            <li>
                                <a className='other_model_btn'>DeepGene</a>
                                <a className='other_model_btn'>DNN Classifier</a>
                            </li>
                            <li>
                                <a className='other_model_btn'>SVM</a>
                                <a className='other_model_btn'>Logistic Regression</a>
                            </li>
                        </ul>
                    </div>
                    <p>Run Cancer Classifier</p>
                    <a className='run_classifier__btn'>
                        <i className='run_classifier__icon' />
                        { RunButtonText }
                    </a>
                </div>
            </div>
        )
    }
}

export default RunClassifier;