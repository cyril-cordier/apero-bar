import React, {useContext} from 'react'
import BottleList from '../components/BottlesList'
import {BottleContext} from '../context/BottleContext'




export default function Home() {
    const {message, user} = useContext(BottleContext);
    
    

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
