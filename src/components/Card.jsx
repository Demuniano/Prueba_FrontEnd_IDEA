import React, { useState } from 'react';
import TaskModal from '../modalsWindows/TaskModal';
import { FaEdit } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import '../sass/Card.scss';
import '../sass/Modals.scss';

function Card({ task, index, deleteTask, updateList }) {
  const [modal, setModal] = useState(false);

  const handleDelete = () => {
    deleteTask(index);
  };

  const toggle = () => setModal(!modal);

  const updateTask = (task) => {
    updateList(task, index);
  };

  const getPriorityColor = () => {
    switch (task.Priority) {
      case 'Muy importante':
        return 'priority-important';
      case 'Importante':
        return 'priority-moderate';
      case 'Poco importante':
        return 'priority-low';
      default:
        return '';
    }
  };

  const toggleTaskState = () => {
    const updatedTask = { ...task, State: task.State === 'Pendiente' ? 'Completada' : 'Pendiente' };
    updateTask(updatedTask);
  };

  return (
    <div className="card">
      <div className="card__title">
        {task.Title}
        <div className="state">
          <button onClick={toggleTaskState}>{task.State}</button>
        </div>
      </div>
      <div className={`card__priority ${getPriorityColor()}`}>{task.Priority}</div>
      <div className="card__description">{task.Description}</div>
      <div className="buttons-container">
        <button className="btn btn-danger" onClick={handleDelete}>
          <MdCancel className="icon" />
          Eliminar
        </button>
        <button className="btn btn-primary" onClick={toggle}>
          <FaEdit className="icon" />
          Editar
        </button>
      </div>
      <TaskModal modal={modal} toggle={toggle} onSave={updateTask} task={task} isEdit={true} />
    </div>
  );
}

export default Card;
