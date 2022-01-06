import React from 'react'
import { Col } from 'react-bootstrap';

function ScoopOption({name,imagePath}) {
    return (
        <Col xs={12} sm={6} md={4} lg={3} style={{textAlign:'center'}}>
            <img style={{width:"75%"}} src={`http://localhost:8080/${imagePath}`} alt={`${name} scoop`}/>
            <div>{name}</div>
        </Col>
    )
}

export default ScoopOption;
