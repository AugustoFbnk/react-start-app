import React, { Component } from 'react';
import getAll from './../../Services/S3Services'
import GLTFComponent from '../../Components/GLTFComponent';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urls: []
        }
    }

    componentDidMount() {
        this._asyncRequest = getAll().then((urls) => {
            this._asyncRequest = null;
            this.setState({ urls: [urls] })
        });
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }

    render() {
        if (this.state.urls === null) {
            return <div></div>
        } else {
            return (
                <ul>
                    {this.state.urls.map(url =>
                        <li key={url}>
                            <GLTFComponent
                                url={url}
                                clientWidth="400"
                                clientHeight="350">
                            </GLTFComponent>
                        </li>)}
                </ul>
            );
        }
    }
}

export default Main;