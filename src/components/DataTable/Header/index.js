import React, {useState} from 'react'

const Header = ({headers, onSorting}) => {

    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");

    const onSortingChange = field => {
        const order = field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order);
    }

    return (
        <thead className="bg-primary text-white">
            <tr>
                {headers.map( ({name, field, sortable}) => (
                <th key={name}
                    onClick= {() => sortable ? onSortingChange(field) : null }
                >{name} 
                
                {sortingField && sortingField === field && (
                    sortingOrder === "asc" ? <i className="fas fa-arrow-down"></i> : <i class="fas fa-arrow-up"></i>
                )}
                </th>))}
            </tr>
        </thead>
    )
}

export default Header
