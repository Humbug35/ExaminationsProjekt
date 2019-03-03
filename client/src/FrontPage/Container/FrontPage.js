import React , { Component } from 'react';
import { NavLink } from 'react-router-dom';

class FrontPage extends Component {
    render() {
        return (
            <div className="front-page">
                <header className="front-page-header">
                    <h1>Välkommen</h1>
                </header>
                <div className="front-page-menu">
                    <NavLink to="/create-freight" className="front-page-menu-link"><button className="front-page-menu-button">Boka frakt</button></NavLink>
                    <NavLink to="/login" className="front-page-menu-link"><button className="front-page-menu-button">Logga in</button></NavLink>
                </div>
            </div>
        )
    }
}

export default FrontPage;