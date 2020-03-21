import React, { Component } from 'react';
import 'src/components/RunModel/LoadFile.scss';

class LoadFile extends Component {


    render() {
        const hiddenS = { display: 'none' };
        const LoadButtonText = 'Upload VCF Files';
        return(
            <div className='model_content__step'>
                <div className='model_content__step_title'>Load VCF Data</div>
                <div className='model_content__load_file'>
                    <div className='load_file__upload'>
                        <label className='load_file__upload_btn'>
                            <input type='file'
                                id='fileInput'
                                name='fileInput'
                                style={hiddenS}
                                />
                            <i className='load_file__upload_icon' />
                            { LoadButtonText }
                        </label>
                        <p className='load_file__addition'>
                            <a>try given samples</a>
                            <span>|</span>
                            <a>discover consortiums</a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoadFile;