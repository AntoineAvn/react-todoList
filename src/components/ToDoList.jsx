import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

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

  const handleTaskClick = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Todo List</h1>
      <small className='text-info'>(Cliquez sur le texte d'une tâche pour afficher la pop-up)</small> <br /> <br />
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
            <div
              className="d-flex justify-content-between align-items-center"
            >
              <span onClick={() => handleTaskClick(task)} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentTask && (
            <div>
              <h4>{currentTask.text}</h4>
              <p>Completed: {currentTask.completed ? 'Yes' : 'No'}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TodoList;
