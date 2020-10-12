import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (todos) setTodos(todos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = e => {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(todos => {
      return [...todos, {id: uuidv4(), name: name, completed: false}]
    })
    todoNameRef.current.value = null
  }

  const clearAllTodos = () => {
    setTodos([])
  }

  const clearTodos = () => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const toggleTodo = id => {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type='text'/>
      <button onClick={addTodo}>add</button>
      <button onClick={clearTodos}>clear completed</button>
      <button onClick={clearAllTodos}>clear all</button>
      <div>{todos.filter(todo => !todo.completed).length} left</div>
    </>
  )
}

export default App;
