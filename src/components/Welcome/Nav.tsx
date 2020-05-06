import React from 'react';
import './Nav.scss';


export default function WelcomeNav ()  {
    // const svgObj = require('src/styles/img/icon.svg');
    // console.log(svgObj);
    return (
        <div className='welcome_nav'>
            <div className='nav_topic'>
                <i className='nav_label' />
                {/* <h1>AI-COVID-19</h1> */}
                {/* <p>A collaborative online AI engine for precise CT-based COVID-19 diagnosis.</p> */}
                <h1>COVID-19 Diagnosis</h1>
                <p>Online diagnostic interface and AI development interface for AI-CT-COVID-19.</p>
            </div>
            <i className='nav_icon' />
            {/* <div className='nav_icon'>{svgObj.default()}</div> */}
            {/* <img src='src/styles/img/icon.svg' className='nav_icon' /> */}
        </div>
    )
}