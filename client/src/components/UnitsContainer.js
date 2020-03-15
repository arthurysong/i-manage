import React from 'react';
import UnitsList from './UnitsList';
import UnitShow from './UnitShow';
import { Route } from 'react-router-dom';
import NewResidentForm from './NewResidentForm';

const UnitsContainer = ({ match, units, usersWithoutResidency, addResidency, deleteResidency }) => {
    
    return(
        <div>
            {/* {console.log(units)} */}
            <UnitsList units={units} />
            <Route path={`${match.url}/:unitId`} 
                render={routerProps => <UnitShow {...routerProps} units={units} deleteResidency={deleteResidency}/>}/>
                
            <Route path={`${match.url}/:unitId/residents/new`} render={routerProps => 
                <NewResidentForm 
                    {...routerProps} 
                    addResidency={addResidency}
                    usersWithoutResidency={usersWithoutResidency}/>}/>
        </div>
    )
}

export default UnitsContainer;