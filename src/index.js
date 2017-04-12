import React from 'react';
import ReactDOM from 'react-dom';
import Excel from './Excel';

var headers = [
  "タイトル", "著者", "言語", "出版年", "売上部数"
];

ReactDOM.render(
  <Excel headers={headers} />,
  document.getElementById('root')
);
