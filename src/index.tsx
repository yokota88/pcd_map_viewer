import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignIn from './SignIn';
import RangeSlider from './RangeSlider';
import reportWebVitals from './reportWebVitals';
import FileUploadUI from './FileUploadUI';
import BasicTabs from './BasicTabs';
import PcdCanvas from './PcdCanvas';

ReactDOM.render(
  <React.StrictMode>
    <BasicTabs />
    <PcdCanvas />
    {/* <RangeSlider />
    <RangeSlider /> */}
    {/* <FileUploadUI /> */}
    {/* <SignIn /> */}
  </React.StrictMode>,
  document.getElementById('root')
);
