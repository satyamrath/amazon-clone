import React, { useState, useEffect } from 'react';
import './Login.css'
import { Link, useHistory } from "react-router-dom";
import { auth } from "./../firebase";
import { useStateValue } from './../StateProvider';

function Register() {
	const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
				.then((auth) => {
					// it successfully created a new user with email and password
					if (auth) {
						history.push('/')
					}
				})
				.catch(error => alert(error.message))
    }

    useEffect(() => {
        if(user){
            history.push('/');
        }
    }, [user])

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login_logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
					alt = ''
                />
            </Link>

            <div className='login_container'>
                <h1>Sign-up</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={register} className='login_signInButton'>Create you Account</button>
                </form>

                <p style={{'textAlign': 'center'}}>
                    By signing-up you agree to the <b>AMAZON FAKE CLONE</b>'s Terms & Conditions.
                </p>

                <Link to="/login"><button className='login_registerButton'>Already Registered</button></Link>

                <h3 className="credentials_disclaimer"><b>Warning:</b> Don't use Amazon's Credentials</h3>
            </div>
        </div>
    )
}

export default Register