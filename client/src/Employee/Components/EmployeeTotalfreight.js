import React , { Component } from 'react';

class EmployeeTotalFreight extends Component {
    render() {
        return (
            <div className="employee-total">
                <div className="employee-total-freight-outloading">
                    <p>Utlastade: <span>{this.props.scannedOutloading}</span></p>
                </div>
                <div className="employee-total-freight-delivered">
                    <p>Levererade: <span>{this.props.scannedDelivered}</span></p>
                </div>
            </div>
        )
    }
}

export default EmployeeTotalFreight;