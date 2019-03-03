import React , { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate } from '../../Login/Redux/Actions/LoginActions';
import EmployeeHeader from '../Components/EmployeeHeader';

class EmployeeFrontPage extends Component {
    componentDidMount() {
        this.props.dispatch(authenticate())
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
            <div className="employee-container">
                <EmployeeHeader user={this.props.authentication.authenticatedUser.user} />
                <div className="employee-frontpage">
                    <a className="employee-menu-link" href="/employee/outloading" auth={'hej'}><button className="outloading-menu-button">Utlastning</button></a>
                    <a className="employee-menu-link" href="/employee/delivery"><button className="delivered-menu-button">Registrera leverans</button></a>
                    <a className="employee-menu-link" href="/employee/totalfreights"><button className="total-menu-button">Antal sändningar</button></a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authentication: state.authentication
})

export default connect(mapStateToProps)(EmployeeFrontPage);