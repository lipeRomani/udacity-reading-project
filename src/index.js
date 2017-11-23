import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reducer from './reducers'
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {logger} from 'redux-logger';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk, logger)
    )
)

ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </MuiThemeProvider>
    </BrowserRouter>
    , 
        document.getElementById('root'));
registerServiceWorker();
