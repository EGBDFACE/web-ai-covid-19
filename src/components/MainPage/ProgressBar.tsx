import React from 'react';

export default function ProgressBar (tipInfo: string, progress: number) {
    const innerWidth = { width: `${progress}%` };
    return (
        <div className='main_progress_area'>
            <div className='progress_bar'>
                <div className='progress_inner' style={innerWidth} />
            </div>
            <p className='progress_tip'>{tipInfo}</p>
            <p className='main_tip'>Drop CT images here</p>
        </div>
    )
}