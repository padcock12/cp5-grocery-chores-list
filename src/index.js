import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div class='total-container'>
  <div class='menu-container'>
      <div class='menu'>
        <div class='date'>Grocery List</div>
        <div class='links'>
        <div class='signup'><a href="https://parkeradcock.com/cp5-groceries/chores-list/build/">Chores List</a></div>
        </div>
      </div>
    </div>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  <div class="githubLink">
    <a href="https://github.com/padcock12/cp4-wedding-list.git" class="gitHubText">Click here to go to my GitHub Repository</a>
  </div>
  </div>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
