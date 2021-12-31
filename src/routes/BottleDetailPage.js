import React, {useState, useEffect, useContext} from 'react'
import { useParams, Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import BottleFinder from '../apis/BottleFinder'
import { BottleContext } from '../context/BottleContext';


export default function BottleDetailPage() {

        const {id} = useParams();
        const {user} = useContext(BottleContext);
        const [name, setName] = useState("")
        const [bottleData, setBottleData] = useState([])
        let history = useHistory()

    useEffect(() => {
        try {

            const fetchData = async() => {
                const response = await BottleFinder.get(`/bouteilles/${id}`, 
                {headers : {
                    Authorization: `Bearer ${localStorage.getItem('bottletoken')}`
                }});
                console.log(response.data)
                setName(response.data.name)
                setBottleData(response.data)
            }
                fetchData()
        }
        catch(err){

            console.log(err)
        }
        
    }, [id])

    const handleDelete =  async (e, id) => {

        console.log(id)
            e.stopPropagation();
            try {
                history.push('/')

                const response = await BottleFinder.delete(`/bouteilles/${id}`, 
                {headers : {
                    Authorization: `Bearer ${localStorage.getItem('bottletoken')}`
                }});
                // setBottles(bottles.filter(bottle => {
                //     return bottle.id !== id
                // }))
                window.location.reload()
                
            } catch (err) {
                console.log(err)
            }

        }
    
        const handleUpdate = (e, id) => {
            e.stopPropagation();
            history.push(`/bottles/${id}/update`)
        }

        
    return (
        <div>
            
            
            <h1 className="text-center">{name}</h1>
            
            <form action="">
            {user ? (user.role == 'admin' ? <div className="d-flex justify-content-between">
                                    <button className="btn btn-warning" onClick={(e) => handleUpdate(e, id)}>Mettre à jour</button>
                                    
                                    <Link to="/" ><button className="btn btn-danger" onClick={(e) => handleDelete(e, id)}>Supprimer</button></Link>
                                </div> : null) : null}
                <div className="form-group">
                    <p><label htmlFor="image">Image : </label> <b>{bottleData.image}</b></p>
                    <p><label htmlFor="categorie">Catégorie : </label> <b>{bottleData.category}</b></p>
                    <p><label htmlFor="type">Type : </label> <b>{bottleData.type}</b></p>
                    <p><label htmlFor="country">Pays/Région : </label> <b>{bottleData.country}</b></p>
                    <p><label htmlFor="vintage">Millésime/Age : </label> <b>{bottleData.vintage}</b></p>
                    <p><label htmlFor="alcohol">Degré alcool : </label> <b>{bottleData.alcohol} °</b></p>
                    <p><label htmlFor="volume">Volume : </label> <b>{bottleData.volume}cl</b></p>
                    <p><label htmlFor="detail">Détails : </label> <b>{bottleData.details}</b></p>
                    
                    
                </div>
                
            </form>
        </div>
    )
}
