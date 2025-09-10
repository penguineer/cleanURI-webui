import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'github-fork-ribbon-css/gh-fork-ribbon.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <a className="github-fork-ribbon" href="https://github.com/penguineer/cleanURI" data-ribbon="Fork me on GitHub"
           title="Fork me on GitHub" rel='noopener noreferrer' target="_blank" />
        <App/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
