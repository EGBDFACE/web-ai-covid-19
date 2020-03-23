import React,{ Component } from 'react';
import './UploadBtn.scss';

export default function UploadBtn () {
    // const fileInput = React.createRef();
    let fileInput: React.RefObject<HTMLInputElement> = React.createRef();
    return (
        <div className='welcome_upload_area'>
            <div className='welcome_upload_div'>
                <input type='file' 
                    name='pic_upload' 
                    id='pic_upload' 
                    multiple 
                    ref={ fileInput } 
                    // onChange={() => uploadCall(fileInput.current.files)}
                />
                <label className='welcome_upload_btn' htmlFor='pic_upload'>
                    <span>UPLOAD IMAGE</span>
                </label>
                <p className='welcome_upload_tip'>Or drop CT images here</p>
                <div className='welcome_upload_info'>
                    <p>please upload multiple dicom files of one CT case at one time</p>
                    <p>* Maximum: 50 images</p>
                </div>
            </div>
        </div>
    )
}