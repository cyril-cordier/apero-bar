import React, {useContext, useEffect, useState, useMemo} from 'react'
import BottleFinder from '../apis/BottleFinder'
import Header from './DataTable/Header'
import Search from './DataTable/Search'
import Pagination from './DataTable/Pagination'
import { BottleContext } from '../context/BottleContext'
import useFullPageLoader from './hooks/useFullPageLoader'
import AddIngredient from './AddIngredient'


const IngredientsList = () => {
    const {ingredients, setIngredients, token} = useContext(BottleContext)
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({field:"", order:""});


    const ITEMS_PER_PAGE = 10;

    const headers = [
        {name: "Nom", field: "name", sortable:true},
        {name: "Base", field: "base"},
        {name: 'actions'}
    ];

    useEffect(() => {
        const ingredientsDispo = async () => {
            showLoader();
            try {
                const response = await BottleFinder('/ingredients')
                hideLoader();
                setIngredients(response.data.Ingredient)
                
                //console.log(response.data.Ingredient)
            } catch (err) {
                console.log(err)
            }
        }
        ingredientsDispo();
        // eslint-disable-next-line
    }, [setIngredients])


    const ingredientsData = useMemo(() => {
        let computedIngredients = ingredients;
        

        if(search){
            computedIngredients = computedIngredients.filter(
                ingredient => 
                ingredient.name.toLowerCase().includes(search.toLowerCase())                
            )
            
        }
        setTotalItems(computedIngredients.length);

    //Sorting ingredients
    if(sorting.field) {
        const reversed = sorting.order === "asc" ? 1 : -1;
        computedIngredients = computedIngredients.sort(
            (a,b) => 
            reversed * a[sorting.field].localeCompare(b[sorting.field])
        )}


    //Current Page slice
    return computedIngredients.slice(
        (currentPage -1) * ITEMS_PER_PAGE, 
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE)
}, [ingredients, currentPage, search, sorting])

const handleDelete =  async (e, id) => {
   
    //console.log(id)
        e.stopPropagation();
        try {
            await BottleFinder.delete(`/ingredients/${id}`, 
            {headers : {
                Authorization: `Bearer ${token}`
            }});
            setIngredients(ingredients.filter(ingredient => {
                return ingredient._id !== id
            }))

            //console.log(response);
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div>
            <h1 className="text-center">Ingredients disponibles</h1>
            <div className="row w-100">
                <div className="col mb-3 col-12 text-center">
                    <div className="row">
                        <div className="col-md-6">
                            <Pagination 
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={ page => setCurrentPage(page)}
                            
                            />

                        </div>
                        <div className="col-md-6 d-flex flex-row-reverse">
                            <Search 
                            onSearch={(value) => {
                                setSearch(value);
                                setCurrentPage(1)
                            }}
                            />
                        </div>
                    </div>
                </div>

                <AddIngredient/> 
            </div>
            <table className="table table-hover">
                <Header headers={headers} onSorting={(field, order) => setSorting({field, order}) }/>
                <tbody>
                    
                        {ingredientsData.map(ingredient => {
                            return (
                                <tr key={ingredient._id}>
                            
                                    <td>{ingredient.name}</td>
                                    <td>{ingredient.base === true ? "Oui" : "Non"}</td>
                                
                                <td ><button className="btn btn-danger" onClick={(e) => handleDelete(e, ingredient._id)}>Sup</button>
                                </td>
                                
                            </tr>
                            )
                        })}

                    
                    
                </tbody>
            </table>
            {loader}
        </div>
    )
}

export default IngredientsList
