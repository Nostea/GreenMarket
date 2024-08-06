import { useContext, useEffect, useState } from "react";
import "./FilterButtonsSmall.css";
import { backendUrl } from "../../api/api";
import { FilterContext } from "../../Context/Contexts";
import { useNavigate } from "react-router-dom";

const FilterButtonsSmall = ({ filters, setFilters }) => {

    const [categories, setCategories] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${backendUrl}/api/v1/categories/`)
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const updateCategory = (value) => {
        let newFilters = Object.assign({}, filters)
        newFilters.categoryName = value;
        navigate("/search")
        setFilters(() => newFilters);
        
    }

    return (
        <section className="filterbuttons-small">
            {categories?.map((category, key) => (
                <div key={key}>
                    <p onClick={() => updateCategory(category.name)}>{category.name}</p>
                </div> 
            ))}
        </section>
    );
}
 
export default FilterButtonsSmall;