import React, {useEffect, useContext, useState, useMemo} from 'react';
import {BottleContext} from '../context/BottleContext'
import BottleFinder from '../apis/BottleFinder'
import Header from './DataTable/Header'
import Search from './DataTable/Search'
import Pagination from './DataTable/Pagination'
import useFullPageLoader from './hooks/useFullPageLoader'
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';


export default function BottlesList(props) {
    const {user, bottles, setBottles, token, setIngredients} = useContext(BottleContext);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({field:"", order:""});
    const [headers, setHeaders] = useState([
        {name: "Nom", field: "name", sortable:true},
        // {name: "Categorie", field: "category", sortable:true},
        {name: "Type", field: "type", sortable:true},
        // {name: "Pays/Région", field: "country", sortable:true},
        {name: "Millésime", field: "vintage", sortable:true},
        // {name: "€", field: "price", sortable:true}
        ])
    let history = useHistory();
    const ITEMS_PER_PAGE = 50;
  

    
    useEffect(() => {
    
    if(user && user.is_admin === true) {
        setHeaders([...headers, {name: "actions", field: "actions"}])
    }
    // eslint-disable-next-line
}, [user])
useEffect(() => {
    
    const fetchData = async () => {
        showLoader();
        try {

            const fetchBottle = await BottleFinder.get("/bouteilles",{headers : {
                Authorization: `Bearer ${localStorage.getItem('bottletoken')}}`
            }
        })
            console.log("🚀 ~ file: BottlesList.js ~ line 42 ~ fetchData ~ fetchBottle", fetchBottle)
            // const fetchIngredients = await BottleFinder.get("/ingredients")

            //console.log(response.data.Bottle)
            setBottles(fetchBottle.data);
            // setIngredients(fetchIngredients.data.Ingredient);
            hideLoader();
        }catch(err) {
            console.log(err)
        }
    }
    
    fetchData()
    // eslint-disable-next-line
    }, [setBottles])


    const handleDelete =  async (e, id) => {

    console.log(id)
        e.stopPropagation();
        try {
            const response = await BottleFinder.delete(`/bouteilles/${id}`, 
            {headers : {
                Authorization: `Bearer ${token}`
            }});
            setBottles(bottles.filter(bottle => {
                return bottle.id !== id
            }))

            
            console.log(response);
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        history.push(`/bottles/${id}/update`)
    }


    const handleBottleSelect = (id) => {
        history.push(`/bottles/${id}`)
    }

    const bottleData = useMemo(() => {
        let computedBottles = bottles;
        

        if(search){
            computedBottles = computedBottles.filter(
                bottle => 
                bottle.name.toLowerCase().includes(search.toLowerCase()) ||
                bottle.category.toLowerCase().includes(search.toLowerCase()) ||
                bottle.type.toLowerCase().includes(search.toLowerCase()) ||
                bottle.country.toLowerCase().includes(search.toLowerCase())
                // bottle.country.toString().toLowerCase().includes(search.toLowerCase())
                
            )
            
        }
        setTotalItems(computedBottles.length);


        //Sorting bottles
        if(sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedBottles = computedBottles.sort(
                (a,b) => 
                reversed * a[sorting.field].localeCompare(b[sorting.field])
            )}


        //Current Page slice
        return computedBottles.slice(
            (currentPage -1) * ITEMS_PER_PAGE, 
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE)
    }, [bottles, currentPage, search, sorting])

    return (
        <div>
            
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


            </div>
            <table className="table table-hover">
                <Header headers={headers} onSorting={(field, order) => setSorting({field, order}) }/>
                <tbody>
                    
                        {bottleData && bottleData.map(bottle => {
                            return (
                            <tr onClick={() => handleBottleSelect(bottle._id)} key={bottle.id}>
                            
                                <td>{bottle.name}</td>
                                {/* <td>{bottle.category}</td> */}
                                <td>{bottle.type}</td>
                                {/* <td>{bottle.country}</td> */}
                                <td>{bottle.vintage}</td>
  
                                {user ? (user.is_admin ? <td className='row'>
                                    <button className="btn btn-warning" onClick={(e) => handleUpdate(e, bottle._id)}>Màj</button>
                                    
                                    <button className="btn btn-danger" onClick={(e) => handleDelete(e, bottle._id)}>Sup</button>
                                </td> : null) : null}

                            </tr>
                            )
                        })}

                    
                    
                </tbody>
            </table>
            {loader}
        </div>
    )
}
