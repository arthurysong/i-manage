import React from 'react';
import UsersList from './UsersList';
import UserShow from './UserShow';
import { Route } from 'react-router-dom';

const UsersContainer = ({ match, users }) => {
    return(
        <div>
            {/* {console.log(this.props.users)} */}
            <UsersList users={users} />
            <Route path={`${match.url}/:userId`} 
                render={routerProps => <UserShow {...routerProps} users={users}/>}/>
        </div>
    )

}

export default UsersContainer;