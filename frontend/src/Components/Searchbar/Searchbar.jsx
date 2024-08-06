import "./Searchbar.css";
import FilterImage from "../../../public/Document.png"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = ({ onFilterButtonClick }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault()
        navigate(`/search/${searchTerm}`);
    };

    return (
        <section className="searchbar-container">
            <div className="filter-button" onClick={onFilterButtonClick}>
                <img src={FilterImage} alt="Filter Icon" />
            </div>
            <div className="searchbar">
                <i className="fa-solid fa-magnifying-glass"></i>
                <form onSubmit={handleSearch}>
                <input 
                    type="search" 
                    name="searchbar" 
                    id="search" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </form>
            </div>
        </section>
    );
};

export default Searchbar;
