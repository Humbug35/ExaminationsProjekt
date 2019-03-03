import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchOutloadingFreights , fetchDeliveredFreights , userRegister , noMessageRegister } from '../Redux/Actions/AdminActions';
import { authenticate } from '../../Login/Redux/Actions/LoginActions';
import '../../App.css';
import Header from '../Components/AdminHeader';
import SearchBar from '../Components/SearchBar';
import AllFreights from '../Components/AllFreights';
import AddUserModal from '../Components/AddUserModal';

class AdminFrontPage extends Component {
     constructor() {
        super();
        this.state = {
            showModal: false
        }
        this.search = {}
    }
    
    componentDidMount() {
        this.props.dispatch(authenticate())
        this.props.dispatch(fetchOutloadingFreights())
        this.props.dispatch(fetchDeliveredFreights())
        
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
    getSearchData = (st) => {
        this.search = st;
        if(st.status === 'On the way') {
            this.props.dispatch(fetchOutloadingFreights(st.user, st.noteNumber, st.status))
        } else if(st.status === 'Delivered') {
            this.props.dispatch(fetchDeliveredFreights(st.user, st.noteNumber, st.status))
        } else {
            this.props.dispatch(fetchOutloadingFreights(st.user, st.noteNumber, st.status))
            this.props.dispatch(fetchDeliveredFreights(st.user, st.noteNumber, st.status))
        }
    }
    addNewUser = (newUser) => {
        this.props.dispatch(userRegister(newUser))
    }
    render() {
        const { authenticationLoading , isAuthenticated , isAdmin , isEmployee} = this.props.authentication;
        if(authenticationLoading === null || authenticationLoading) {
            return null
        }
        if(!isAuthenticated) {
            return <Redirect to="/login" />
        }
        if(!isAdmin && isEmployee) {
            return <Redirect to="/employee" />
        }
        let allFreights;
        if(this.search.status === 'On the way') {
            allFreights = this.props.outloadingFreights
        } else if(this.search.status === 'Delivered') {
            allFreights = this.props.deliveredFreights
        } else {
            allFreights = this.props.outloadingFreights.concat(this.props.deliveredFreights)
        }
        
        return (
            <div className="admin-page">
                <Header showModal={() => this.showModal()} user={this.props.authentication.authenticatedUser.user} />
                <div className="admin-search-and-freights">
                    <SearchBar getSearchData={(state) => this.getSearchData(state)} />
                    {this.state.showModal ? <AddUserModal newUserCreated={this.props.newUser} hideModal={() => this.hideModal()} addNewUser={(newUser) => this.addNewUser(newUser)} /> : null }
                    {this.props.outloadingError && this.props.deliveredError
                        ?            
                            <div className="admin-no-freights">Finns inga frakter med angivet sändningsnummer</div> 
                        : 
                            <AllFreights allFreights={allFreights} /> 
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    outloadingFreights: state.admin.outloadingFreights,
    deliveredFreights: state.admin.deliveredFreights,
    outloadingError: state.admin.outloadingError,
    deliveredError: state.admin.deliveredError,
    authentication: state.authentication,
    newUser: state.admin.newUserCreated
})

export default connect(mapStateToProps)(AdminFrontPage);