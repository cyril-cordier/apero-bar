import React, {useEffect, useContext} from 'react';
import {BottleContext} from '../context/BottleContext'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode';


const Header = () => {
    const {message, setMessage, user, setUser, setToken} = useContext(BottleContext);

    useEffect(() => {
        setTimeout(() => {
            setMessage('')
          }, 5000);
          //console.log('user', user)
    }, [message, setMessage])

    useEffect(() => {
        if(localStorage.getItem('bottletoken')) {
            setUser(jwtDecode(localStorage.getItem('bottletoken')))
            setToken(localStorage.getItem('bottletoken'))
        } else {
            setUser(null)
        }

    },[setUser, setToken])

    const handleLogOut = () => {
        setUser(null)
        localStorage.removeItem('bottletoken');
        
    }

    return (
        <div>
            {user? <Link to="/"><button className="btn btn-primary float-right" onClick={handleLogOut}>Déconnecter</button></Link> : <Link to='/login'><button className="btn btn-primary float-right">Login</button></Link>}
            <Link to='/'><button className="btn btn-primary">Home</button></Link>
            {user ? (user.is_admin === true ? <><Link to='/addbottle'><button className="btn btn-primary">Add a Bottle</button></Link>
            <Link to='/ingredients'><button className="btn btn-primary">Ingredients</button></Link></> : null) : null}
        </div>
    )
}

export default Header
