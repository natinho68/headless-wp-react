import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface MenuData {
  title: string
  ID: string
}

const Menu: React.FC = () => {
  const [data, setData] = useState<Array<MenuData>>([])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const result = await axios('http://localhost:8009/wp-json/wp-utils/menus')
      setData(result.data)
    }

    fetchData()
  }, [])

  return (
    <div>
      <ul>
        {data?.map((item: MenuData) => (
          <li id={item.ID} key={item.ID}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Menu
