import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BasicTabs from './BasicTabs';
import PcdCanvas from './PcdCanvas';
import {PcdFilePropsProvider} from './components/providers/PcdFilePropsProvider';

ReactDOM.render(
  <React.StrictMode>
    <PcdFilePropsProvider>
      <BasicTabs />
      <PcdCanvas />
    </PcdFilePropsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
