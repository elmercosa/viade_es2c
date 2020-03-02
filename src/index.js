import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TimeLine from "./pages/Timeline";
import Route from "./pages/Route";
import UserDetails from "./pages/UserDetails";
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(<UserDetails />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
