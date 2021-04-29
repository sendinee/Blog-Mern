import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './router/AppRouter';
import { Provider} from 'react-redux';
import store from './store/configureStore';

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById('root')
);