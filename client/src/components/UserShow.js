import React from 'react';
import { returnFormattedDate, calculateBalance } from '../utilities/utilityFunctions';

const UserShow = ({ match, users, deleteUser, history }) => {
    const user = users.find(user => user.id === Number(match.params.userId));

    const renderResidencyInfo = () => {
        if (user.residency !== undefined) {
            return (
                <p>
                    Resident since {returnFormattedDate(user.residency.start_date)}<br/>
                    Balance: ${calculateBalance(user.residency, user.unit.rent_cost_per_month)}<br/>
                    Unit {user.unit.unit_number}<br/>
                </p>
            )
        }
    }

    const clickHandler = () => {
        deleteUser(user.id);
        history.push('/users')
        // window.location.href='/users';
    }

    return (
        <div>
            {console.log('in user show', user, users)}
            <h3>{user.first_name} {user.last_name}</h3>
            <p>
                {user.email}<br/>
                {user.phone_number}
            </p>
            {renderResidencyInfo()}
            
            <button onClick={clickHandler}>Delete User</button>
        </div>
    )
}

export default UserShow;