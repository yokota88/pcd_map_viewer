import React, { useState, useRef } from 'react'
import { useAsyncCallback } from 'react-async-hook'
import Box from '@mui/material/Box'
import CircularIntegration from './CircularIntegration';
import { useContext } from "react";
import { PcdFilePropsContext } from "./components/providers/PcdFilePropsProvider";

const PcdLoadUI = (props) => {
  const {pcdProps, setPcdProps} = useContext(PcdFilePropsContext);
  const inputRef = useRef(null)
  const [success, setSuccess] = useState(false)

  const uploadFile = async(file) => {
    if (!file) return
    setPcdProps({file:file, max_height:1, min_height:0});
    setSuccess(true)
  }

  const onFileInputChange = async (event) => {
    const file = event.target.files[0]
    await uploadFile(file)
  }

  const clickFileUploadButton = () => {
    setSuccess(false)
    inputRef.current.click()
  }

  const asyncEvent = useAsyncCallback(onFileInputChange);

  return (
    <Box sx={{marginTop: '0px', display: 'inline-block'}}>
      <CircularIntegration
        onClick={clickFileUploadButton}
        asyncEvent={asyncEvent}
        // success={success}
        component="label"
        text={asyncEvent.loading ? '...' : props.name}
      />
      <input
        hidden
        accept="*.pcd"
        ref={inputRef}
        type="file"
        onChange={asyncEvent.execute}
      />
    </Box>
  )
}

export default PcdLoadUI