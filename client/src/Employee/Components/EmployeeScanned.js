import React , { Component } from 'react';

class EmployeeScanned extends Component {
    render() {
        const { scannedFreightNumber } = this.props;
        if(scannedFreightNumber.length < 1) {
            return null
        }
        const scannedFreights = scannedFreightNumber.map((scan, index) => {
            return (
                <p key={index.toString()}>{scan}</p>
            )
        })
        return (
            <div className="employee-scanned-container">
                {scannedFreights}
            </div>
        )
    }
}

export default EmployeeScanned;