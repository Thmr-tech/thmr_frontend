import React, { useState, useEffect, useContext } from 'react';
import TodoItem from './TodoItem';
import axios from 'axios';
import { AuthContext } from './AuthContext';


export default function TodoList() {
    const [categories, setCategories] = useState([]);
    const { authToken } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('categories/', {
                    headers: { 'Authorization': `Token ${authToken}` }
                });
                setCategories(response.data);
            } catch (error) {
                console.error('There was an error fetching todos: ', error);
            }
        };
        fetchData();
    }, [authToken]);


    const handleDelete = async (todoId, categoryId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this todo item?");

        if (isConfirmed) {
            try {
                await axios.delete(`tasks/${todoId}/`, {
                    headers: { 'Authorization': `Token ${authToken}` },
                });

                setCategories((prevCategories) =>
                    prevCategories.map((category) =>
                        category.id === categoryId
                            ? { ...category, tasks: category.tasks.filter((task) => task.id !== todoId) }
                            : category
                    )
                );
            } catch (error) {
                console.error('Error deleting todo:', error);
            }
        }
    };


    return (
        <div className="container mx-auto p-4 mt-8">
            {categories.map((category) => (
                <div key={category.id} className='mb-6 p-5 rounded-lg bg-white'>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 pb-2">{category.name}</h2>
                    <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mb-4"
                    >
                        Add Todo
                    </button>
                    <ul>
                        {category.tasks.map((todo) => (
                            <TodoItem key={todo.id} todo={todo} onDelete={() => handleDelete(todo.id, category.id)} />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}
