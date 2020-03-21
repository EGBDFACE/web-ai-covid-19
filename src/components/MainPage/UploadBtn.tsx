// import IPic from 'src/views/MainPage';
import React,{ Component } from 'react';

export default function UploadBtn (uploadCall:Function) {
    // const fileInput = React.createRef();
    let fileInput: React.RefObject<HTMLInputElement> = React.createRef();
    return (
        <div className='main_upload_area'>
            <input type='file' name='pic_upload' id='pic_upload' multiple ref={ fileInput } onChange={() => uploadCall(fileInput.current.files)}/>
            <label className='upload_btn' htmlFor='pic_upload'>
                <i className='upload_icon' />
                <span>Upload Images</span>
            </label>
            <p className='upload_tip'>Or drop CT images here</p>
        </div>
    )
}

// export default class UploadBtn extends Component {
//     private fileInput : React.RefObject<HTMLInputElement>;
//     constructor(){
//         this.fileInput = 
//     }
//     handleChange(value: any) {
//         console.log(value);
//     }
//     render() {
//         return (
//             <div className='main_upload_area'>
//                 <input type='file' accept='image/*' name='pic_upload' id='pic_upload' multiple ref={ this.fileInput } onChange={() => this.handleChange(this.fileInput.current.files)}/>
//                 <label className='upload_btn' htmlFor='pic_upload'>
//                     <i className='upload_icon' />
//                     <span>Upload Images</span>
//                 </label>
//                 <p className='upload_tip'>Or drop CT images here</p>
//             </div>
//         )
//     }
// }
