import React, { Component } from 'react';

import topImage from '../../static/image/MainPage/top.jpg';


class MainPage extends Component {
    render() {
        return (
            <div>
                MainPage
                <img src={topImage} />
            </div>
        );
    }
}

export default MainPage;