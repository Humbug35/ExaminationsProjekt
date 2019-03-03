import React , { Component } from 'react';

class SenderInfo extends Component {
    render() {
        if(!this.props.senderInfo) {
            return null
        }
        const sender = this.props.senderInfo
        const address = sender.address;
        return (
            <div className="admin-single-info">
                <h2>Avsändare</h2>
                <p>Namn: {sender.name}</p>
                <div>
                    <p>Avsändaradress: {address.streetAddress}</p>
                    <p>Postnummer: {address.zipCode}</p>
                    <p>Stad: {address.city}</p>
                    <p>Land: {address.country}</p>
                </div>
                <p>Telefonnummer: 0{sender.phoneNumber}</p>
            </div>
        )
    }
}

export default SenderInfo;