import React, {useState, useContext} from 'react';
import BottleFinder from '../apis/BottleFinder'
import { BottleContext } from '../context/BottleContext'
    
    const AddIngredient = () => {
    const {ingredients, addIngredients, token} = useContext(BottleContext);
    const [name, setName] = useState("");
    const [base, setBase] = useState(false);
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState("");
    const [forceRecord, setForceRecord] = useState(false);


    const messages = {
        success: "Ingrédient créé avec succès",
        error : "Ingrédient déjà enregistré", 
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const test = ingredients.filter(ingredient => 
            ingredient.name.toLowerCase().includes(name.toLowerCase()))
            setStatus("error")
            
        if(test.length>0 && forceRecord === false) {
                setMessage(messages.error)
            }else{
                try {
                    const response = await BottleFinder.post("/ingredients", {
                        name, 
                        base
                    }, 
                    {headers : {
                        Authorization: `Bearer ${token}`
                    }});
                    //setMessage({...message, status : "success"})
                    addIngredients(response.data.createdIngredient);
                    setName("")
                    setBase(false)
                    setForceRecord(false)
                    setMessage(messages.success)
                    setStatus("success")
                    setTimeout(() => {
                        setMessage('')
                        setStatus('')
                      }, 2000);
                    
                } catch (err) {
                    console.log(err)
                }
            }

            

    }

    

    return (
        <div className="mb-4">
            <form action="submit">
                <div className="row form-row">
                    <div className="col text-center">
                        <label htmlFor="nom">Ingrédient</label>
                        <input type="text" id="nom" value={name} onChange={e => setName(e.target.value)} className="form-control" placeholder="Nom"/>
                    </div>
                    
                    <div className="col text-center">
                        <label htmlFor="base">Base</label>
                        <select 
                        id="base"
                        value={base}
                        onChange={e => setBase(e.target.value)}
                        className="form-control mr-sm-2">
                            <option disabled>Base</option>
                            <option value="true">Oui</option>
                            <option value="false">Non</option>
                        </select>
                    </div>
                    <div className="col text-center" >
                        <label  htmlFor="forceRecord">Forcer Enregistrement</label>
                        <input className="form-check-input " 
                        type="checkbox"  
                        id="forceRecord" 
                        value={forceRecord}
                        onClick={() => {setForceRecord(!forceRecord)}}
                        />
                    </div>
                    
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary col mx-3">Add</button>
                    
                </div>
            </form>  
            {message && status && status === 'success' ? <div className="alert alert-success">{messages.success}</div> : null}
            {message && status && status === 'error' ? <div className="alert alert-danger">{messages.error}</div> : null}
                      
        </div>
    )
}

export default AddIngredient
