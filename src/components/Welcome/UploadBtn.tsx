import React,{ Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import './UploadBtn.scss';
import axios from 'axios';
import { BASE_URL } from 'src/utils/constant';
import { IFileItem } from 'src/views/WelcomeRedux';
import { IStoreState } from 'src/redux/reducer';
import * as welcomeReducer from 'src/views/WelcomeRedux';
import { push } from 'connected-react-router';

interface IProps {
    uploadState: string,
    uploadCall?: (v: IFileItem[]) => void;
    goto?: (v: string) => void;
}
// function uploadCall(list: any) {
//     let param = new FormData();
//     for (let i=0; i<list.length; i++) {
//         param.append('dicoms', list[`${i}`]);
//     }
//     // list.forEach((item:any) => {
//     //     param.append('dicoms', item)
//     // }) 
//     axios({
//         method: 'POST',
//         baseURL: BASE_URL,
//         url: 'predict',
//         headers: {'Content-Type': 'multipart/form-data'},
//         data: param
//     }).then(res => {
//         console.log(res);
//     }).catch(err => {
//         console.error(err);
//     })
// }
class UploadBtn extends Component<IProps,null>{
    constructor(props: IProps) {
        super(props);
        this.handleUpload = this.handleUpload.bind(this);
    }
    handleUpload(value: any) {
        const list: IFileItem[] = [];
        for (let i=0; i<value.length; i++) {
            list.push({
                fileName: value[`${i}`].name,
                fileSize: Number((value[`${i}`].size/(1024*1024)).toFixed(2)),
                fileObj: value[`${i}`],
                fileResult: undefined
            })
        }
        this.props.uploadCall(list);
        this.props.goto('/main')
    }
    render(){
        let fileInput: React.RefObject<HTMLInputElement> = React.createRef();
        return (
            <div className='welcome_upload_area'>
                <div className='welcome_upload_div'>
                    <input type='file' 
                        name='pic_upload' 
                        id='pic_upload' 
                        multiple 
                        ref={ fileInput } 
                        onChange={() => this.handleUpload(fileInput.current.files)}
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
}

function mapStateToProps (state: IStoreState){
    return {
        uploadState: state.welcome.uploadState
    }
}
function mapDispatchToProps (dispatch: Dispatch<any>) {
    return {
        uploadCall: (v: IFileItem[]) => dispatch(welcomeReducer.actionCreator(welcomeReducer.START_UPLOAD, v)),
        goto: (v: string) => dispatch(push(v))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(UploadBtn);