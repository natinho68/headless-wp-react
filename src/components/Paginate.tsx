import { Pagination } from 'react-bootstrap'
import React, { Dispatch } from 'react'

interface PaginateProps {
  totalPage: number | null
  setPage: Dispatch<React.SetStateAction<number | null>>
  currentPage: number
  filter: Dispatch<React.SetStateAction<number | null>>
}

const Paginate: React.FC<PaginateProps> = ({ filter, totalPage, setPage, currentPage }) => {
  const items = []
  if (totalPage !== null)
    for (let number = 1; number <= totalPage; number++)
      items.push(
        <Pagination.Item
          key={number}
          onClick={() => {
            setPage(number)
            filter(null)
          }}
          active={number === currentPage}
        >
          {number}
        </Pagination.Item>
      )

  return <Pagination>{items}</Pagination>
}

export default Paginate
