import React, {useContext, useState} from 'react'
import { useHistory, Link } from 'react-router-dom';
import BottleFinder from '../apis/BottleFinder'
import {BottleContext} from '../context/BottleContext'
import jwtDecode from 'jwt-decode';

const Login = () => {
    let history = useHistory();
    const {message, setMessage, setToken, setUser} = useContext(BottleContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // eslint-disable-next-line
    const [error, setError] = useState("");
    //const [errorDetails, setErrorDetails] = useState("");
    const [errCode, setErrCode] = useState("");
    
    


    const handleSubmitLogin = async(e) => {
        e.preventDefault()
        
        try {
            const result = await BottleFinder.post('/auth', {
                username, 
                password
            })
            setError('');
            setErrCode('');
            console.log(result)
            if(result.data.access_token){
                localStorage.setItem('bottletoken',result.data.access_token);
                setToken(result.data.access_token)
                //console.log(jwtDecode(result.data.bottletoken))
                setUser(jwtDecode(result.data.access_token))

                setMessage('Vous êtes connecté')
                history.push('/')
            }
            
        } catch (err) {
            console.log(JSON.stringify(err.message.substr(-3)))
            setErrCode(err.message.substr(-3))
            console.log("code", errCode)
            console.log(err)
            
        }
    }

    return (
        <div>
            <h1>Login</h1>
            {message ? <div className="alert alert-success">{message}</div> : null}
            <form className="mb-2" action="submit">
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="username">Username</label>
                        <input value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id="username" placeholder="Username" type="text" className="form-control"/>
                    </div>
                    <div className="form-group col-8">
                        <label htmlFor="password">Mot de passe</label>
                        <input value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password" placeholder="Mot de passe" type="password" className="form-control"/>
                    </div>
                    
                </div>
                
                
                <button 
                type="submit"
                onClick={handleSubmitLogin}
                className="btn btn-primary">Submit</button>

            </form>
            <Link to='/register'><button className="btn btn-primary">Go to Register</button></Link>
            <Link to='/'><button className="btn btn-primary">Home</button></Link>
        </div>
    )
}

export default Login
