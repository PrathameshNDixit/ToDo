import React, { useState, useEffect } from 'react'
import Navbar from './components/Nav/Navbar'
import "../src/App.css"
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const App = () => {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  useEffect(() => {
    let td = JSON.parse(localStorage.getItem("todos"))
    if (td) {
      settodos(td)
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  function handleAdd() {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    saveToLS()
  }
  function handleDelete(e, id) {
    let newTodo = todos.filter(t => t.id != id);
    settodos(newTodo)
    saveToLS()
  }
  function handleEdit(e, id) {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let nt = todos.filter(i => i.id != id)
    settodos(nt)
    saveToLS()
  }
  function handleChange(e) {
    settodo(e.target.value)
  }
  let handleCheckbox = (e) => {
    let id = e.target.name
    let idx = todos.findIndex(t => t.id === id)
    let newTodo = [...todos];
    newTodo[idx].isCompleted = !newTodo[idx].isCompleted
    settodos(newTodo)
    console.log(newTodo);
    saveToLS()
  }
  let handleFinished = (first) => {
    setshowFinished(!showFinished)
  }
  return (
    <>
      <Navbar />
      <div className="mybox mx-3  min-h-[80vh] my-5 md:mx-auto rounded-xl md:w-3/4 p-5 md:container bg-slate-300 ">
        <h2 className='text-lg font-bold'>Add a todo</h2>
        <input onChange={handleChange} value={todo} type="text" />
        <button onClick={handleAdd} disabled={todo.length <= 3} className='mx-2 disabled:bg-slate-400 bg-slate-400 hover:bg-slate-500 py-1 font-bold px-3 rounded-lg'>Add</button>
        <div><input onChange={handleFinished} type="checkbox" checked={showFinished} /> Show Finished</div>
        <h1 className='text-xl font-bold'>Your todos</h1>
        <div className="todos">
          {todos.length === 0 && <div>No todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo my-2 align-middle flex justify-between w-1/2 p-2 rounded-lg bg-slate-400">
              <input name={item.id} onChange={handleCheckbox} checked={item.isCompleted} type="checkbox" />
              <div className={item.isCompleted ? "line-through md:w-1/2" : "md:w-1/2"}>{item.todo}</div>
              <div className="btns flex items-start mx-3">
                <button onClick={(e) => { handleEdit(e, item.id) }} className="mx-2 bg-slate-500 hover:bg-slate-100 py-1 font-bold px-3 rounded-lg"><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="mx-2 bg-slate-500 hover:bg-slate-100 py-1 font-bold px-3 rounded-lg"><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App