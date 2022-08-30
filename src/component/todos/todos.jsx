import React, {useEffect, useState} from 'react';
import s from './todos.module.css';
import Modal from "react-modal";

const Todos = () => {

    const [state, setState] = useState([]);
    const [searchedState, setSearchedState] = useState(state);
    const [text, setText] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [edit, setEdit] = useState({});
    const [editText, setEditText] = useState('');
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        setSearchedState(state)
    }, [state])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => setState(json))
    }, [])

    const searchTodo = (value) => {
        setSearchValue(value)
        if(!!value){
            setSearchedState(prev => prev.filter(item => item.title.toLowerCase().includes(value.toLowerCase())));
        }else{
            setSearchedState(state)
        }
    }

    const addTodo = () => {
        if (text.length) {
            setState([{id: Math.random(), title: text, completed: false}, ...state])
            setText('')
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

    const deleteTodo = (id) => {
        setState(state.filter((item) => item.id !== id));
    }

    const openModal = (item) => {
        setModalIsOpen(true)
        setEdit(item)
        setEditText(item.title)
    }

    const closeModal = () => {
        setModalIsOpen(false);
        setEditText('')
        setEdit({})
    }

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



    return (
        <div className={s.globalWindow}>
            <div className={s.todos}>
                <div className={s.todoTitle}>
                    <h1 className={s.todoTitleText}>TO-DO LIST</h1>
                </div>
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
                            onClick={() => addTodo()}
                    >Add
                    </button>
                </label>

                <label className={s.labelSearch}>
                    <input className={s.inputSearch}
                           type="text"
                           placeholder="What you want to search"
                           value={searchValue}
                           onChange={(e) => searchTodo(e.target.value)}
                    />
                </label>

                <div className={s.todoList}>
                    {
                        searchedState.map((item) => (
                                <div key={item.id} className={s.todoGlobal}>
                                    <div className={s.todo}>
                                        <h2 className='title'>{item.title}</h2>
                                    </div>

                                    <div className={s.buttonsEditDelete}>
                                        <input className={s.checkBox} type="checkbox" checked={item.completed} onChange={() => onHandleCheck(item.id)}/>
                                        <i className={`fa fa-pencil-square-o ${s.editIcon}`} aria-hidden="true"
                                           onClick={() => openModal(item)}></i>
                                        <i onClick={() => deleteTodo(item.id)}
                                           className={`fa fa-trash ${s.deleteIcon}`}></i>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
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
    );
};

export default Todos;