import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Menu() {
    const [data, setData] = useState({ data: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:8009/wp-json/wp-utils/menus',
            );
            setData(result);
        };

        fetchData();
    }, []);

    return (






        <div>

            <ul>
                { data.data.map(item => (

                    <li id={ item.ID } key={ item.ID }>
                        { item.title }
                        { item.child_items &&
                        <ul>
                            { item.child_items.map(childItem => (
                                <li>{ childItem.title }</li>
                            )) }
                        </ul>
                        }
                    </li>
                )) }
            </ul>

        </div>
    );
}

export default Menu;
