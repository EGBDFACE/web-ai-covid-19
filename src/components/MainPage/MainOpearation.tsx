import React, {Component,Dispatch} from 'react';
import { IPic, fileHandle } from 'src/views/MainPage';
import { connect } from 'react-redux';
import { IStoreState } from 'src/redux/reducer';
import * as welcomeReducer from 'src/views/WelcomeRedux';
import { push } from 'connected-react-router';

interface IProps{
    list: IPic[],
    analysisTip: string,
    uploadMore?: (v:any) => void,
    clearAll?: () => void,
    goto?: (v:string) => void,
    picAnalysis?: () => void
}
interface IState{
    // isClear: boolean
}

class MainOperation extends Component<IProps,IState> {
    constructor(props: IProps){
        super(props);
    }
    render(){
        const uploadMoreRef: React.RefObject<HTMLInputElement> = React.createRef();
        const { uploadMore,list,picAnalysis,analysisTip,clearAll } = this.props; 
        return (
            <div className='main_list_operation'>
                {/* <div className='main_list_clear' 
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
                >Upload More</label> */}
                <div className='main_list_analysis_layer'/>
                <div className={'main_list_analysis'+ (list.length == 0 ?' disable':'') } 
                    onClick={() => picAnalysis()}>{analysisTip}</div>
            </div>
        )
    }
}

function mapStateToProps (state: IStoreState) {
    return {
        list: state.welcome.fileList,
    }
}
function mapDispatchToProps (dispatch: Dispatch<any>) {
    return {
        uploadMore: (v: IPic) => dispatch(welcomeReducer.actionCreator(welcomeReducer.UPLOAD_MORE, v)),
        clearAll: () => dispatch(welcomeReducer.actionCreator(welcomeReducer.CLEAR_ALL)),
        goto: (v: string) => dispatch(push(v))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MainOperation);