import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GitHubForkRibbon from 'react-github-fork-ribbon';

const GitHubForkRibbon = () => (
  <GitHubForkRibbon href="https://github.com/penguineer/cleanURI-webui"
                    target="_blank"
                    position="right"
                    color="green">
    Fork me on GitHub
  </GitHubForkRibbon>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GitHubForkRibbon />,
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
