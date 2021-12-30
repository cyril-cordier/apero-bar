import React from 'react'
import loading from '../../assets/images/loading.gif'


const FullPageLoader = () => {
    return (
        <div className="fp-container">
            <img src={loading} alt="chargement" className="fp-loader"/>
        </div>
    )
}

export default FullPageLoader;
