import React, {useState, useEffect, useContext} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import BottleFinder from '../apis/BottleFinder'
import {BottleContext} from '../context/BottleContext'


export default function UpdatePage(props) {
    
        const {token} = useContext(BottleContext);
        const {id} = useParams();
        let history = useHistory();
        const [name, setName] = useState("")
        const [ingredients, setIngredients] = useState("")
        const [special, setSpecial] = useState("")
        const [price, setPrice] = useState("")
        const [base, setBase] = useState("")
        const [status, setStatus] = useState("")
        
       

    useEffect(() => {
        const fetchData = async() => {
            const response = await BottleFinder.get(`/bottles/${id}`)
            console.log(response.data.Bottle)
            setName(response.data.Bottle.name)
            setIngredients(response.data.Bottle.ingredients)
            setPrice(response.data.Bottle.price)
            setBase(response.data.Bottle.base)
            setStatus(response.data.Bottle.status)
            setSpecial(response.data.Bottle.special)
            

        }
        fetchData()
        
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = JSON.stringify(
                [
                {"propName":"name","value":name},
                {"propName":"price","value":price},
                {"propName":"base","value":base},
                {"propName":"special","value":special},
                {"propName":"status","value":status},
                {"propName":"ingredients","value":ingredients}
                ])
        try {
            await BottleFinder(`/bottles/${id}`, {
            method: 'patch',
            headers : {
                'Authorization': `Bearer ${token}`, 
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
            <h1 className="text-center">Update Bottle</h1>
            <p className="text-center">secret page</p>
            
            <form action="submit">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} id="name" type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="ingredients">Ingrédients</label>
                    <input value={ingredients} onChange={e => setIngredients(e.target.value)} id="ingredients" type="text" className="form-control"/>
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
                <button onClick={() => history.push("/")} className=" btn btn-primary mx-5">Cancel</button>
            </form>
        </div>
    )
}
