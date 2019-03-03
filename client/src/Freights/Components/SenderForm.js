import React , { Component } from 'react';
import { Field , ErrorMessage } from 'formik';

class SenderForm extends Component {
    render() {
        return (
            <div className="freight-sender-form">
                <h2>Avsändare</h2>
                <div className="freight-user-form">
                    <label>Namn</label>
                    <Field type="text" name="senderName" />
                    <ErrorMessage name="senderName" component="div" />

                    <label>Gatuadress</label>
                    <Field type="text" name="senderStreetAddress" />
                    <ErrorMessage name="senderStreetAddress" component="div" />

                    <label>Postnummer</label>
                    <Field type="number" name="senderZipCode" />
                    <ErrorMessage name="senderZipCode" component="div" />

                    <label>Stad</label>
                    <Field type="text" name="senderCity" />
                    <ErrorMessage name="senderCity" />

                    <label>Land</label>
                    <Field type="text" name="senderCountry" />
                    <ErrorMessage name="senderCountry" component="div" />

                    <label>Telefonnummer</label>
                    <Field type="number" name="senderPhoneNumber" />
                    <ErrorMessage name="senderPhoneNumber" component="div" />
                </div>
            </div> 
        )
    }
}

export default SenderForm;