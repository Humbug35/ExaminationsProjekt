import React , { Component } from 'react';

class PackageInfo extends Component {
    render() {
        if(!this.props.packageInfo) {
            return null
        }
        const singleFreightpackage = this.props.packageInfo.map((pack, index) => {
            return (
                <tr key={index.toString()} className="admin-single-package">
                    <td>{pack.typeOfPackage}</td>
                    <td>{pack.length}</td>
                    <td>{pack.width}</td>
                    <td>{pack.height}</td>
                    <td>{pack.weight}</td>
                </tr>
            )
        })
        return (
            <div className="admin-single-package-container">
                <h2>KolliInfo</h2>
                <table>
                    <thead>
                        <tr className="admin-single-package">
                            <th>Kollislag</th>
                            <th>Längd(cm)</th>
                            <th>Bredd(cm)</th>
                            <th>Höjd(cm)</th>
                            <th>Vikt(kg)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {singleFreightpackage}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PackageInfo;