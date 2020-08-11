import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './UnitsList.css'

const UnitsList = ({ history, units}) => {
    return (
        <ListGroup>
            {units.map(unit => <div key={unit.id}> 
                <ListGroup.Item action onClick={() => history.push(`/units/${unit.id}`)}>
                    #{unit.unit_number} 
                    {unit.resident ? <>- {unit.resident.first_name} {unit.resident.last_name}</>
                                : <>- <span className="text-info">Vacant</span></>}
                </ListGroup.Item> 
            </div>)}
        </ListGroup>
    )
}

export default UnitsList