import React , { Component } from 'react';

class LoginPage extends Component {
    render() {
        if(this.props.match.params.fail) {
            return (
                <div className="login-page">
                    <div>Inloggningen misslyckades</div>
                    <form action="http://localhost:5000/login" method="POST" className="login-form">
                        <label>Användarnamn</label>
                        <input type="text" required={true} name="userName" />
                        <label>Lösenord</label>
                        <input type="password" required={true} name="password" />
                        <input type="submit" value="Logga in" />
                    </form>
                </div>
            )
        } else {
            return (
                <div className="login-page">
                    <form action="http://localhost:5000/login" method="POST" className="login-form">
                        <label>Användarnamn</label>
                        <input type="text" required={true} name="userName" />
                        <label>Lösenord</label>
                        <input type="password" required={true} name="password" />
                        <input type="submit" value="Logga in" />
                    </form>
                </div>
            )
        }
    }
}

export default LoginPage;