import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { RouteComponentProps } from '@reach/router'
import { CardItem } from '../components/Card'
import useApiService from '../services/useApiService'
import Loader from '../components/Loader'
import ErrorToast from '../components/ErrorToast'
import Filter from '../components/Filter'

interface PostsData {
  id: string
  title: { rendered: string }
  excerpt: { rendered: string }
  slug: string
  thumbnail: { cardHeader: string }
  race: Array<string>
}

export interface TaxonomyData {
  id: number
  slug: string
  name: string
}

const PostList: React.FC<RouteComponentProps> = () => {
  const { response, error, isLoading } = useApiService<PostsData[]>('/wp-json/wp/v2/posts')
  const { response: taxonomyResponse, error: taxonomyError } = useApiService<TaxonomyData[]>('/wp-json/wp/v2/race')
  const [sortedResults, setSortedResults] = useState<PostsData[] | null>(null)
  const [filterByRace, setFilterByRace] = useState<null | number>(null)

  useEffect(() => {
    if (filterByRace) {
      const result: PostsData[] | undefined = response?.filter((item) => Number(item.race[0]) === filterByRace)
      if (result !== undefined) setSortedResults(result)
    } else setSortedResults(response)
  }, [response, filterByRace])

  if (isLoading) return <Loader />
  if (error) return <ErrorToast errorTitle={'Error with posts fetching'} errorMessage={error.message} />
  if (taxonomyError)
    return <ErrorToast errorTitle={'Error with taxonomy fetching'} errorMessage={taxonomyError.message} />
  return (
    <React.Fragment>
      {taxonomyResponse !== null && (
        <Filter data={taxonomyResponse} filterByRace={filterByRace} setFilterByRace={setFilterByRace} />
      )}
      <Row>
        {sortedResults?.map((item: PostsData) => (
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
    </React.Fragment>
  )
}

export default PostList
