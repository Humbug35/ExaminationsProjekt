import React , { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeHeader from '../Components/EmployeeHeader';
import EmployeeCamera from '../Components/EmployeeCamera';
import EmployeeScanned from '../Components/EmployeeScanned';
import EmployeeFreightInfo from '../Components/EmployeeFreightInfo';
import { scannedFreight } from '../Redux/Actions/EmployeeActions';
import { authenticate } from '../../Login/Redux/Actions/LoginActions';
import { NavLink , Redirect } from 'react-router-dom';

class EmployeeOutloading extends Component {
    componentDidMount() {
        this.props.dispatch(authenticate())
    }
    scannedOutloading = freightNumber => {
        this.props.dispatch(scannedFreight(freightNumber, this.props.match.path, this.props.authentication.authenticatedUser.user))
    }
    render() {
        const { isAuthenticated , authenticationLoading } = this.props.authentication;
        if(authenticationLoading === null || authenticationLoading) {
            return null
        }
        if(!isAuthenticated) {
            return <Redirect to="/login" />
        }
        return (
            <div className="employee-outloading">
                <EmployeeHeader user={this.props.authentication.authenticatedUser.user} />
                <div className="outloading-back">
                    <NavLink to="/employee">Tillbaka</NavLink>
                </div>
                <div>{this.props.scannedOutloadingError ? 'Den skannade sändningsnumret existerar inte eller så har du redan skannat den' : ''}</div>
                <div className="employee-outloading-container">
                    <EmployeeCamera 
                        scannedOutloading={(freightNumber) => this.scannedOutloading(freightNumber)} 
                        outloadingPath={this.props.match.path}    
                    />
                    <EmployeeScanned 
                        scannedFreightNumber={this.props.scannedOutloadingNumber}
                    />
                    <EmployeeFreightInfo 
                        outloadingFreight={this.props.scannedOutloading} 
                        outloadingPath={this.props.match.path}
                        />
                </div>
                <div className="outloading-done">
                    <NavLink to="/employee" className="employee-outloading-link"><button>Lastning klar</button></NavLink>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    scannedOutloading: state.employee.scannedOutloading,
    scannedOutloadingError: state.employee.scannedOutloadingError,
    scannedOutloadingNumber: state.employee.scannedFreightNumber,
    authentication: state.authentication
})

export default connect(mapStateToProps)(EmployeeOutloading);