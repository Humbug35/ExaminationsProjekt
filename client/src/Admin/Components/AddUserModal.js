import React , { Component } from 'react';
import { Formik , Form , Field , ErrorMessage } from 'formik';
import * as Yup from 'yup';

class AddUserModal extends Component {
    state = {
        notValidPassword: null
    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div className="modal-container">
                <Formik 
                    initialValues={{ 
                        userName: '',
                        password: '',
                        confirmPassword: '',
                        isAdmin: ''
                     }}
                     validationSchema={Yup.object().shape({
                         userName: Yup.string().required('Användarnamn måste anges'),
                         password: Yup.string().required('Du måste ange ett lösenord'),
                         confirmPassword: Yup.string().required('Bekräfta ditt password'),
                         isAdmin: Yup.string().required('Du måste välja en')
                     })}
                     onSubmit={(values, { setSubmitting }) => {
                         if(values.password !== values.confirmPassword) {
                             return this.setState({
                                 notValidPassword: true
                             })
                         }
                         const newUser = {
                             userName: values.userName,
                             password: values.password,
                             isAdmin: values.isAdmin
                         }
                         this.props.addNewUser(newUser)
                         setTimeout(() => {
                            document.querySelector('.admin-modal-form').reset()
                            setSubmitting(false)
                         }, 2000)
                     }}
                     render={() => (
                        <Form className="admin-modal-form">
                            <label>Användarnamn</label>
                            <Field tyoe="text" name="userName" />
                            <ErrorMessage name="userName" component="div" />

                            <label>Lösenord</label>
                            <Field type="password" name="password" />
                            <ErrorMessage name="password" component="div" />

                            <label>Bekräfta lösenord</label>
                            <Field type="password" name="confirmPassword" />
                            <ErrorMessage name="confirmPassword" component="div" />
                            <div className="modal-radiobuttons">
                                <label>Admin
                                    <span>
                                        <Field type="radio" name="isAdmin" value="true" />
                                    </span>
                                </label>
                                <label>Chaufför 
                                    <span>
                                        <Field type="radio" name="isAdmin" value="false" />
                                    </span>
                                </label>
                                <ErrorMessage name="isAdmin" component="div" />
                            </div>
                            <div className="modal-buttons">
                                <button onClick={() => this.props.hideModal()} >Avbryt</button>
                                <button type="submit">Lägg till</button>
                            </div>
                        </Form>
                     )}
                />
                {this.state.notValidPassword ? <div>Lösenorden är inte samma</div> : this.state.notValidPassword}
                {this.props.newUserCreated ? <div>En ny användare är tillagd</div> : null}
                {!this.props.newUserCreated && this.props.newUserCreated !== null ? <div>En användare med det användarnamnet finns redan</div> : null}
                {/* <div className="modal-buttons">
                        <button onClick={() => this.cancelAdd()} >Avbryt</button>
                        <button onClick={() => this.addUser()} >Lägg till</button>
                </div> */}
            </div>
        )
    }
}

export default AddUserModal;