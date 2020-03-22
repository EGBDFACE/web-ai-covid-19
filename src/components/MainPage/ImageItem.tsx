import React, { useState } from 'react';
import { IPic, fileHandle } from 'src/views/MainPage';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneFileImageLoader from 'cornerstone-file-image-loader';
import './ImageItem.scss';
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
        cornerstone.enable(element);
        var index = cornerstoneFileImageLoader.addFile(this.props.imageObj.fileObject);
        var imageId = "dicomfile://" + index;
        cornerstone.loadImage(imageId).then(function(image) {
            cornerstone.displayImage(element, image);
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