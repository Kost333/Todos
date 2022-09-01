import React, {useEffect, useState} from 'react';
import s from './todos.module.css';
import Modal from "react-modal";
import Add from "../add/add";
import Search from "../search/search";
import Select from "../select/select";
import Todo from "../todo/todo";

const Todos = () => {

    const [state, setState] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchedState, setSearchedState] = useState(state);
    const [edit, setEdit] = useState({});
    const [editText, setEditText] = useState('');
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        setSearchedState(state)
    }, [state])

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${selectedValue}`)
            .then(response => response.json())
            .then(json => setState(json))
    }, [selectedValue])

    const onHandleCheck = (id) => {
        setState(prevState => prevState.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    completed: !item.completed
                }
            } else {
                return item
            }
        }))
    }

    const deleteTodo = (id) => {
        setState(state.filter((item) => item.id !== id));
    }

    const openModal = (item) => {
        setModalIsOpen(true)
        setEdit(item)
        setEditText(item.title)
    }

    const searchTodo = (value) => {
        if (!!value) {
            setSearchedState(prev => prev.filter(item => item.title.toLowerCase().includes(value.toLowerCase())));
        } else {
            setSearchedState(state)
        }
    }

    const handleSelect = (value) => {
        setSelectedValue(value)
    }


    const addTodo = (text) => {
        if (text.length) {
            setState([{id: Math.random(), title: text, completed: false}, ...state])
        }
    }

    const saveText = () => {
        setEditText('')
        setEdit({})
        setModalIsOpen(false)
        setState(prevState => prevState.map(item => {
            if (item.id === edit.id) {
                return {
                    ...item,
                    title: editText
                }
            } else {
                return item
            }
        }))
    }

    const closeModal = () => {
        setModalIsOpen(false);
        setEditText('')
        setEdit({})
    }

    return (
        <div className={s.globalWindow}>
            <div className={s.todos}>
                <div className={s.todoTitle}>
                    <h1 className={s.todoTitleText}>TO-DO LIST</h1>
                </div>
                <Add addTodo={addTodo}/>
                <Search searchTodo={searchTodo}/>
                <Select handleSelect={handleSelect}/>
                <div className={s.todoList}>
                    {
                        searchedState.map((item => {
                            return <Todo
                                item={item}
                                onHandleCheck={onHandleCheck}
                                openModal={openModal}
                                deleteTodo={deleteTodo}
                            />
                        }))
                    }
                </div>

                <Modal isOpen={modalIsOpen}
                       ariaHideApp={false}
                       onRequestClose={closeModal}
                       className={s.modal}>
                    <div>
                        <i onClick={closeModal} className={`fa fa-times ${s.closeModal}`} aria-hidden="true"></i>
                    </div>
                    <div>
                        <p className={s.modalTitleText}>{edit.title}</p>
                    </div>
                    <div className={s.inputSave}>
                        <div>
                            <input className={s.modalInput} type="text" value={editText}
                                   onChange={(e) => setEditText(e.target.value)}/>
                        </div>
                        <div>
                            <button className={s.modalSaveButton} onClick={saveText}>save</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Todos;