import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      const newTask = {
        id: Date.now(),
        text: task,
        completed: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTask('');
    }
  };

  const handleTaskDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleTaskToggle = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Todo List</h1>
      <form onSubmit={handleFormSubmit} className="mb-4">
        <div className="input-group">
          <input type="text" className="form-control" value={task} onChange={handleInputChange} />
          <button type="submit" className="btn btn-primary">Add Task</button>
        </div>
      </form>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`list-group-item ${task.completed ? 'list-group-item-success' : ''}`}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
              </span>
              <div>
                <button
                  className={`btn btn-sm m-1 ${task.completed ? 'btn-secondary' : 'btn-success'}`}
                  onClick={() => handleTaskToggle(task.id)}
                >
                  {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button
                  className="btn btn-sm m-1 btn-danger ml-2"
                  onClick={() => handleTaskDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;