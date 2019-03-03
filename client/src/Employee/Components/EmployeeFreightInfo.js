import React , { Component } from 'react';

class EmployeeFreightInfo extends Component {
    render() {
        if(this.props.outloadingPath === '/employee/outloading') {
            const outloading = this.props.outloadingFreight;
            if(Object.keys(outloading).length > 0) {
                return (
                    <div className="employee-freight-info-container">
                        <h3>Sändningsnummer: <span>{outloading.freightNoteNumber}</span></h3>
                        <div className="employee-freight-info">
                            <div>
                                <h3>Avsändare</h3>
                                <p>{outloading.sender.name}</p>
                                <p>{outloading.sender.address.streetAddress}</p>
                                <p>{outloading.sender.address.zipCode}</p>
                                <p>{outloading.sender.address.city}</p>
                                <p>{outloading.sender.phoneNumber}</p>
                            </div>
                            <div>
                                <h3>Mottagare</h3>
                                <p>{outloading.client.name}</p>
                                <p>{outloading.client.address.streetAddress}</p>
                                <p>{outloading.client.address.zipCode}</p>
                                <p>{outloading.client.address.city}</p>
                                <p>{outloading.client.phoneNumber}</p>
                            </div>
                        </div>
                        <div>
                            <h3>Antal kolli: <span>{outloading.package.length}</span></h3>
                        </div>
                    </div>
                )
            } else {
                return null
            }
        } else if(this.props.deliveryPath === '/employee/delivery') {
            const delivery = this.props.deliveredFreight
            if(Object.keys(delivery).length > 0) {
                return (
                    <div className="employee-freight-info-container">
                        <h3>Sändningsnummer: <span>{delivery.freightNoteNumber}</span></h3>
                        <div className="employee-freight-info">
                            <div>
                                <h3>Avsändare</h3>
                                <p>{delivery.sender.name}</p>
                                <p>{delivery.sender.address.streetAddress}</p>
                                <p>{delivery.sender.address.zipCode}</p>
                                <p>{delivery.sender.address.city}</p>
                                <p>{delivery.sender.phoneNumber}</p>
                            </div>
                            <div>
                                <h3>Mottagare</h3>
                                <p>{delivery.client.name}</p>
                                <p>{delivery.client.address.streetAddress}</p>
                                <p>{delivery.client.address.zipCode}</p>
                                <p>{delivery.client.address.city}</p>
                                <p>{delivery.client.phoneNumber}</p>
                            </div>
                        </div>
                        <div>
                            <h3>Antal kolli: <span>{delivery.package.length}</span></h3>
                        </div>
                    </div>
                )
            } else {
                return null
            }
        }
    }
}

export default EmployeeFreightInfo;