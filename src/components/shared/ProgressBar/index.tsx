import React from 'react';
import './index.scss';

export default function Progress(v: number, s: string) {
    const innerSty = {width: v+'%'};
    // console.log(innerSty);
    return (
        <div className='progress_outer'>
            <div className='progress_inner' style={innerSty} />
            <span>{s}</span>
        </div>
    )
}