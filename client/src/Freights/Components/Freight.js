import React , { Component } from 'react';
import '../../App.css';
import SenderForm from './SenderForm';
import ClientForm from './ClientForm';
import PackageForm from './PackageForm';
import moment from 'moment';
import { Formik , Form } from 'formik';
import * as Yup from 'yup';

class Freight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            packageInputs: []
        }
        this.packages = []
    }
    
    createFreight = () => {
        let freightArray = [];
        let freight = {
            freightNoteNumber: this.randomNumber(),
            sender: this.sender,
            client: this.client,
            package: this.packages,
            date: moment().locale('sv').format('lll'),
            isDelivered: false,
            status: 'Beställd'
        }
        fetch('http://localhost:5000/order', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(freight)
        })
        freightArray.push(freight)
        localStorage.setItem('freight', JSON.stringify(freightArray))
    }
    randomNumber = () => {
        return Math.floor(Math.random() * 10000000000).toString()
      }
    newPackageInput = () => {
        let newInput = this.state.packageInputs.length;
        this.setState(prevState => ({ packageInputs: prevState.packageInputs.concat([newInput])}));
    }
    updatePackageForm = (index, st) => {
        this.packages[index] = st;
    }
    render() {
        return (
                <Formik
                    initialValues={{ 
                        senderName: '',
                        senderStreetAddress: '',
                        senderZipCode: '',
                        senderCity: '',
                        senderCountry: '',
                        senderPhoneNumber: '',
                        clientName: '',
                        clientStreetAddress: '',
                        clientZipCode: '',
                        clientCity: '',
                        clientCountry: '',
                        clientPhoneNumber: '',
                        height: '',
                        length: '',
                        width: '',
                        weight: '',
                        typeOfPackage: ''
                    }}
                    validationSchema={Yup.object().shape({
                        senderName: Yup.string().required('Du måste ange ett namn här'),
                        senderStreetAddress: Yup.string().required('Du måste ange en adress här'),
                        senderZipCode: Yup.number().required('Du måste ange ett postnummer här'),
                        senderCity: Yup.string().required('Du måste ange en stad här'),
                        senderCountry: Yup.string().required('Du måste ange ett land här'),
                        senderPhoneNumber: Yup.number().required('Du måste ange ett telefonnummer här'),
                        clientName: Yup.string().required('Här måste ett namn anges'),
                        clientStreetAddress: Yup.string().required('Här måste en adress anges'),
                        clientZipCode: Yup.number().required('Här måste ett postnummer anges'),
                        clientCity: Yup.string().required('Här måste en stad anges'),
                        clientCountry: Yup.string().required('Här måste ett land anges'),
                        clientPhoneNumber: Yup.number().required('Här måste ett telefonnummer anges')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(false)
                        this.sender = {
                            name: values.senderName,
                            address: {
                                streetAddress: values.senderStreetAddress,
                                zipCode: values.senderZipCode,
                                city: values.senderCity,
                                country: values.senderCountry
                            },
                            phoneNumber: values.senderPhoneNumber
                        }
                        this.client = {
                            name: values.clientName,
                            address: {
                                streetAddress: values.clientStreetAddress,
                                zipCode: values.clientZipCode,
                                city: values.clientZipCode,
                                country: values.clientCountry
                            },
                            phoneNumber: values.clientPhoneNumber
                        }
                        this.createFreight()
                        document.querySelector('.freight').reset()
                    }}
                    render={formikBag => (
                            <Form className="freight">
                                <div className="freight-sender-client">
                                    <SenderForm formikBag={formikBag} />
                                    <ClientForm formikBag={formikBag} />
                                </div>
                                <button className="add-packageform" onClick={() => this.newPackageInput()}>Lägg till</button>
                                <div className="freight-package">
                                    <h2>Kolli</h2>
                                    {this.state.packageInputs.map((index) => {
                                    return (
                                        <PackageForm key={index.toString()} onChangeCB={(st) => this.updatePackageForm(index, st)} formikBag={formikBag} />
                                    )
                                })}
                                </div>
                                <button type="submit" className="order-freight">Skicka</button>
                            </Form>
                    )}
                /> 
        )
    }
}

export default Freight;