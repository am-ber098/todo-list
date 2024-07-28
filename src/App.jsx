/**import { useState } from 'react'
import Navbar from './components/Navbar'

function App() {
  const [todo, settodo] = useState(""); // Input text
  const [todos, settodos] = useState([]); // Hold all todos, an array

  const handleEdit = () => {
    // Edit logic here
  }

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    settodos(newTodos);
  }

  const handleAdd = () => {
    if (todo.trim()) {
      settodos([...todos, { todo, isCompleted: false }]);
      settodo("");
    }
  }

  const handleChange = (e) => {
    settodo(e.target.value); // Change input value
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-sm p-5 bg-sky-100 min-h-[80vh]">
        <div className='addTodo my-5'>
          <h2 className='text-lg font-bold'>Add a ToDo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-1/2' />
          <button onClick={handleAdd} className='bg-blue-800 text-white hover:bg-blue-950 py-1 text-sm font-bold rounded-md mx-6'>Add Tasks</button>
        </div>
        <h2 className='text-lg font-bold'>Your Todo</h2>
        <div className='todos'>
          {todos.map((item, index) => (
            <div key={index} className='todo flex w-1/4 my-3 justify-between'>
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className='buttons'>
                <button onClick={handleEdit} className='bg-blue-800 text-white hover:bg-blue-950 py-1 text-sm font-bold rounded-md mx-1'>Edit</button>
                <button onClick={() => handleDelete(index)} className='bg-blue-800 text-white hover:bg-blue-950 py-1 text-sm font-bold rounded-md mx-1'>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
 **/

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import './index.css';

function App() {
  const [todo, settodo] = useState(""); // Input text
  const [todos, settodos] = useState([]); // Hold all todos, an array
  const [editId, setEditId] = useState(null); // Store the id of the task being edited
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    settodos(savedTodos);
  }, []);
  
  const savetoLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  const handleEdit = (e, id) => {
    let t = todos.find(i => i.id === id);
    settodo(t.todo);
    setEditId(id);
  }

  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id);
    settodos(newTodos);
    savetoLS(newTodos);
  }

  const handleAdd = () => {
    if (todo.trim()) {
      let newTodos;
      if (editId) {
        newTodos = todos.map(item =>
          item.id === editId ? { ...item, todo } : item
        );
        setEditId(null);
      } else {
        newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      }
      settodos(newTodos);
      savetoLS(newTodos);
      settodo("");
    }
  }

  const handleChange = (e) => {
    settodo(e.target.value); // Change input value
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
    savetoLS(newTodos);
  }

  const toggleShowFinished = () => {
    setshowFinished(!showFinished);
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-3xl p-5 bg-indigo-300 min-h-[80vh] md:w-1/2">
        <div className='addTodo my-5 flex flex-col gap-4'>
          <h2 className='text-lg font-bold text-center  text-blue-900 '>Add Your To-do</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg p-3 py-2 ' placeholder='Write your tasks here!'/>
          <button onClick={handleAdd} className='bg-blue-800 text-white hover:bg-blue-950 py-1 text-sm font-bold rounded-md '>
            {editId ? "Update Task" : "Add Task"}
          </button>
        </div>
        <div className='my-3'>
          <input type="checkbox" checked={showFinished} onChange={toggleShowFinished} /> Show Finished
        </div>
        <h2 className='text-lg font-bold  text-blue-900'>Your Todo</h2>
        <div className='todos'>
          {todos.filter(item => showFinished || !item.isCompleted).map((item, index) => (
            <div key={item.id} className='todo flex w-1/2 my-3 justify-between'>
              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className='buttons flex h-full'>
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-blue-800 text-white hover:bg-blue-950 py-1 text-sm font-bold rounded-md mx-2 '> <FiEdit3 /></button>
                <button onClick={() => handleDelete(item.id)} className='bg-blue-800 text-white hover:bg-blue-950 py-1 text-sm font-bold rounded-md mx-1'> <MdDeleteForever /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
