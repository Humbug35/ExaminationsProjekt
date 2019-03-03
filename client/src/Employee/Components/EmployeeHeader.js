import React , { Component } from 'react';

class EmployeeHeader extends Component {
    render() {
        return (
            <div className="employee-header-container">
                <div className="employee-header">
                    <p>{this.props.user}</p>
                    <a href="http://localhost:5000/logout" className="log-out-link"><button className="log-out-button">Logga ut</button></a>
                </div>
            </div>
        )
    }
}

export default EmployeeHeader;