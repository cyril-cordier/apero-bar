import React, {useContext, useState} from 'react'
import {BottleContext} from '../context/BottleContext'
import BottleFinder from '../apis/BottleFinder'
import { useHistory } from 'react-router-dom'

export default function AddBottle() {
    const {addBottles, token, ingredients} = useContext(BottleContext);
    const [name, setName] = useState("");
    const [bottleIngredients, setBottleIngredients] = useState([]);
    const [price, setPrice] = useState("");
    const [base, setBase] = useState("Sauce tomate");
    const [special, setSpecial] = useState(false);
    const [status, setStatus] = useState("disponible");
    
    
    let history = useHistory();


    

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await BottleFinder.post("/bottles", {
                name, 
                ingredients : bottleIngredients[0] ? bottleIngredients[0].substr(0,1).toUpperCase() + bottleIngredients.join(', ').substr(1) : "",
                price,
                special,
                base, 
                status
            }, {headers : {
                Authorization: `Bearer ${token}`
            }});
            //console.log(response.data.createdBottle)
            addBottles(response.data.createdBottle);
            history.push('/')
        } catch (err) {
            console.log(err)
        }

    }

    const handleSelectIngredient = (value) => {
        const checked = bottleIngredients.includes(value);
        //console.log(checked)
        checked ? setBottleIngredients(bottleIngredients.filter((data) => data !== value)) : setBottleIngredients([...bottleIngredients, value])
        
        //console.log(bottleIngredients[0] ? bottleIngredients[0].substr(0,1).toUpperCase() + bottleIngredients.join(', ').substr(1) : "")
    }

    return (
        <>
            <div>

                <h1 className="text-center">Add Bottle</h1>
                <p className="text-center">secret page</p>
            </div>
        
            
            <form className="mb-4" action="">
                <div className="row form-row">
                    <div className="col">
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control" placeholder="Nom"/>
                    </div>
                    <div className="col">
                        <input type="text" value={price} onChange={e => setPrice(e.target.value)} className="form-control" placeholder="Prix"/>
                    </div>
                    
                </div>
                <div className="row form-row">
                    <div className="col">
                      <select className=" form-control" value={base} onChange={e => setBase(e.target.value)} >
                        <option>Sauce tomate</option>
                        <option>Crème fraîche</option>
                      </select>
                    </div>
                    <div className="col">
                        <select className=" form-control" value={special} onChange={e => setSpecial(e.target.value)} >
                          <option value="false">Ordinaire</option>
                          <option value="true">Spéciale</option>
                      </select>
                    </div>
                </div>
                <div className="row form-row">
                    <div className="col">
                        <select className=" form-control" value={status} onChange={e => setStatus(e.target.value)} >
                          <option value="true">Disponible</option>
                          <option value="false">Non disponible</option>
                      </select>
                    </div>
                </div>
                <div className="row from-row">
                <div className="col">
                        <p className="mt-3">Ingrédients :</p>
                        <p>{bottleIngredients[0] ? bottleIngredients[0].substr(0,1).toUpperCase() + bottleIngredients.join(', ').substr(1) : ""} </p>
                    </div>
                </div>
                <div className="form-group">
    
  </div>

{ingredients ? ingredients.map(ingredient => 
  <div className="form-check form-check-inline" key={ingredient._id}>
    <input className="form-check-input" 
    type="checkbox"  
    id={ingredient._id} 
    value={ingredient.name} 
    onClick={(e) => handleSelectIngredient(e.target.value)}
    />
    <label className="form-check-label" htmlFor={ingredient._id}>{ingredient.name.substr(0,1).toUpperCase() + ingredient.name.substr(1)}</label>
  </div>
) : null}





  {/* <div className="form-group">
    <label htmlFor="exampleFormControlFile1">Example file input</label>
    <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
  </div> */}
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary col mx-3">Add</button>
            </form>  
            

            
        </>
        
        
    )
}
