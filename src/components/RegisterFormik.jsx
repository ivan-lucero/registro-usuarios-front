import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { useState } from 'react'
import Registered from './Registered'
import axios from 'axios'
export const RegisterFormik = () => {

const [registered, setRegistered] = useState(false)
const [errorsResponse, setErrorsResponse] = useState({})
    if(registered) return (<Registered/>)
    else
    return (
    <>
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
                confirm_password: ''
            }}
            validate={(values) => {
                let errors = {}
                if(!values.name) errors.name = "ingrese un nombre"

                if(!values.email) errors.email = "ingrese un email"
                else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)){
                    errors.email = "El email solo puede tener letras, numeros, guiones y guion bajo"
                }

                if(!values.password) errors.password = "ingrese una contraseña"

                if(!values.confirm_password) errors.confirm_password = "ingrese una contraseña"

                // return errors
            }}
            onSubmit={(values, {resetForm}) => {
                let user = {
                    "name": values.name,
                    "email": values.email,
                    "password": values.password,
                    "confirm_password": values.confirm_password,
                }
                console.log(user)
                
                let headers = {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
                
                
                axios.post(`http://127.0.0.1:8000/api/register`, user, {headers})
                .then(res => {
                    console.log(res.data)
                    console.log(res.status)
                    setRegistered(true)
                })
                .catch(error => {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.data.errors);
                        console.log(error.response.data.errors.name);
                        console.log(error.response.data.errors.email);
                        console.log(error.response.data.errors.password);
                        console.log(error.response.data.errors.confirm_password);
                        setErrorsResponse(error.response.data.errors)
                    }
                })
                // resetForm()
            }}
        >
            { ({errors }) => (
            <Form>
                <div>
                    <label htmlFor='name'>Nombre</label>
                    <Field 
                    type="text" 
                    name="name" 
                    id="name" 
                    />
                    <ErrorMessage name='name' component={() => (
                        <span>{errors.name}</span>
                    )}/>
                    {errorsResponse.name && <span>{errorsResponse.name}</span>}
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <Field 
                    type="email" 
                    name="email" 
                    id="email" 
                    />
                    <ErrorMessage name='email' component={() => (
                    <span>{errors.email}</span>
                    )}/>
                    {errorsResponse.email && <span>{errorsResponse.email}</span>}
                </div>
                <div>
                    <label htmlFor='password'>Contraseña</label>
                    <Field 
                    type="password" 
                    name="password" 
                    id="password" 
                    />
                    <ErrorMessage name='password' component={() => (
                    <span>{errors.password}</span>
                    )}/>
                    {errorsResponse.password && <span>{errorsResponse.password}</span>}
                </div>
                <div>
                    <label htmlFor='confirm_password'>Confirmar contraseña</label>
                    <Field 
                    type="password" 
                    name="confirm_password" 
                    id="confirm_password" 
                    />
                    <ErrorMessage name='confirm_password' component={() => (
                    <span>{errors.confirm_password}</span>
                    )}/>
                    {errorsResponse.confirm_password && <span>{errorsResponse.confirm_password}</span>}
                </div>
                <input type="submit" value="Enviar" />
            </Form>
        )}
        </Formik>
    </>
  )
}
