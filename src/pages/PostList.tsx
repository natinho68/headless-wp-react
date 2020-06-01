import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Row } from 'react-bootstrap'
import { RouteComponentProps } from '@reach/router'
import { CardItem } from '../components/Card'

interface PostsData {
  id: string
  title: { rendered: string }
  excerpt: { rendered: string }
  slug: string
  thumbnail: { cardHeader: string }
}

const PostList: React.FC<RouteComponentProps> = () => {
  const [data, setData] = useState<Array<PostsData>>([])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const result = await axios('http://localhost:8009/wp-json/wp/v2/posts')
      setData(result.data)
    }

    fetchData()
  }, [])

  return (
    <Row>
      {data?.map((item: PostsData) => (
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
