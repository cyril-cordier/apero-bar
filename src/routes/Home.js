import jwtDecode from 'jwt-decode';
import React, {useContext, useEffect} from 'react'
import { Router, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import BottleList from '../components/BottlesList'
import {BottleContext} from '../context/BottleContext'




export default function Home() {
    const {message, user} = useContext(BottleContext);
    let history = useHistory();

    const date = new Date().getTime()/1000

    useEffect(() => {
        if (!localStorage.getItem('bottletoken') || (localStorage.getItem('bottletoken') && jwtDecode(localStorage.getItem('bottletoken')).exp < date)) {
            history.push('/login')
        } 
    }, [])  

    return (
        <div>
            {message ? <div className="alert alert-success">{message}</div> : null}
            <h1>Apéro-Bar de Cyril</h1>
            {/* {user?<h2>Bienvenue {user.username}</h2> :null} */}
            
            <BottleList />
           {/*  <Autolist/> */}

        </div>
    )
}
