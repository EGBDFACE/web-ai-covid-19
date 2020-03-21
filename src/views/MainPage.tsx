import React, { Component, Dispatch } from 'react';
import axios from 'axios';
import './MainPage.scss';
import UploadBtn from 'src/components/MainPage/UploadBtn';
import ProgressBar from 'src/components/MainPage/ProgressBar';
import ImageList from 'src/components/MainPage/ImageList';
import AnalysisPart from 'src/components/MainPage/AnalysisPart';

interface IPicResult {
    type: string;
    confidence: number;
    severity: string;
}
export interface IPic {
    fileName: string,
    fileSize: number,
    fileObject: any,
    fileResult: IPicResult,
}
interface IProps {

};
interface IStates {
    picList: IPic[];
    uploadedPer: number;
    analysisF: boolean;
    isUploading: boolean;
};

function MainHeader () {
    return (
        <div className='main_header'>
            <div className='header_icon' />
            <a href='./'>AI-COVID-19</a>
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

function MainDialog (WrappedComponent: any) {
    return (
        <div className='main_dialog'>
            <div className='dialog_inner'>
                {WrappedComponent}
            </div>
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
            fileObject: value[`${i}`],
            fileResult: undefined
        })
    }
    return list;
}
export default class MainPage extends Component<IProps,IStates>{
    // public fileInput: React.RefObject<HTMLInputElement>;
    constructor(props: IProps) {
        super(props);
        const list: IPic[] = [];
        // for (let i=0; i<20; i++) {
        //     list.push({
        //         fileName: i+'.jpg',
        //         fileSize: 0.02,
        //         fileObject: null,
        //         fileResult: {
        //             type: 'Healthy',
        //             confidence: 0.9,
        //             severity: '-'
        //         }
        //     })
        // }
        this.state = {
            picList: list,
            uploadedPer: 100,
            analysisF: false,
            isUploading: false
        }
        this.listChange = this.listChange.bind(this);
        this.picUploadFn = this.picUploadFn.bind(this);
        this.picAnalysis = this.picAnalysis.bind(this);
    }

    listChange(list: IPic[]) {
        this.setState({
            picList: list
        });
    }

    picUploadFn(value: any) {
        const list = fileHandle(value);
        this.listChange(list);
    }

    picAnalysis() {
        this.setState({
            analysisF: true,
            isUploading: true
        });
        console.log(this.state.picList);
        let param = new FormData();
        this.state.picList.forEach(item => {
            param.append('dicoms', item.fileObject);
        });
        let config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };
        axios.post('http://www.elongevity.ai/api/predict', param, config).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            this.setState({
                isUploading: false
            });
        })
    }

    render() {
        let wrappedComponent = null;
        const { analysisF, picList, uploadedPer, isUploading }= this.state;
        // const list: IPic[] = [];
        // for (let i=0; i<20; i++) {
        //     list.push({
        //         fileName: i+'.jpg',
        //         fileSize: 0.02,
        //         fileObject: null,
        //         fileResult: null
        //     })
        // }
        // let wrappedComponent = <ImageList list={list} disable={false} listFn={this.listChange}/> ;
        if ( picList.length === 0) { wrappedComponent = UploadBtn(this.picUploadFn); }
        else if ( uploadedPer !== 100) { wrappedComponent = ProgressBar('Uploading...', uploadedPer); }
        else { wrappedComponent = <ImageList list={picList} disable={analysisF} listFn={this.listChange} />; }
        // 集中上传展示上传动画
        if (isUploading) wrappedComponent = ProgressBar('Uploading...', uploadedPer);
        const startBtnSty = this.state.picList.length === 0 ? 'main_start_btn disable' : 'main_start_btn';
        return (
            <div className='main'>
                <MainHeader />
                <MainInfo />
                {MainDialog(wrappedComponent)}
                <span className='dialog_info'>* Maximum: 50 images</span>
                <div className='main_start_area'>
                    <button className={ startBtnSty }
                        onClick={this.picAnalysis}
                    >Start Analysis</button>
                </div>
                {/* {AnalysisPart(picList, 'render-result',50)} */}
                <MainFooter />
            </div>
        )
    }
}