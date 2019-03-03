import React , { Component } from 'react';
import Barcode from 'react-barcode';
//import PropTypes from 'prop-types';

class FreightNoteLayout extends Component {
    render() {
        const info = this.props.information;
        const sender = info.sender;
        const client = info.client;

        const packages = info.package.map((pack, index) => {
            return (
                <tr key={index.toString()} className="freight-note-package-row">
                    <td>{pack.typeOfPackage}</td>
                    <td>{pack.length}</td>
                    <td>{pack.width}</td>
                    <td>{pack.height}</td>
                    <td>{pack.weight}</td>
                </tr>
            )
        })
        
        return (
            <div className="freight-note">
                <div className="freight-note-number">
                    <p>Sändningsnummer: </p>
                    <p><strong>{info.freightNoteNumber}</strong></p>
                </div>
                <div className="freight-note-sender-client">
                    <div className="freight-note-sender">
                        <h2>Avsändare</h2>
                        <p>{sender.name}</p>
                        <div>
                            <p>{sender.address.streetAddress}</p>
                            <p>{sender.address.zipcode}</p>
                            <p>{sender.address.city}</p>
                            <p>{sender.address.country}</p>   
                        </div>
                        <p>0{sender.phoneNumber}</p>
                    </div>
                    <div className="freight-note-client-main">
                        <div className="freight-note-client">
                            <h2>Mottagare</h2>
                            <p>{client.name}</p>
                            <div>
                                <p>{client.address.streetAddress}</p>
                                <p>{client.address.zipcode}</p>
                                <p>{client.address.city}</p>
                                <p>{client.address.country}</p>   
                            </div>
                            <p>0{client.phoneNumber}</p>
                        </div>
                    </div>
                </div>
                <div className="freight-note-package">
                    <p className="freight-note-barcode"><Barcode value={info.freightNoteNumber} displayValue={true} height={50} width={3} /></p>
                    <table>
                        <thead>
                            <tr className="freight-note-package-row">
                                <th>Kollislag</th>
                                <th>Längd(cm)</th>
                                <th>Bredd(cm)</th>
                                <th>Höjd(cm)</th>
                                <th>Vikt(kg)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {packages}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


export default FreightNoteLayout; 