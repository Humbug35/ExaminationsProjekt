import React , { Component } from 'react';
import FreightNoteLayout from './freightNoteLayout';
import Print from 'react-to-print';

class FreightNote extends Component {
    state = {
        freight: null
    }
    
    componentDidMount() {
        let freight = JSON.parse(localStorage.getItem('freight')) || []
        this.setState({
            freight: freight
        })
    }
    render() {
        if(!this.state.freight) {
            return false
        }
        let freightNote = this.state.freight.map((info, index) => {
            return (
                <FreightNoteLayout key={index.toString()} information={info} ref={note => this.theNote = note} />
            )
        })
        return (
            <div>
                {freightNote}
                <Print trigger={() => <button>Skriv ut</button>} content={() => this.theNote} />
            </div>
        )
    }
}

export default FreightNote;