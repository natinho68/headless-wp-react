import React from 'react'
import useApiService from '../services/useApiService'
import { PostsData } from './PostList'
import Loader from '../components/Loader'
import ErrorToast from '../components/ErrorToast'
import { Col, Row } from 'react-bootstrap'
import { CardItem } from '../components/Card'

const SearchResult: React.FC<any> = ({ search }) => {
  const { response, error, isLoading } = useApiService<PostsData[]>(`/wp-json/wp/v2/posts?search=${search}`)

  if (isLoading) return <Loader />
  if (error) return <ErrorToast errorTitle={'Error with search posts fetching'} errorMessage={error.message} />
  if (!response?.length) return <h1>Aucun résultat pour votre recherche</h1>
  return (
    <>
      <h1 className={'mb-3'}>Résultat de recherche pour: {search}</h1>
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
    </>
  )
}

export default SearchResult
