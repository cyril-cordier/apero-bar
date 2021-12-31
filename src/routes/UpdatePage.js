import React, {useState, useEffect, useContext} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import BottleFinder from '../apis/BottleFinder'
import {BottleContext} from '../context/BottleContext'


export default function UpdatePage(props) {
    
        const {token} = useContext(BottleContext);
        const {id} = useParams();
        let history = useHistory();
        const [name, setName] = useState("")
        const [image, setImage] = useState("")
        const [special, setSpecial] = useState("")
        const [price, setPrice] = useState("")
        const [base, setBase] = useState("")
        const [status, setStatus] = useState("")
        
       

    useEffect(() => {
        const fetchData = async() => {
            const response = await BottleFinder.get(`/bouteilles/${id}`,
            {headers : {
                Authorization: `Bearer ${localStorage.getItem('bottletoken')}`
            }});
            console.log(response.data.Bottle)
            setName(response.data.name)
            setImage(response.data.image)
            // setPrice(response.data.Bottle.price)
            // setBase(response.data.Bottle.base)
            // setStatus(response.data.Bottle.status)
            // setSpecial(response.data.Bottle.special)
            

        }
        fetchData()
        
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            "categoryId": 1,
            "typeId": 1,
            "name": "nouveau",
            "vintage": 0,
            "details": "string",
            "image": "string",
            "countryId": 1,
            "volume": "string",
            "alcohol": 0,
            "quantity": 1,
            "display": true,
            "toBuy": true
          }
        try {
            await BottleFinder(`/bouteilles`, {
            method: 'post',
            headers : {
                'Authorization': `Bearer ${localStorage.getItem('bottletoken')}`,
                'Content-Type': 'application/json'
            },
            data : data
        });
        history.push("/");
        } catch (err) {
            console.log(err)
        }
        
                
    }

        
    return (
        <div>
            <h1 className="text-center">{name}</h1>
            <p className="text-center">Mise à jour</p>
            
            <form action="submit">
                <div className="form-group">
                    <label htmlFor="name">Nom</label>
                    <input value={name} onChange={e => setName(e.target.value)} id="name" type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="imge">Image</label>
                    <input value={image} onChange={e => setImage(e.target.value)} id="image" type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Prix</label>
                    <input value={price} onChange={e => setPrice(e.target.value)} id="price" type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="base">Base</label>
                    <input value={base} onChange={e => setBase(e.target.value)} id="base" type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="status">Statut</label>
                    <input value={status} onChange={e => setStatus(e.target.value)} id="status" type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="special">Speciale ?</label>
                    <input value={special} onChange={e => setSpecial(e.target.value)} id="special" type="text" className="form-control"/>
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                <button onClick={() => history.push(`/bottles/${id}`)} className=" btn btn-primary mx-5">Cancel</button>
            </form>
        </div>
    )
}
