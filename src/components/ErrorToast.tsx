import { Toast } from 'react-bootstrap'
import React, { useState } from 'react'

interface ErrorToastProps {
  errorTitle: string
  errorMessage: string
}

const ErrorToast: React.FC<ErrorToastProps> = ({ errorTitle, errorMessage }) => {
  const [showError, setShowError] = useState(true)
  return (
    <>
      <Toast show={showError} onClose={() => setShowError(!showError)}>
        <Toast.Header className={'bg-danger text-white'}>
          <strong className="mr-auto">{errorTitle}</strong>
        </Toast.Header>
        <Toast.Body className={'text-danger'}>{errorMessage}</Toast.Body>
      </Toast>
    </>
  )
}
export default ErrorToast
