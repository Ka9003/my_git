import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App4';
import reportWebVitals from './reportWebVitals';

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'https://placekitten.com/g/64/64',
  },
};
ReactDOM.render(
  <App
    date={comment.date}
    text={comment.text}
    author={comment.author}
  />,
  document.getElementById('root')
);


reportWebVitals();
