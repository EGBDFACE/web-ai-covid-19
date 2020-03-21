import React from 'react';
import { IPic } from 'src/views/MainPage';
import ProgressBar from 'src/components/MainPage/ProgressBar';
import './AnalysisPart.scss';

function AnalysisProgress (progress: number) {
    return (
        <div className='analysis_progress'>
            {ProgressBar('Analysing...',progress)}
        </div>
    )
}

function AnalysisedItem (item: IPic) {
    // console.log(item);
    let typeFontColorSty, severityFontColorSty = null;
    switch(item.fileResult.type){
        case 'Healthy':
            typeFontColorSty = {color: '#417505'};
            break;
        case 'Bacterial':
            typeFontColorSty = {color: '#9013FE'};
            break;
        case 'non-COVID-19 viral':
            typeFontColorSty = {color: '#F5A623'};
            break;
        case 'COVID19':
            typeFontColorSty = {color: '#D0021B'};
            if (item.fileResult.severity === 'Severe') {
                severityFontColorSty = { color: '#D0021B' };
            }else if (item.fileResult.severity === 'Medium') {
                severityFontColorSty = { color: 'F5A623' };
            }
            break;
    }
    return (
        <div className='result_item'>
            <div className='result_item_image'>
                <i />
                <p>Image {item.fileName} </p>
            </div>
            <p className='result_item_type' style={typeFontColorSty}>{item.fileResult.type}</p>
            <p className='result_item_confidence'> {item.fileResult.confidence} </p>
            <p className='result_item_severity' style={severityFontColorSty}> {item.fileResult.severity} </p>
        </div>
    )
}
function AnalysisResult (list: IPic[]) {
    function download(){
        let link = document.createElement('a');
        let resultStr = '';
        list.forEach(v => {
            resultStr += v.fileName 
                + ' : '
                + v.fileResult.type
                + ', ' 
                + v.fileResult.confidence
                +';\n'; 
        })
        let blob = new Blob([resultStr])
        link.download = 'result';
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return (
        <div className='analysis_result'>
            <div className='result_header'>
                <span>CT Images</span>
                <span>Type</span>
                <span>Confidence</span>
                <span>Severity</span>
            </div>
            {list.map(v => {
                return AnalysisedItem(v);
            })}
            <div className='result_operation'>
                <div className='result_operation_startover'>
                    <i />
                    <p>Start Over</p>
                </div>
                <div className='result_operation_download'
                    onClick={download}
                    >
                    <i />
                    <p>Download</p>
                </div>
            </div>
        </div>
    )
}

export default function AnalysisPart(list: IPic[], renderTag: string, progress: number) {
    if (renderTag === 'no-render') return null;
    let wrappedComponent = null;
    if (renderTag === 'progress') { wrappedComponent = AnalysisProgress(progress)}
    else if ( renderTag === 'render-result') { wrappedComponent = AnalysisResult(list)}
    return (
        <div className='main_analysis'>
            <p className='analysis_header'>Analysis Result</p>
            { wrappedComponent }
        </div>
    )
}   