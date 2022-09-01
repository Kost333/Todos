import React, {useState} from 'react';
import s from "./add.module.css";

const Add = (props) => {
    const [text, setText] = useState('');

    const handleAdd = () => {
        props.addTodo(text)
        setText('')
    }

    return (
        <label className={s.labelAdd}>
            <input className={s.inputAdd}
                   type="text"
                   placeholder="What you want to do"
                   onChange={(e) => {
                       setText(e.target.value)
                   }}
                   value={text}
            />
            <button className={s.buttonAdd}
                    onClick={handleAdd}
            >Add
            </button>
        </label>
    );
};

export default Add;