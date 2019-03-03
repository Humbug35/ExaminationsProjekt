import React , { Component } from 'react';
class AdminHeader extends Component {
    render() {
        return (
            <div className="admin-header">
                <div className="admin-panel">
                    <button className="admin-modal-button" onClick={() => this.props.showModal()}>Lägg till användare</button>
                    <p>{this.props.user}</p>
                    <a href="http://localhost:5000/logout" className="log-out-link"><button className="log-out-button">Logga ut</button></a>
                </div>
            </div>
        )
    }
}

export default AdminHeader;