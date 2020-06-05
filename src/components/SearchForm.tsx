import { Button, Form, FormControl } from 'react-bootstrap'
import React, { ChangeEvent, useState } from 'react'
import { navigate } from '@reach/router'

const SearchForm: React.FC = () => {
  const [search, setSearch] = useState('')
  return (
    <Form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault()
        navigate(`/search/${search}`)
        setSearch('')
      }}
      className={'my-2 my-lg-0'}
      inline
    >
      <FormControl
        value={search}
        type="text"
        placeholder="Recherche"
        className="mr-sm-2"
        onChange={(e: ChangeEvent<any>) => setSearch(e.target.value)}
      />
      <Button type="submit" variant="light" className="my-2 my-sm-0">
        Search
      </Button>
    </Form>
  )
}

export default SearchForm
