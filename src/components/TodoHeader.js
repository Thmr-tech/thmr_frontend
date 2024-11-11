import React, { useState } from 'react';
import TodoForm from './TodoForm';
import axios from 'axios';

export default function TodoHeader() {
    const [showTodoListForm, setShowTodoListForm] = useState(false);
    const [showTodoItemForm, setShowTodoItemForm] = useState(false);
    const [todoListName, setTodoListName] = useState('');
    const [todoItemName, setTodoItemName] = useState('');

    const handleAddTodoListClick = () => {
        setShowTodoListForm(!showTodoListForm);
        setShowTodoItemForm(false);
    };

    const handleAddTodoItemClick = () => {
        setShowTodoItemForm(!showTodoItemForm);
        setShowTodoListForm(false);
    };

    const handleTodoListSubmit = async (e) => {
        // e.preventDefault();
        // console.log('Todo List Added:', todoListName);
        // setTodoListName('');
        // setShowTodoListForm(false);

        try {
            await axios.post('categories/')
            setTodoListName('');
            setShowTodoListForm(false);
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    const handleTodoItemSubmit = (e) => {
        e.preventDefault();
        // Add your logic to submit the Todo Item data
        console.log('Todo Item Added:', todoItemName);
        setTodoItemName(''); // Clear the input after submission
        setShowTodoItemForm(false); // Hide the form after submission
    };

    const handleCancelTodoListForm = () => {
        setTodoListName('');
        setShowTodoListForm(false);
    };

    const handleCancelTodoItemForm = () => {
        setTodoItemName('');
        setShowTodoItemForm(false);
    };

    return (
        <div className="mt-14">
            <div className="flex justify-center gap-9">
                <button
                    className="w-36 border-2 border-black border-solid p-2 rounded-md font-['Roboto'] cursor-pointer"
                    onClick={handleAddTodoListClick}
                >
                    Add todo list
                </button>
                <button
                    className="w-36 border-2 border-black border-solid p-2 rounded-md font-['Roboto'] cursor-pointer"
                    onClick={handleAddTodoItemClick}
                >
                    Add todo item
                </button>
            </div>

            {showTodoListForm && (
                <TodoForm
                    todoName={todoListName}
                    setTodoName={setTodoListName}
                    handleSubmit={handleTodoListSubmit}
                    handleCancel={handleCancelTodoListForm}
                    placeholder="Enter Todo List Name"
                />
            )}

            {showTodoItemForm && (
                <TodoForm
                    todoName={todoItemName}
                    setTodoName={setTodoItemName}
                    handleSubmit={handleTodoItemSubmit}
                    handleCancel={handleCancelTodoItemForm}
                    placeholder="Enter Todo Item"
                />
            )}
        </div>
    );
}
