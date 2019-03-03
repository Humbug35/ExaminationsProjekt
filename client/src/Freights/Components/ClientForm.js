import React , { Component } from 'react';
import { Field , ErrorMessage } from 'formik';

class ClientForm extends Component {
    render() {
        return (
            <div className="freight-client-form">
                <h2>Mottagare</h2>
                <div className="freight-user-form">
                    <label>Namn</label>
                    <Field type="text" name="clientName" />
                    <ErrorMessage name="clientName" component="div" />

                    <label>Gatuadress</label>
                    <Field type="text" name="clientStreetAddress" />
                    <ErrorMessage name="clientStreetAddress" component="div" />

                    <label>Postnummer</label>
                    <Field type="number" name="clientZipCode" />
                    <ErrorMessage name="clientZipCode" component="div" />

                    <label>Stad</label>
                    <Field type="text" name="clientCity" />
                    <ErrorMessage name="clientCity" component="div" />

                    <label>Land</label>
                    <Field type="text" name="clientCountry" />
                    <ErrorMessage name="clientCountry" component="div" />

                    <label>Telefonnummer</label>
                    <Field type="number" name="clientPhoneNumber" />
                    <ErrorMessage name="clientPhoneNumber" component="div" />
                </div>
            </div>
        )
    }
}

export default ClientForm;