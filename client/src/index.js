import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MainPage from './MainPage';
import * as serviceWorker from './serviceWorker';

const RouterComp = () => (
    <Router>
        <Route path="/default" exact component={App} />
        <Route path="/" exact component={MainPage} />
    </Router>
);

ReactDOM.render(<RouterComp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
