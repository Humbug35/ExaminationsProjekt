import React , { Component } from 'react';

class ClientInfo extends Component {
    render() {
        if(!this.props.clientInfo) {
            return null
        }
        const client = this.props.clientInfo;
        const address = client.address;
        return (
            <div className="admin-single-info">
                <h2>Mottagare</h2>
                <p>Namn: {client.name}</p>
                <div>
                    <p>Leveransadress: {address.streetAddress}</p>
                    <p>Postnummer: {address.zipCode}</p>
                    <p>Stad: {address.city}</p>
                    <p>Land: {address.country}</p>
                </div>
                <p>Telefonnummer: 0{client.phoneNumber}</p>
            </div>
        )
    }
}

export default ClientInfo;