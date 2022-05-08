import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './bootstrap.min.css';
import App from './App';
import './index.css'
// import reportWebVitals from './reportWebVitals';
import store from './store';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const container = document.getElementById("root")
const root = ReactDOM.createRoot(container);

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
}

root.render(
  <Provider store={store}>
 
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>

</Provider>
)

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
