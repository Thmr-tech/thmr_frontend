import React from 'react';

export default function TodoForm({
  todoName,
  setTodoName,
  handleSubmit,
  handleCancel,
  placeholder,
}) {
  return (
    <form onSubmit={handleSubmit} className="flex justify-center mt-4">
      <input
        type="text"
        placeholder={placeholder}
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
        className="border-2 border-gray-300 p-2 rounded-md"
      />
      <button type="submit" className="ml-2 px-1 w-16 bg-blue-500 text-white rounded-md">
        Add
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="ml-2 px-1 w-16 bg-red-500 text-white rounded-md"
      >
        Cancel
      </button>
    </form>
  );
}