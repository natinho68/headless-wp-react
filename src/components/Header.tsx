import React from 'react'
import { Navbar, NavItem } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import { Link } from '@reach/router'
import useApiService from '../services/useApiService'
import ErrorToast from './ErrorToast'
import SearchForm from './SearchForm'

interface NavigationData {
  title: string
  ID: string
  post_excerpt: string
}

interface SiteData {
  name: string
}

const Header: React.FC = () => {
  const { response, error } = useApiService<NavigationData[]>('/wp-json/wp-utils/menus')
  const siteNameQuery = useApiService<SiteData>('/wp-json')
  const siteName = siteNameQuery.response

  if (error) return <ErrorToast errorTitle={'Error with header fetching'} errorMessage={error.message} />
  if (response && siteName)
    return (
      <Navbar bg="primary" expand="lg" className="navbar-dark mb-4">
        <Link to={'/'}>
          <Navbar.Brand>{siteName.name}</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {response.map((item: NavigationData) => (
              <NavItem key={item.ID}>
                <Link className="nav-link" to={item.post_excerpt}>
                  {item.title}
                </Link>
              </NavItem>
            ))}
          </Nav>
          <SearchForm />
        </Navbar.Collapse>
      </Navbar>
    )
  else return null
}

export default Header
