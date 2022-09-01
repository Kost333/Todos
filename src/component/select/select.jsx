import React, {useState} from 'react';
import s from "./select.module.css";

const Select = ({handleSelect}) => {

    const [selectedValue, setSelectedValue] = useState('')

    const handleInnerSelect = (val) => {
        setSelectedValue(val)
        handleSelect(val)
    }

    return (
        <div className={s.selector}>
            <select onChange={(e) => handleInnerSelect(e.target.value)} value={selectedValue} name="count"
                    className={s.selectCount}>
                <option value="">All</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
        </div>
    );
};

export default Select;