import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Form, FormControl, Navbar, NavItem } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import { Link } from '@reach/router'

interface NavigationData {
  title: string
  ID: string
  post_excerpt: string
}

const Header: React.FC = () => {
  const [data, setData] = useState<Array<NavigationData>>([])
  const [siteName, setSiteName] = useState<Array<any>>([])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const result = await axios('http://localhost:8009/wp-json/wp-utils/menus')
      const site = await axios('http://localhost:8009/wp-json/')
      setSiteName(site.data.name)
      setData(result.data)
    }

    fetchData()
  }, [])

  return (
    <Navbar bg="primary" expand="lg" className="navbar-dark mb-4">
      <Link to={'/'}>
        <Navbar.Brand>{siteName}</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {data?.map((item: NavigationData) => (
            <NavItem key={item.ID}>
              <Link className="nav-link" to={item.post_excerpt}>
                {item.title}
              </Link>{' '}
            </NavItem>
          ))}
        </Nav>
        <Form className={'my-2 my-lg-0'} inline>
          <FormControl type="text" placeholder="Recherche" className="mr-sm-2" />
          <Button variant="light" className="my-2 my-sm-0">
            Rechercher
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
