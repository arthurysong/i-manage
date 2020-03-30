import React from 'react';
import UsersList from './UsersList';
import NewUserForm from './NewUserForm';
import UserShow from './UserShow';
import { Link, Switch, Route } from 'react-router-dom';
import { Jumbotron, Col, Row, Button } from 'react-bootstrap';

class UsersContainer extends React.Component {
    componentDidMount(){ //need this one when users have been loaded already, and onmount we need to redirect
        if (this.props.users[0] !== undefined && this.props.history.location.pathname === '/users') {
            this.props.history.push(`/users/${this.props.users[0].id}`)
        }
    }

    componentDidUpdate(){ //need both because initial loading of users will not have users loaded into props
        if (this.props.users[0] !== undefined && this.props.history.location.pathname === '/users') {
            this.props.history.push(`/users/${this.props.users[0].id}`)
        }
    }

    render() {
        return(
            <div>
                {/* {console.log('in userscontainer', this.props.users[1], this.props.history.location.pathname)} */}
                <Jumbotron id="user-container">
                    <Row>
                        <Col md="auto">
                            <UsersList users={this.props.users} history={this.props.history}/>
                        </Col>
                        <Col>
                            <Switch>
                                <Route path={`/users/new`} render={routerProps => 
                                    <NewUserForm 
                                        {...routerProps} 
                                        errors={this.props.errors}
                                        user={this.props.user}
                                        users={this.props.users} 
                                        addUser={this.props.addUser}
                                        isLoggedIn={this.props.isLoggedIn}
                                        isManager={this.props.user.manager_status}
                                        clearErrors={this.props.clearErrors}/>}/>
                                <Route path={`/users/:userId`} render={routerProps => 
                                    <UserShow 
                                        {...routerProps} 
                                        users={this.props.users} 
                                        deleteUser={this.props.deleteUser}/>}/>
                            </Switch>
                        </Col>
                    </Row>
                </Jumbotron>
            </div>
        )
    }

}

export default UsersContainer;