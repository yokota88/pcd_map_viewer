import React, { useState, useRef } from 'react'
import { useAsyncCallback } from 'react-async-hook'
import Box from '@mui/material/Box'
import CircularIntegration from './CircularIntegration';

const initialState = {
  file: null,
}

const FileUploadUI = (props) => {
  const inputRef = useRef(null)
  const [formState, setFormState] = useState(initialState)
  const [success, setSuccess] = useState(false)

  const uploadFile = async(file) => {
    if (!file) return

    /* アップロード処理に見立てた時間のかかる処理 */
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    await sleep(5000)

    /* アップロード処理が成功したらフォームの状態を
       初期化してsuccessステートをtrueにする */
    setFormState(initialState)
    setSuccess(true)
  }

  const onFileInputChange = async (event) => {
    const file = event.target.files[0]
    console.log(file)
    await uploadFile(file)
    console.log('Loaded')
  }

  const clickFileUploadButton = () => {
    setSuccess(false)
    inputRef.current.click()
  }

  const asyncEvent = useAsyncCallback(onFileInputChange);

  return (
    <Box sx={{marginTop: 0, display: 'inline-block'}}>
      <CircularIntegration
        onClick={clickFileUploadButton}
        asyncEvent={asyncEvent}
        success={success}
        component="label"
        text={asyncEvent.loading ? '...' : props.name}
      />
      <input
        hidden
        ref={inputRef}
        type="file"
        onChange={asyncEvent.execute}
      />
    </Box>
  )
}

export default FileUploadUI