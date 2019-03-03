import React , { Component } from 'react';
import { connect } from 'react-redux';
import { userOutloadingFreights , userDeliveredFreights } from '../Redux/Actions/EmployeeActions';
import { authenticate } from '../../Login/Redux/Actions/LoginActions';
import EmployeeHeader from '../Components/EmployeeHeader';
import EmployeeTotalFreight from '../Components/EmployeeTotalfreight';
import { NavLink , Redirect } from 'react-router-dom';

class EmployeeTotal extends Component {
    componentDidMount() {
        this.props.dispatch(authenticate())
        this.props.dispatch(userOutloadingFreights(this.props.authentication.authenticatedUser.user))
        this.props.dispatch(userDeliveredFreights(this.props.authentication.authenticatedUser.user))
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
            <div className="employee-total-container">
                <EmployeeHeader user={this.props.authentication.authenticatedUser.user} />
                <div className="delivery-back">
                    <NavLink to="/employee">Tillbaka</NavLink>
                </div>
                <EmployeeTotalFreight 
                    scannedOutloading={this.props.userOutloading.length} 
                    scannedDelivered={this.props.userDelivered.length} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authentication: state.authentication,
    userOutloading: state.employee.userOutloadingFreights,
    userDelivered: state.employee.userDeliveredFreights
})

export default connect(mapStateToProps)(EmployeeTotal);