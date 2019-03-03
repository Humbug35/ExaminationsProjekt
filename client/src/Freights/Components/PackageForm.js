import React , { Component } from 'react';

class PackageForm extends Component {
    state = {
        height: '',
        length: '',
        width: '',
        weight: '',
        typeOfPackage: ''
    }
    valueChanged = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            if (this.props.onChangeCB) {
                this.props.onChangeCB(this.state)
            }
        })
    }
    render() {
        return (
            <div className="freight-package-form">
                <div className="freight-input-and-label">
                    <label>Höjd: (cm) </label>
                    <input type="number" required={true} name="height" onChange={(e) => this.valueChanged(e)} />
                </div>

                <div className="freight-input-and-label">
                    <label>Längd: (cm) </label>
                    <input type="number" required={true} name="length" onChange={(e) => this.valueChanged(e)} />
                </div>
                
                <div className="freight-input-and-label">
                    <label>Bredd: (cm) </label>
                    <input type="number" required={true} name="width" onChange={(e) => this.valueChanged(e)} />
                </div>

                <div className="freight-input-and-label">
                    <label>Vikt: (kg) </label>
                    <input type="number" required={true} name="weight" onChange={(e) => this.valueChanged(e)} />
                </div>
                
                <div className="freight-input-and-label">
                    <label>Kollislag: </label>
                    <input type="text" required={true} name="typeOfPackage" onChange={(e) => this.valueChanged(e)} />
                </div>
            </div>
        )
    }
}

export default PackageForm;