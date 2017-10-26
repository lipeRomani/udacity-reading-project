import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reducer from './reducers'
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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
