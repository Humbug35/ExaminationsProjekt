import React , { Component } from 'react';
import { NavLink } from 'react-router-dom';

class AllFreights extends Component {
    render() {
        let allFreights = this.props.allFreights.map((info, index) => {
            return (
                <tr key={index.toString()} className={index % 2 === 0 ? 'admin-table-row-odd' : 'admin-table-row-even'} >
                    <td><NavLink to={`/admin/${info.freightNoteNumber}/${info.status}`}>{info.freightNoteNumber}</NavLink></td>
                    <td>{info.user}</td>
                    <td>{info.status === 'On the way' ? 'Utkörning pågår' : 'Levererad'}</td>
                </tr>
            )
        })
        return (
            <div className="admin-all-freights">
                <table className="admin-all-freights-table">
                    <thead>
                        <tr>
                            <th>Sändningsnummer</th>
                            <th>Användare</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allFreights}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AllFreights;