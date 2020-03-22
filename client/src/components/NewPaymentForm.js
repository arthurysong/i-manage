import React from 'react';

class NewPaymentForm extends React.Component {
    render() {
        return(
            <div>
                <form>
                    <label htmlFor="amount">Amount: </label>
                    <input
                        onChange={this.changeHandler} 
                        type="text"
                        id="amount"
                        name="amount"
                        placeholder="100.00"/>

                    <input type="submit" value="Submit Payment"/>
                </form>
            </div>
        )
    }
}

export default NewPaymentForm