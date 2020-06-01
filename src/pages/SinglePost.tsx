import React, { useEffect, useState } from 'react'
import { RouteComponentProps, useParams } from '@reach/router'
import axios from 'axios'
import { Alert } from 'react-bootstrap'

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
  const [data, setData] = useState<Array<SinglePostData>>([])

  const params = useParams()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const result = await axios(`http://localhost:8009/wp-json/wp/v2/posts/?slug=${params.postSlug}`)
      setData(result.data)
    }

    fetchData()
  }, [params.postSlug])

  return (
    <div>
      {data?.map((item: SinglePostData) => (
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
