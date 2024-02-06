// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
//
// import './index.css';
// import App from './App.js';
// import store from "./store";
//
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <Provider store={store}>
//     <App />
//     </Provider>
// );


import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);