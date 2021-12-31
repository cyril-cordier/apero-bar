import React, {useState, useEffect, useContext} from 'react'
import { useHistory, Link } from 'react-router-dom'
import BottleFinder from '../apis/BottleFinder'
import {BottleContext} from '../context/BottleContext' 

const Register = () => {
    let history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [errorDetails, setErrorDetails] = useState("");
    const [errCode, setErrCode] = useState("");
    const {setMessage} = useContext(BottleContext);
    

    
    const handleSubmitRegister = async(e) => {
        e.preventDefault()
        try {
            const result = await BottleFinder.post('/users/register', {
                username, 
                password
            })
            setError('');
            setErrCode('');
            setMessage('Votre compte a bien été créé. Vous pouvez vous connecter.')
            history.push('/login')
            
        } catch (err) {
            setErrCode(err.message.substr(-3))
            console.log("code", errCode)
            
            err ? setError('Erreur d\'identifiants ou de mot de passe') : setError('');
        }

    
    }

    useEffect(() => {
        errCode === "500" ? setErrorDetails('L\'identifiant n\'est pas un username') : setErrorDetails('');
        errCode === "409" ? setErrorDetails('L\'adresse username existe déjà') : setErrorDetails('');
    }, [errCode])

    return (
        <div>
            <h1>Register</h1>
            <div className="mb-2">
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
                
                {errorDetails ? <p className="alert alert-danger">{errorDetails}</p> : ''}
                {error ? <p className="alert alert-danger">{error}</p> : ''}
                <button 
                type="submit"
                onClick={handleSubmitRegister}
                className="btn btn-primary">Submit</button>

            </div>
            <Link to='/login'><button className="btn btn-primary">Go to Login</button></Link>

        </div>
    )
}

export default Register
