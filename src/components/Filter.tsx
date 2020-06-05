import React, { ChangeEvent, Dispatch, useState } from 'react'
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap'
import { TaxonomyData } from '../pages/PostList'

interface FilterProps {
  data: Array<TaxonomyData>
  setFilterByRace: Dispatch<React.SetStateAction<number | null>>
  filterByRace: null | number
}

const Filter: React.FC<FilterProps> = ({ data, filterByRace, setFilterByRace }) => {
  const [name, setName] = useState<string>('')
  const [radioValue, setRadioValue] = useState<null | number>(null)

  return (
    <div className={'mb-4'}>
      {filterByRace !== null && <h1 className={'mb-4'}>Filter: {name}</h1>}
      <ButtonGroup toggle>
        {data?.map((item) => (
          <ToggleButton
            key={item.id}
            type="radio"
            variant="light"
            name="radio"
            value={item.id}
            checked={radioValue === item.id}
            onChange={(e: ChangeEvent<any>) => {
              setRadioValue(e.currentTarget.value)
              setFilterByRace(item.id)
              setName(item.name)
            }}
          >
            {item.name}
          </ToggleButton>
        ))}
      </ButtonGroup>

      {filterByRace !== null && (
        <Button className={'ml-2'} variant={'outline-primary'} onClick={() => setFilterByRace(null)}>
          Remove filters
        </Button>
      )}
    </div>
  )
}

export default Filter
