import "./Filters.css";
import GoBack from './../GoBack/GoBack';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from './../../api/api';
import { FilterContext } from "../../Context/Contexts.jsx"
 
const Filters = ({ onClose }) => {
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [selectedSort, setSelectedSort] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState(0);

    const { filters, setFilters } = useContext(FilterContext);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${backendUrl}/api/v1/categories/`)
          .then((res) => res.json())
          .then((data) => {
            setCategoryOptions(data);
          })
          .catch((err) => {
            console.log(err);
          });
    }, []);

    const handleSortClick = (sortType) => {
        setSelectedSort(prevSort => prevSort === sortType ? '' : sortType);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(prevCategory => prevCategory === category ? '' : category);
    };

    const handleRangeChange = (e) => {
        setPriceRange(e.target.value);
    };

    useEffect(() => {
        if(filters) {
            if(filters.maxPrice) {
                setPriceRange(filters.maxPrice)
            }
            if(filters.categoryName) {
                setSelectedCategory(filters.categoryName)
            }
            if(filters.sortBy) {
                setSelectedSort(filters.sortBy)
            }
        }
    }, [])

    const handleApplyFilters = () => {
        navigate(`/search`);
        setFilters({
            maxPrice: priceRange,
            categoryName: selectedCategory,
            sortBy: selectedSort,
        })
    };

    const handleClearFilters = () => {
        setSelectedSort('');
        setSelectedCategory('');
        setPriceRange(0);
        setFilters({});
    };

    return (
        <section className="filterpage">
            <GoBack title="Filters" onClick={onClose} />
            <div className="filter-top">
                <div className="filter-top-text">
                    <h1>Sort By</h1>
                    <p onClick={handleClearFilters}>Clear Filters</p>
                </div>
                <div className="filter-top-buttons">
                    {['Lowest', 'Highest', 'Best', 'Latest'].map((sortType) => (
                        <button
                            key={sortType}
                            className={`btn-light ${selectedSort === sortType ? 'selected' : ''}`}
                            onClick={() => handleSortClick(sortType)}
                        >
                            {sortType}
                        </button>
                    ))}
                </div>
            </div>
            <div className="filter-center">
                <h2>Price</h2>
                <input
                    type="range"
                    name="priceslider"
                    id="slider"
                    min={0}
                    max={250}
                    step={5}
                    value={priceRange}
                    onChange={handleRangeChange}
                />
                <span style={{fontWeight:"900"}}>${priceRange}</span>
            </div>
            <div className="filter-bottom">
                <div className="filter-bottom-text">
                    <h3>Category</h3>
                </div>
                <div className="filter-bottom-buttons">
                    {categoryOptions.map((item) => (
                        <button
                            className={`btn-light ${selectedCategory === item.name ? 'selected' : ''}`}
                            key={item.name}
                            onClick={() => handleCategoryClick(item.name)}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="btn-apply">
                <button className="btn-light" onClick={handleApplyFilters}>Apply Filters</button>
            </div>
        </section>
    );
};

export default Filters;
