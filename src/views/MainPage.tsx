import React, { Component, Dispatch } from 'react';
import axios from 'axios';
import './MainPage.scss';
import UploadBtn from 'src/components/MainPage/UploadBtn';
// import ProgressBar from 'src/components/MainPage/ProgressBar';
import Progress from 'src/components/shared/ProgressBar';
import ImageList from 'src/components/MainPage/ImageList';
import AnalysisPart from 'src/components/MainPage/AnalysisPart';
import { IStoreState } from 'src/redux/reducer';
import * as welcomeReducer from 'src/views/WelcomeRedux';
import { IFileResult } from 'src/views/WelcomeRedux';
import { connect } from 'react-redux';
import Footer from 'src/layouts/Footer';
import { TYPES,BASE_URL } from 'src/utils/constant';
import { push } from 'connected-react-router';
import { resFileHandle } from 'src/utils/fileHandle';

declare const window: any;

interface IPicResult {
    type: string;
    confidence: number;
    severity: string;
}
export interface IPic {
    fileName: string,
    fileSize: number,
    fileObj: any,
    fileResult: IPicResult,
}
interface IProps {
    fileList: IPic[];
    fileResult: IFileResult;
    stepState: string;
    uploadMore?: (v: IPic[]) => void;
    clearAll?: () => void;
    goto?: (v: string) => void;
    setFileResult?: (v:IFileResult) => void;
    startAnalysis?: () => void;
};
interface IStates {
    // picList: IPic[];
    uploadedPer: number;
    // analysisF: boolean;
    isUploading: boolean;
};

function MainHeader () {
    return (
        <div className='main_header'>
            <i/>
            <h1>AI-COVID-19</h1>
        </div>
    )
}

function MainInfo () {
    return (
        <p className='main_info'>
        <span>Deep Learning Cloud System for Identifying and Grading Coronavirus Disease 2019 Pneumonia Classifying CT images into four types: COVID-19, non-COVID-19 viral pneumonia, bacterial pneumonia, and healthy, and Grading the severity of confirmed COVID-19 cases. 
        </span>
        </p>
    )
}

function MainDialog (WrappedComponent: any,header: string) {
    return (
        <div className='main_dialog'>
            <div className='main_dialog_header'>{header}</div>
        </div>
    )
}

function MainFooter () {
    return (
        <div className='main_footer'>
            <p className='footer_contact'>Contact xxxx@xx.com for more.</p>
            <p className='footer_right'>Copyright &copy; xxx. All rights reserved.</p>
        </div>
    )
}

export function fileHandle (value: any) {
    const list: IPic[] = [];
    for (let i=0; i<value.length; i++){
        list.push({
            fileName: value[`${i}`].name,
            fileSize: Number((value[`${i}`].size/(1024*1024)).toFixed(2)),
            fileObj: value[`${i}`],
            fileResult: undefined
        })
    }
    return list;
}

function mainOperation(list: IPic[], uploadMore: Function, clearAll: Function, picAnalysis: Function, analysisTip: string) {
    const uploadMoreRef: React.RefObject<HTMLInputElement> = React.createRef();
    return (
        <div className='main_list_operation'>
            <div className='main_list_clear' 
                onClick={() => clearAll()}>Clear All</div> 
            <input type='file'
                name='list_upload_more'
                id='list_upload_more'
                multiple
                ref={uploadMoreRef}
                onChange={() => uploadMore(list.concat(fileHandle(uploadMoreRef.current.files)))}
            />
            <label className='main_list_upload_more'
                htmlFor='list_upload_more'
            >Upload More</label>
            <div className='main_list_analysis' 
                onClick={() => picAnalysis()}>{analysisTip}</div>
        </div>
    )
} 
function mainUploadingProcess(uploadedPer: number) {
    return(
        <div className='main_list_operation'>
            {Progress(uploadedPer,'ANALYSISING')}
        </div>
    )
}
class MainResult extends Component<IProps,null>{
    constructor(props: IProps){
        super(props);
    }

