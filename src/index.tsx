import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignIn from './SignIn';
import RangeSlider from './RangeSlider';
import reportWebVitals from './reportWebVitals';
import FileUploadUI from './FileUploadUI';
import BasicTabs from './BasicTabs';

ReactDOM.render(
  <React.StrictMode>
    <BasicTabs />
    {/* <RangeSlider />
    <RangeSlider /> */}
    {/* <FileUploadUI /> */}
    {/* <SignIn /> */}
  </React.StrictMode>,
  document.getElementById('root')
);
