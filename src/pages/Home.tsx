import { Row } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import axios from 'axios'

interface HomeData {
  id: string
  title: { rendered: string }
  content: { rendered: string }
}

const Home: React.FC<RouteComponentProps> = () => {
  const [data, setData] = useState<Array<HomeData>>([])
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const result = await axios('http://localhost:8009/wp-json/wp/v2/pages?slug=accueil')
      setData(result.data)
    }

    fetchData()
  }, [])
  return (
    <Row>
      {data?.map((item: HomeData) => (
        <div key={item.id}>
          <h1>{item.title.rendered}</h1>
          <p dangerouslySetInnerHTML={{ __html: item.content.rendered }} />
        </div>
      ))}
    </Row>
  )
}

export default Home
