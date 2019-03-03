import React , { Component } from 'react';

class SearchBar extends Component {
    state = {
        noteNumber: '',
        user: '',
        status: ''
    }
    saveSearchData = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    sendData = () => {
        this.props.getSearchData(this.state)
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.props.getSearchData(this.state)
        })
    }
    render() {
        return (
            <div className="admin-search-container">
                <form className="admin-search-form">
                    <div>
                        <label>Sändningsnummer</label> <br />
                        <input type="text" name="noteNumber" value={this.state.noteNumber} onChange={(e) => this.saveSearchData(e)} />
                    </div>
                    <div>
                        <label>Användare</label> <br />
                        <select defaultValue=""  name="user" onChange={(e) => this.onChange(e)}>
                            <option value="">Alla</option>
                            <option value="Linus">Linus</option>
                        </select>
                    </div>
                    <div>
                        <label>Status</label> <br />
                        <select defaultValue="" name="status" onChange={(e) => this.onChange(e)}>
                            <option value="">Alla</option>
                            <option value="On the way" name="status">Utkörning pågår</option>
                            <option value="Delivered" name="status">Levererat</option>
                        </select>
                    </div>
                </form>
                <button onClick={() => this.sendData()} >Sök</button>
            </div>
        )
    }
}

export default SearchBar;