    componentDidMount() {
        const element = this.refs.resultImageEle;
        const {fileList} = this.props;
        const fileObj = fileList[Math.floor(fileList.length/2)].fileObj;
        window.cornerstone.enable(element);
        var index = window.cornerstoneFileImageLoader.addFile(fileObj);
        var imageId = 'dicomfile://'+index;
        window.cornerstone.loadImage(imageId).then(function(image: any){
            window.cornerstone.displayImage(element,image);
        })
    }
    handleDownload() {
        let link = document.createElement('a');
        let resultStr = '';
        // list.forEach(v => {
        //     resultStr += v.fileName 
        //         + ' : '
        //         + v.fileResult.type
        //         + ', ' 
        //         + v.fileResult.confidence
        //         +';\n'; 
        // })
        let blob = new Blob([resultStr])
        link.download = 'result';
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    render(){
        const {fileList,fileResult,stepState} = this.props;
        const fileObj = fileList[Math.floor(fileList.length/2)];
        const shortName = fileObj.fileName.length > 10 ? fileObj.fileName.slice(0,2)+'...'+fileObj.fileName.slice(-5) : fileObj.fileName;
        const resultTypeSty = {backgroundColor: fileResult.bgColor};
        // const resultTypeSty = {};
        return (
            <div className='main_result_list'>
                <div className='main_list_header'>DIAGNOSIS RESULTS</div>
                <div className='main_result_header'>
                    <span className='result_header_image'>CT IMAGE</span>
                    <span>TYPE</span>
                    <span className='result_header_confidence'>CONFIDENCE</span>
                </div>
                <div className='main_result_content'>
                    <div className='image_item'>
                        <div className='image_preview'
                            ref='resultImageEle' />
                        <p>Image {shortName} </p>
                    </div>
                    <span className='type_info' style={resultTypeSty}>{fileResult.type}</span>
                    <span className='confidence_info'>{fileResult.confidence}</span>
                </div>
                <div className='main_result_download'></div>
            </div>
        )
    }
}
class MainPage extends Component<IProps,IStates>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            // picList: list,
            uploadedPer: 0,
            // analysisF: false,
            isUploading: false
        }
        // this.listChange = this.listChange.bind(this);
        // this.picUploadFn = this.picUploadFn.bind(this);
        this.clearRedirect = this.clearRedirect.bind(this);
        this.picAnalysis = this.picAnalysis.bind(this);
    }

    clearRedirect() {
        this.props.clearAll();
        this.props.goto('/');
    }
    // listChange(list: IPic[]) {
    //     this.setState({
    //         picList: list
    //     });
    // }

    // picUploadFn(value: any) {
    //     const list = fileHandle(value);
    //     this.listChange(list);
    // }

    picAnalysis() {
        this.setState({
            // analysisF: true,
            isUploading: true
        });
        this.props.startAnalysis();
        // console.log(this.state.picList);
        let param = new FormData();
        this.props.fileList.forEach(item => {
            param.append('dicoms', item.fileObj);
        });
        axios({
            method: 'POST',
            baseURL: BASE_URL,
            url: 'predict',
            headers: {'Content-Type': 'multipart/form-data'},
            data: param,
            onUploadProgress: (progressEvent) => {
                this.setState({
                    uploadedPer: (progressEvent.loaded/progressEvent.total)*100
                });
            }
        }).then(res => {
            // console.log(res);
            let fileResult = resFileHandle(res.data.type);
            this.props.setFileResult(fileResult);
        }).catch(err => {
            console.error(err);
        }).finally(() => {
            this.setState({
                isUploading: false,
                uploadedPer: 0
            })
        })
        // axios.post('http://www.elongevity.ai/api/predict', param, config).then(response => {
        //     console.log(response);
        // }).catch(error => {
        //     console.log(error);
        // }).finally(() => {
        //     this.setState({
        //         isUploading: false,
        //         uploadedPer: 0
        //     });
        // })
    }

    render() {
        const { fileList,fileResult,stepState, uploadMore } = this.props;
        const { isUploading,uploadedPer } = this.state;
        const analysisBtnSt = stepState === 'get-result' ? 'New Diagnosis' : 'START Diagnosis';
        return (
            <div className='main'>
                <MainHeader />
                <div className='main_list'>
                    <div className='main_list_header'>UPLOAD CT IMAGES</div>
                    <ImageList list={fileList} listFn={() => {return;}} disable={false}/>
                    {isUploading ? mainUploadingProcess(uploadedPer) : mainOperation(fileList, uploadMore, this.clearRedirect, this.picAnalysis, analysisBtnSt)}
                </div>
                {stepState !== 'get-result' ? null :
                <MainResult fileList={fileList} 
                    fileResult={fileResult} 
                    stepState={stepState}/>}
                <Footer footerClass='main_footer' />
            </div>
        )
    }
}
function mapStateToProps (state: IStoreState) {
    return {
        fileList: state.welcome.fileList,
        fileResult: state.welcome.fileResult,
        stepState: state.welcome.uploadState
    }
}
function mapDispatchToProps (dispatch: Dispatch<any>) {
    return {
        startAnalysis: () => dispatch(welcomeReducer.actionCreator(welcomeReducer.START_ANALYSIS)),
        uploadMore: (v: IPic) => dispatch(welcomeReducer.actionCreator(welcomeReducer.UPLOAD_MORE, v)),
        setFileResult: (v: IFileResult) => dispatch(welcomeReducer.actionCreator(welcomeReducer.SET_RESULT,v)),
        clearAll: () => dispatch(welcomeReducer.actionCreator(welcomeReducer.CLEAR_ALL)),
        goto: (v: string) => dispatch(push(v))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MainPage);