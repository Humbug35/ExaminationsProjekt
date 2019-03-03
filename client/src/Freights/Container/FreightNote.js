import React , { Component } from 'react';
import Print from 'react-to-print';
import FreightNoteLayout from '../Components/FreightNoteLayout';

class FreightNote extends Component {
    state = {
        freight: null
    }
    componentDidMount() {
        let freight = JSON.parse(localStorage.getItem('freight')) || [];
        this.setState({
            freight: freight
        })
    }
    render() {
        if(!this.state.freight) {
            return null
        }
        let freightNote = this.state.freight.map((info, index) => {
            return (
                <FreightNoteLayout information={info} key={index.toString()} ref={note => this.theNote = note} />
            )
        })
        return (
            <div>
                {freightNote}
                <Print trigger={() => <button className="print-out-button">Skriv ut</button>} content={() => this.theNote} />
            </div>
        )
    }
}

export default FreightNote;