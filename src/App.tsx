import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from './components/Menu';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';

function App() {
    const [data, setData] = useState({ data: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:8009/wp-json/wp/v2/pages?slug=accueil',
            );
            setData(result);
        };

        fetchData();



    }, []);





    console.log(data.data);
    return (

        <Container>
            <Row>


                <Col sm={ 4 } mb={ 4 }>
                    <Menu />
                    { data.data.map(item => (
                        <div>
                            <h1>{ item.title.rendered }</h1>
                            <p dangerouslySetInnerHTML={ { __html: item.content.rendered } } />
                        </div>
                    )) }

                </Col>
            </Row>
        </Container>
    );
}

export default App;
