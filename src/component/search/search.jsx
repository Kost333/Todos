import React, {useState} from 'react';
import s from "./search.module.css";

const Search = ({searchTodo}) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (value) => {
        searchTodo(value)
        setSearchValue(value)
    }


    return (
        <label className={s.labelSearch}>
            <input className={s.inputSearch}
                   type="text"
                   placeholder="What you want to search"
                   value={searchValue}
                   onChange={(e) => handleSearch(e.target.value)}
            />
        </label>
    );
};

export default Search;