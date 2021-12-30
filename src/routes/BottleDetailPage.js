import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import BottleFinder from '../apis/BottleFinder'


export default function BottleDetailPage() {

        const {id} = useParams();
        
        //const {restaurants} = useContext(RestaurantsContext);
        const [name, setName] = useState("")
        const [bottleIngredients, setBottleIngredients] = useState("")
        

    useEffect(() => {
        const fetchData = async() => {
            const response = await BottleFinder.get(`/bottles/${id}`)
            console.log(response.data.Bottle)
            setName(response.data.Bottle.name)
            setBottleIngredients(response.data.Bottle.ingredients)
            

        }
        fetchData()
        
    }, [id])

        
    return (
        <div>
            
            
            <h1 className="text-center">Detail Bottle</h1>
            
            <form action="">
                <div className="form-group">
                    
                    <h2>{name}</h2>
                </div>
                <div className="form-group">
                    <label htmlFor="ingredients">Ingrédients :</label>
                    <p>{bottleIngredients}</p>
                </div>
                
            </form>
        </div>
    )
}
