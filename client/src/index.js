//Connect the react application into the index.html file

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'; //to perform Asynchronous actions
import reducers from './reducers';
import App from './App';
import './index.css'; //Importing style sheet


const store = createStore(reducers, compose(applyMiddleware(thunk)) )

//Rendering into the DOM
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


