import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { RouteComponentProps } from '@reach/router'
import { CardItem } from '../components/Card'
import useApiService from '../services/useApiService'
import Loader from '../components/Loader'
import ErrorToast from '../components/ErrorToast'

interface PostsData {
  id: string
  title: { rendered: string }
  excerpt: { rendered: string }
  slug: string
  thumbnail: { cardHeader: string }
}

const PostList: React.FC<RouteComponentProps> = () => {
  const { response, error, isLoading } = useApiService<PostsData[]>('/wp-json/wp/v2/posts')

  if (isLoading) return <Loader />
  if (error) return <ErrorToast errorTitle={'Error with posts fetching'} errorMessage={error.message} />
  return (
    <Row>
      {response?.map((item: PostsData) => (
        <Col key={item.id} sm={4} className="mb-4">
          <CardItem
            ID={item.id}
            title={item.title.rendered}
            excerpt={item.excerpt.rendered}
            slug={item.slug}
            thumbnail={item.thumbnail.cardHeader}
          />
        </Col>
      ))}
    </Row>
  )
}

export default PostList
