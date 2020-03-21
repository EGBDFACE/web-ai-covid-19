import React, { Component } from 'react';
import Nav from 'src/components/RunModel/Nav';
import LoadFile from 'src/components/RunModel/LoadFile';
import RunClassifier from 'src/components/RunModel/RunClassifier';
import ShowResult from 'src/components/RunModel/ShowResult';

import 'src/views/RunModel.scss';

class RunModel extends Component {
    render() {
        return (
            <div className='model'>
                <Nav />
                <div className='model_content'>
                    <div className='model_content__line' />
                    <LoadFile />
                    <RunClassifier />
                    <ShowResult />
                </div>
            </div>
        )
    }
}

export default RunModel;