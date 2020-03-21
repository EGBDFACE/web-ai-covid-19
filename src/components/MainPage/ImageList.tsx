import React, { useState } from 'react';
import { IPic, fileHandle } from 'src/views/MainPage';
import './ImageList.scss';

interface IWrapPic extends IPic {
    fileSelect: boolean;
}
interface IProps {
    list: IPic[];
    listFn: (v:IPic[]) => void;
    disable: boolean;
}
interface IStates {
    wrapList: IWrapPic[];
    selectNum: number;
}
function ImageItem (imageObj: IWrapPic,index: number, handleSelect: Function) {
    const imageSty = imageObj.fileSelect ? 'image_preview image_preview_select' : 'image_preview' ;
    const shortName = imageObj.fileName.length > 10 ? imageObj.fileName.slice(0,2)+'...'+imageObj.fileName.slice(-5) : imageObj.fileName;
    return (
        <div className='image_item' key={index}>
            <i className={imageSty} onClick={() => handleSelect(index)}/>
            <p>Image {shortName} </p>
            <p>File size: {imageObj.fileSize} MB </p>
        </div>
    )
}

export default class ImageList extends React.Component<IProps, IStates> {
    constructor(props: IProps){
        super(props);
        this.state = {
            wrapList: props.list.map(v => {
                return {
                    ...v,
                    fileSelect: false
                }
            }),
            selectNum: 0
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleListChange = this.handleListChange.bind(this);
    }

    UNSAFE_componentWillReceiveProps(newProps:IProps) {
        this.setState({
            wrapList: newProps.list.map(v => {
                return {
                    ...v,
                    fileSelect: false
                }
            })
        });
    }
    handleSelect (index: number) {
        let newWrapList = this.state.wrapList;
        newWrapList[index].fileSelect = !newWrapList[index].fileSelect;
        let totalNumber = this.state.selectNum;
        if (newWrapList[index].fileSelect) { totalNumber+=1; }
        else { totalNumber -= 1; }
        this.setState({
            wrapList: newWrapList,
            selectNum: totalNumber
        });
    }

    handleListChange (label: string, value?: any) {
        const { list, listFn } = this.props;
        const { wrapList } = this.state;
        switch(label) {
            case 'clear':
                listFn([]);
                break;
            case 'delete':
                const newList: IPic[] = wrapList.filter(v => !v.fileSelect).map( v => {
                    return {
                        fileName: v.fileName,
                        fileObject: v.fileObject,
                        fileSize: v.fileSize,
                        fileResult: v.fileResult
                    }
                });
                console.log('delete',newList);
                listFn(newList);
                break;
            case 'add':
                const addList: IPic[] = list.concat(fileHandle(value));
                listFn(addList);
                break;
        }
    }

    render() {
        const { disable } = this.props;
        const { wrapList,selectNum } = this.state;
        const uploadMoreRef: React.RefObject<HTMLInputElement> = React.createRef();
        const areaSty = disable ? 'image_list_area disable' : 'image_list_area';
        const deleteSty = selectNum === 0 ? 'list_delete disable' : 'list_delete';
        return (
            <div className={ areaSty }>
                <div className='image_list'>
                    {wrapList.map( (value: IWrapPic,index: number) => {
                        return ImageItem(value,index,this.handleSelect);
                    })}
                </div>
                <div className='image_list_operation'>
                    <div className='list_clear_all'
                        onClick= {() => this.handleListChange('clear')}>
                        <i />
                        <p>Clear All</p>
                    </div>
                    <div className= { deleteSty }
                        onClick= {() => this.handleListChange('delete') }>
                        <i />
                        <p>Delete</p>
                    </div>
                    <input type='file' accept='image/*'
                        name='list_upload_more' 
                        id='list_upload_more' 
                        multiple 
                        ref={uploadMoreRef}
                        onChange= { () => this.handleListChange('add',uploadMoreRef.current.files) }
                    />
                    <label className='list_upload_more'
                        htmlFor='list_upload_more'>
                        <i />
                        <p>Upload More</p>
                    </label>
                </div>
            </div>
        )
    }
}