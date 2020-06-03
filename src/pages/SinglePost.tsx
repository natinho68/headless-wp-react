import React from 'react'
import { RouteComponentProps, useParams } from '@reach/router'
import { Alert } from 'react-bootstrap'
import useApiService from '../services/useApiService'
import Loader from '../components/Loader'
import ErrorToast from '../components/ErrorToast'

interface SinglePostData {
  id: string
  content: {
    rendered: string
  }
  title: {
    rendered: string
  }
  thumbnail: {
    original: string
  }
  meta: {
    manniSponso: Array<string>
  }
}

export const SinglePost: React.FC<RouteComponentProps<any>> = () => {
  const params = useParams()
  const { response, error, isLoading } = useApiService<SinglePostData[]>(
    `/wp-json/wp/v2/posts/?slug=${params.postSlug}`
  )

  if (isLoading) return <Loader />
  if (error) return <ErrorToast errorTitle={'Error with post fetching'} errorMessage={error.message} />
  return (
    <div>
      {response?.map((item: SinglePostData) => (
        <div key={item.id}>
          <h1>{item.title.rendered}</h1>
          {item.meta.manniSponso.length > 0 && <Alert variant={'info'}>This article is sponsored</Alert>}
          <img
            alt={item.title.rendered}
            className={'mb-4'}
            style={{ width: '100%', height: 'auto' }}
            src={item.thumbnail.original}
          />
          <div dangerouslySetInnerHTML={{ __html: item.content.rendered }} />
        </div>
      ))}
    </div>
  )
}
