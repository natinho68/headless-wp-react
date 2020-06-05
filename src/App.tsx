import React from 'react'
import Header from './components/Header'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { RouteComponentProps, Router } from '@reach/router'
import PostList from './pages/PostList'
import Home from './pages/Home'
import { SinglePost } from './pages/SinglePost'
import SearchResult from './pages/SearchResults'

const App: React.FC<RouteComponentProps> = () => {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <Router>
          <Home path={'/'} />
          <PostList path={'/nos-chiens'} />
          <SinglePost path={'/:postSlug'} />
          <SearchResult path={'/search/:search'} />
        </Router>
      </Container>
    </React.Fragment>
  )
}

export default App
