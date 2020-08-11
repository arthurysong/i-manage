import React from 'react';
import FormErrors from '../FormErrors';
import Button from 'react-bootstrap/Button';
import './NewPaymentForm.css';

class NewPaymentForm extends React.Component {
    state = {
        amount: ""
    }

    submitHandler = event => {
        event.preventDefault();
        const userFromUsers = this.props.users.find(user => user.id === this.props.user.id) // I need to get user from users list because I need to get residency id..
        this.props.addPayment(this.state.amount, userFromUsers.residency.id);
    }

    render() {
        return <div className="newPaymentForm">
            <form onSubmit={this.submitHandler}>
                <FormErrors />
                <input
                    onChange={e => this.setState({ amount: e.target.value })} 
                    type="text"
                    id="amount"
                    name="amount"
                    placeholder="100.00"/>&nbsp;

                <Button size="sm" variant="outline-primary" type="submit">Submit Payment</Button>
            </form>
        </div>
    }
}

export default NewPaymentForm