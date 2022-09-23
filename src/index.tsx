import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignIn from './SignIn';
import RangeSlider from './RangeSlider';
import reportWebVitals from './reportWebVitals';
import FileUploadUI from './FileUploadUI';
import BasicTabs from './BasicTabs';
import PcdCanvas from './PcdCanvas';
import {PcdFilePropsProvider} from './components/providers/PcdFilePropsProvider';

ReactDOM.render(
  <React.StrictMode>
    <PcdFilePropsProvider>
      <BasicTabs />
      <PcdCanvas />
    </PcdFilePropsProvider>
    {/* <RangeSlider />
    <RangeSlider /> */}
    {/* <FileUploadUI /> */}
    {/* <SignIn /> */}
  </React.StrictMode>,
  document.getElementById('root')
);
