import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCharge, fetchCustomer } from '../actions';
import './styles.css';

class StripeInfo extends Component {

    componentDidMount() {
        const { fetchCharge, fetchCustomer } = this.props;
        fetchCharge();
        fetchCustomer();
    }

    getTotalAmount(charges) {
        let total = 0;
        if (charges && charges.length > 0) {
            charges.forEach(charge => {
                total += charge.amount;
            });
        } 
        return total;
    }

    render() {
        const {charges = [], customers = []} = this.props;
        const totalAmount = this.getTotalAmount(charges);
        return (
            <Fragment>
            <h2>Customers</h2>
            <table className="tg">
                <thead>
                    <tr>
                        <th className="tg-0pky">Name</th>
                        <th className="tg-0pky">Email</th>
                        <th className="tg-0pky">Description</th>
                        <th className="tg-0pky">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers.map((customer) => {
                            return (
                                <tr key={customer.id}>
                                    <td className="tg-0pky">{customer.name}</td>
                                    <td className="tg-0pky">{customer.email}</td>
                                    <td className="tg-0pky">{customer.description}</td>
                                    <td className="tg-0pky">{(customer.balance/100).toFixed(2)}</td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td className="tg-0pky"></td>
                        <td className="tg-0pky"></td>
                        <td className="tg-0pky"></td>
                        <td className="tg-0pky"></td>
                    </tr>
                </tbody>
            </table>
            <h2>Charges</h2>
            <table className="tg">
                <thead>
                    <tr>
                        <th className="tg-0pky">Billing name</th>
                        <th className="tg-0pky">Description</th>
                        <th className="tg-0pky">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        charges.map((charge) => {
                            return (
                                <tr key={charge.id}>
                                    <td className="tg-0pky">{charge.billing_details.name}</td>
                                    <td className="tg-0pky">{charge.description}</td>
                                    <td className="tg-0pky">{(charge.amount/100).toFixed(2)}</td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td className="tg-0pky"></td>
                        <td className="tg-0pky"></td>
                        <td className="tg-0pky">{(totalAmount/100).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    charges: state.stripe.charges,
    customers: state.stripe.customers,
});

export default connect(mapStateToProps,{fetchCharge, fetchCustomer})(StripeInfo);