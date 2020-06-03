import { Spinner } from 'react-bootstrap'
import React from 'react'

const Loader: React.FC = () => {
  return (
    <div className="loader-position d-flex justify-content-center">
      <Spinner animation={'grow'} className={'text-primary mr-2'}>
        <span className="sr-only">Loading...</span>
      </Spinner>
      <Spinner animation={'grow'} className={'text-success mr-2'}>
        <span className="sr-only">Loading...</span>
      </Spinner>
      <Spinner animation={'grow'} className={'text-warning mr-2'}>
        <span className="sr-only">Loading...</span>
      </Spinner>
      <Spinner animation={'grow'} className={'text-danger mr-2'}>
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loader
