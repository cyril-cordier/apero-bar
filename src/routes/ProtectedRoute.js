import React, {useContext, useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom' ;
import {BottleContext} from '../context/BottleContext'
import jwtDecode from 'jwt-decode';

const ProtectedRoute = ({component: Component, ...rest}) => {
    const {setUser} = useContext(BottleContext);
    
    useEffect(() => {
        localStorage.getItem('bottletoken')? setUser(jwtDecode(localStorage.getItem('bottletoken'))) : setUser(null)
    },[setUser])

    return (
         localStorage.getItem('bottletoken') ? <Route {...rest} render={
            props => <Component {...rest} {...props} /> 
        } /> : <Redirect to="/login" />
    )
}

export default ProtectedRoute ;
