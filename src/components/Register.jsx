import React, { useState } from 'react';

const Register = () => {
    const baseURL = 'http://127.0.0.1:8000/';
    const initialUser = {
        'name' : '',
        'email': '',
        'password': '',
        'confirm_password': '',
    }
    const [user, setUser] = useState(initialUser);
    const [errors, setErrors] = useState({}) //CORREJIR ERRORES. BORRAR ERRORES DE SETUSER !!!!!!
    const [registered, setRegistered] =useState(false)

    const resetUser = () => {
        setUser(initialUser)
    }

    const handleValidate = () => {
        if(user.name === ""){
            setErrors((user) => ({
                ...user,
                name: "Este campo es obligatorio"
            }))
        }
        if(user.email === ""){
            setErrors((user) => ({
                ...user,
                name: "Este campo es obligatorio"
            }))
        }
        if(user.password === ""){
            setErrors((user) => ({
                ...user,
                name: "Este campo es obligatorio"
            }))
        }
        if(user.confirm_password === ""){
            setErrors((user) => ({
                ...user,
                name: "Este campo es obligatorio"
            }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        // HACER VALIDACIONES FRONTEND
        
        postUser()
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setUser((prevState) => (
            {
                ...prevState,
                [name]: value
            }
        ))
    };

    const postUser = async () =>{
        let result = await fetch(baseURL+'api/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        let status = result.status
        result = await result.json();
        if(status !== 201){
            let resultErrors = result.errors
            setErrors(resultErrors)
            return
        }
        if(status === 201) {
            resetUser()
            setRegistered(true)
        }
    }

    if(registered)
        return(<h2>Te has registrado exitosamente. Confirma tu email... (HACER!)</h2>)

    return(
        <form onSubmit={handleSubmit} >
            <label htmlFor='name'>
                Nombre:
                <input type="text" placeholder='nombre' onChange={handleChange} name='name' value={user.name}/>
            </label>
            <span>{errors.name}</span>
            <br/>
            <label htmlFor='email'>
                Email:
                <input type="email" placeholder='email' onChange={handleChange} name='email' value={user.email}/>
            </label>
            <span>{errors.email}</span>
            <br/>
            <label htmlFor='password'>
                Contraseña:
                <input type="password" placeholder='contraseña' onChange={handleChange} name='password' value={user.password}/>
            </label>
            <span>{errors.password}</span>
            <br/>
            <label htmlFor='confirm_password'>
                Confirmar Contraseña:
                <input type="password" placeholder='confirmar contraseña' onChange={handleChange} name='confirm_password' value={user.confirm_password}/>
            </label>
            <span>{errors.confirm_password}</span>
            <input type="submit" value='Enviar' />
        </form>
    );
}

export default Register;