import React, {useState, createContext} from 'react';

export const BottleContext = createContext();

export const BottleContextProvider = (props) => {
    const [bottles, setBottles] = useState([]);
    const [search, setSearch] = useState("");
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    
    const [selectedBottle, setSelectedBottle] = useState(null)
    const [message, setMessage] = useState(null)

    const addBottles = (bottle) => {
        setBottles([...bottles, bottle]);
    }
    const addIngredients = (ingredient) => {
        setIngredients([...ingredients, ingredient]);
    }
    

    return (
        <BottleContext.Provider value={{
            bottles, setBottles, addBottles, 
            search, setSearch, 
            selectedBottle, setSelectedBottle, 
            message, setMessage, 
            token, setToken, 
            user, setUser, 
            ingredients, setIngredients, addIngredients
            }}>
            {props.children}
        </BottleContext.Provider>
    );
}