import axios from 'axios';

const fetchAndLoadUnits = dispatch => {
    fetch(`/units`)
        .then(resp => resp.json())
        .then(units => dispatch({ type: 'ADD_UNITS', units }))
}

const fetchAndLoadUsers = dispatch => {
    fetch(`/users`)
        .then(resp => resp.json())
        .then(users => dispatch({ type: 'ADD_USERS', users }))
}

export const addUnits = () => dispatch => fetchAndLoadUnits(dispatch);
export const addUsers = () => dispatch => fetchAndLoadUsers(dispatch)

export const postNewUser = (state, history) => dispatch => {
    const body = JSON.stringify(state);
    fetch(`/users`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body
    })
        .then(resp => resp.json())
        .then(json => {
            console.log(json);
            if (json.errors) {
                dispatch({ type: 'ADD_ERRORS', errors: json.errors })
            } else {
                dispatch({ type: 'ADD_USER', user: json.user })
                history.push(`/users/${json.user.id}`)
            }
        })
}

export const register = (state, history)=> dispatch => {
    const body = JSON.stringify(state);
    fetch(`/users/create_and_login`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body
    })
        .then(resp => resp.json())
        .then(json => {
            console.log(json);
            if (json.errors) {
                dispatch({ type: 'ADD_ERRORS', errors: json.errors })
            } else {
                dispatch({ type: 'ADD_USER', user: json.user })
                dispatch({ type: 'LOGIN', user: json.user })
                localStorage.setItem('user', json.user.id);
                history.push(`/auth_user/balance`)
            }
        })
}

export const deleteUser = userId => dispatch => {
    fetch(`/users/${userId}`, { method: "DELETE" })
        .then(() => {
            fetchAndLoadUsers(dispatch);
            fetchAndLoadUnits(dispatch);        
        })
}

export const addResidency = (userId, unitId, history) => dispatch => {
    const body = JSON.stringify({ user_id: userId, unit_id: unitId })
    fetch(`/residencies`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body
    })
        .then(resp => resp.json())
        .then(json => { 
            if (json.id) {
                dispatch({ type: 'ADD_RESIDENCY', residency: json})
                history.push(`/units/${json.unit_id}`)
        }})    
}

export const deleteResidency = id => dispatch => {
    const body = JSON.stringify({ id })
    fetch(`/residencies/${id}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body
    })
        .then(resp => resp.json())
        .then(json => { if (json.id) dispatch({ type: 'REMOVE_RESIDENCY', residency: json })})   
}

export const setLoginStatus = () => dispatch => {
    axios.get(`/logged_in`, { withCredentials: true })
        .then(resp => {
            if (resp.data.id) {
                dispatch({ type: 'LOGIN', user: resp.data })
                localStorage.setItem('user', resp.data.id);
            } else {
                dispatch({ type: 'LOGOUT' })
                localStorage.setItem('user', undefined);
            }
        })
}

export const loginUser = (user, history)  => dispatch => {
    axios.post(`/login`, { user }, {withCredentials: true})
        .then(resp => {
            console.log(resp.data);
            if (resp.data.id) {
                dispatch({ type: 'LOGIN', user: resp.data })
                localStorage.setItem('user', resp.data.id);
                history.push(`/auth_user/balance`)
            } else {
                dispatch({ type: 'ADD_ERRORS', errors: resp.data.errors })
            }
        })
}

export const logoutUser = history => dispatch => {
    axios.delete(`/logout`, { withCredentials: true })
        .then(() => {
            dispatch({ type: 'LOGOUT' })
            localStorage.setItem('user', undefined);
            history.push('/');
        })
}

export const addPayment = (amount, residency_id) => dispatch => {
    axios.post(`/payments`, { amount, residency_id })
        .then(resp => {
            console.log(resp.data);
            if (resp.data.errors) {
                dispatch({ type: 'ADD_ERRORS', errors: resp.data.errors })
            } else {
                dispatch({ type: 'ADJUST_BALANCE', payment: resp.data.payment })
            }
        })
}

export const clearErrors = () => ({ type: 'CLEAR_ERRORS' });