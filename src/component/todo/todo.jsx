import React from 'react';
import s from "./todo.module.css";

const Todo = ({item, onHandleCheck, openModal, deleteTodo}) => {

    return (
        <div key={item.id} className={s.todoGlobal}>
            <div className={s.todo}>
                <h2 className='title'>{item.title}</h2>
            </div>

            <div className={s.buttonsEditDelete}>
                <input className={s.checkBox} type="checkbox" checked={item.completed}
                       onChange={() => onHandleCheck(item.id)}/>
                <i className={`fa fa-pencil-square-o ${s.editIcon}`} aria-hidden="true"
                   onClick={() => openModal(item)}></i>
                <i onClick={() => deleteTodo(item.id)}
                   className={`fa fa-trash ${s.deleteIcon}`}></i>
            </div>
        </div>
    );
};

export default Todo;