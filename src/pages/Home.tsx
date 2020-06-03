import { Row } from 'react-bootstrap'
import React from 'react'
import { RouteComponentProps } from '@reach/router'
import useApiService from '../services/useApiService'
import Loader from '../components/Loader'
import ErrorToast from '../components/ErrorToast'

interface HomeData {
  id: string
  title: { rendered: string }
  content: { rendered: string }
}

const Home: React.FC<RouteComponentProps> = () => {
  const { response, error, isLoading } = useApiService<HomeData[]>('/wp-json/wp/v2/pages?slug=accueil')

  if (isLoading) return <Loader />
  if (error) return <ErrorToast errorTitle={'Error on header fetching'} errorMessage={error.message} />
  return (
    <Row>
      {response?.map((item: HomeData) => (
        <div key={item.id}>
          <h1>{item.title.rendered}</h1>
          <p dangerouslySetInnerHTML={{ __html: item.content.rendered }} />
        </div>
      ))}
    </Row>
  )
}

export default Home
