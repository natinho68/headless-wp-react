import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Menu from './components/Menu'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Container, Row } from 'react-bootstrap'

interface HomeData {
  ID: string
  title: { rendered: string }
  content: { rendered: string }
}

const App: React.FC = () => {
  const [data, setData] = useState<Array<HomeData>>([])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const result = await axios('http://localhost:8009/wp-json/wp/v2/pages?slug=accueil')
      setData(result.data)
    }

    fetchData()
  }, [])

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <Menu />
          {data?.map((item: HomeData) => (
            <div key={item.ID}>
              <h1>{item.title.rendered}</h1>
              <p dangerouslySetInnerHTML={{ __html: item.content.rendered }} />
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  )
}

export default App
