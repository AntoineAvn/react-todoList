import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './index.css'
import LocalStorageExemple from './components/LocalStorageExemple.jsx'
import TodoList from './components/ToDoList.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <LocalStorageExemple /> */}
    <TodoList />
  </React.StrictMode>,
)
