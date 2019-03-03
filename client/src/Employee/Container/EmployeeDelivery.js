import React , { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeHeader from '../Components/EmployeeHeader';
import EmployeeCamera from '../Components/EmployeeCamera';
import EmployeeFreightInfo from '../Components/EmployeeFreightInfo';
import { scannedFreight } from '../Redux/Actions/EmployeeActions';
import { authenticate } from '../../Login/Redux/Actions/LoginActions';
import { NavLink , Redirect } from 'react-router-dom';

class EmployeeDelivery extends Component {
    componentDidMount() {
        this.props.dispatch(authenticate())
    }
    scannedDelivery = freightNumber => {
        this.props.dispatch(scannedFreight(freightNumber, this.props.match.path, this.props.authentication.authenticatedUser.user))
    }
    render() {
        const { authenticationLoading , isAuthenticated } = this.props.authentication;
        if(authenticationLoading === null || authenticationLoading) {
            return null
        }
        if(!isAuthenticated) {
            return <Redirect to="/login" />
        }
        return (
            <div className="employee-delivery">
                <EmployeeHeader user={this.props.authentication.authenticatedUser.user} />
                <div className="delivery-back">
                    <NavLink to="/employee">Tillbaka</NavLink>
                </div>
                <div>{this.props.scannedOutloadingError ? 'Den skannade sändningsnumret existerar inte eller så har du redan skannat den' : ''}</div>
                <div className="employee-delivery-container">
                    <EmployeeCamera 
                        scannedDelivery={(freightNumber) => this.scannedDelivery(freightNumber)} 
                        deliveryPath={this.props.match.path}    
                    />
                    <EmployeeFreightInfo 
                        deliveredFreight={this.props.scannedDelivery}
                        deliveryPath={this.props.match.path}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    scannedDelivery: state.employee.scannedDelivery,
    scannedDeliveryError: state.employee.scannedDelivery,
    authentication: state.authentication
})

export default connect(mapStateToProps)(EmployeeDelivery);