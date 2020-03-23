import React, { useState } from 'react';
import { IPic, fileHandle } from 'src/views/MainPage';
import './ImageItem.scss';

declare const window: any;

interface IWrapPic extends IPic {
    fileSelect: boolean;
}
interface ItemProps {
    imageObj: IWrapPic;
    index: number;
    handleSelect: Function
}

export default class ImageItem extends React.Component<ItemProps> {
    constructor(props: ItemProps){
        super(props);
        console.log(props);
    }

    handleSelect(index: number) {
        this.props.handleSelect.bind(this, index);
    }

    componentDidMount() {
        const element = this.refs.imagePreview;
        window.cornerstone.enable(element);
        var index = window.cornerstoneFileImageLoader.addFile(this.props.imageObj.fileObj);
        // cornerstone.enable(element);
        // console.log(cornerstone);
        // console.log(cornerstoneFileImageLoader);
        // console.log(this.props.imageObj);
        // let index = cornerstoneFileImageLoader.addFile(this.props.imageObj.fileObj);
        var imageId = "dicomfile://" + index;
        window.cornerstone.loadImage(imageId).then(function(image: any) {
            window.cornerstone.displayImage(element, image);
        });
    }

    render() {
        const {imageObj, index} = this.props;
        const imageSty = imageObj.fileSelect ? 'image_preview image_preview_select' : 'image_preview' ;
        const shortName = imageObj.fileName.length > 10 ? imageObj.fileName.slice(0,2)+'...'+imageObj.fileName.slice(-5) : imageObj.fileName;
        return (
            <div className='image_item'>
                <div className={imageSty} onClick={() => this.handleSelect(index)} ref="imagePreview"></div>
                <p>Image {shortName} </p>
                <p>File size: {imageObj.fileSize} MB </p>
            </div>
        );
    }
}