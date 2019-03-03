import React , { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleFreight , userRegister , noMessageRegister } from '../Redux/Actions/AdminActions';
import { authenticate } from '../../Login/Redux/Actions/LoginActions';
import { NavLink , Redirect } from 'react-router-dom';
import Header from '../Components/AdminHeader';
import AddUserModal from '../Components/AddUserModal';
import SenderInfo from '../Components/SenderInfo';
import ClientInfo from '../Components/ClientInfo';
import PackageInfo from '../Components/PackageInfo';


class AdminSingleFreight extends Component {
    state = {
        showModal: false
    }
    componentDidMount() {
        this.props.dispatch(authenticate())
        const freightNumber = this.props.match.params.notenumber;
        const status = this.props.match.params.status
        this.props.dispatch(fetchSingleFreight(freightNumber, status))
    }
    showModal = () => {
        this.setState({
            showModal: true
        })
    }
    hideModal = () => {
        this.setState({
            showModal: false
        })
        this.props.dispatch(noMessageRegister())
    }
    addNewUser = newUser => {
        this.props.dispatch(userRegister(newUser))
    }
    render() {
        const { authenticationLoading , isAuthenticated } = this.props.authentication;
        if(authenticationLoading === null || authenticationLoading) {
            return null
        }
        if(!isAuthenticated) {
            return <Redirect to="/login" />
        }
        const singleFreight = this.props.singleFreight;
        return (
            <div className="admin-single-container">
                <Header showModal={() => this.showModal()} user={this.props.authentication.authenticatedUser.user} />
                {this.state.showModal ? <AddUserModal newUserCreated={this.props.newUser} hideModal={() => this.hideModal()} addNewUser={(newUser) => this.addNewUser(newUser)} /> : null}
                <div className="admin-single-info-container">
                    <div className="admin-single-notenumber">
                        <NavLink to="/admin">Bakåt</NavLink>
                        <div>
                            <h3>Sändningsnummer</h3>
                            <h4>{this.props.match.params.notenumber}</h4>
                        </div>
                    </div>
                    <div className="admin-single-sender-client-info">
                        <SenderInfo senderInfo={singleFreight.sender} />
                        <ClientInfo clientInfo={singleFreight.client} />
                    </div>
                    <div className="admin-single-package-info">
                        <PackageInfo packageInfo={singleFreight.package} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    singleFreight: state.admin.singleFreight,
    authentication: state.authentication,
    newUser: state.admin.newUserCreated
})

export default connect(mapStateToProps)(AdminSingleFreight);