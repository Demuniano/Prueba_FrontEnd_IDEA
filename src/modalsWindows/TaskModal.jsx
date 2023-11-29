import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

function TaskModal({ modal, toggle, onSave, task, isEdit }) {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [taskState, setTaskState] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTaskName(task.Title || '');
      setTaskDescription(task.Description || '');
      setTaskPriority(task.Priority || '');
      setTaskState(task.State || 'Pendiente');
    } else {
      setTaskName('');
      setTaskDescription('');
      setTaskPriority('');
      setTaskState('Pendiente');
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTaskName(value);
    }
    if (name === 'description') {
      setTaskDescription(value);
    }
    if (name === 'priority') {
      setTaskPriority(value);
    }
    setTaskState('Pendiente');
  };

  const handleUpdate = () => {
    const trimmedName = taskName.trim();
    const trimmedDescription = taskDescription.trim();
    const trimmedPriority = taskPriority.trim();

    if (!trimmedName || !trimmedDescription || !trimmedPriority) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    const updatedTask = {
      ...task,
      Title: trimmedName,
      Description: trimmedDescription,
      Priority: trimmedPriority,
      State: taskState,
    };

    onSave(updatedTask);
    toggle();
    clearFields(); // Call the clearFields function after saving the task
    setError('');
  };

  const clearFields = () => {
    setTaskName('');
    setTaskDescription('');
    setTaskPriority('');
    setTaskState('Pendiente');
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {isEdit ? 'Modificar tarea' : 'Crear tarea'}
      </ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        <form>
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Nueva tarea"
              value={taskName}
              onChange={handleChange}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              rows="4"
              className="form-control"
              id="description"
              placeholder="Descripcion"
              value={taskDescription}
              onChange={handleChange}
              name="description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="priority">Prioridad</label>
            <select
              className="form-control"
              id="priority"
              value={taskPriority}
              onChange={handleChange}
              name="priority"
            >
              <option>Seleccione una prioridad</option>
              <option>Poco importante</option>
              <option>Importante</option>
              <option>Muy importante</option>
            </select>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button className="btn btn-success" onClick={handleUpdate}>
          Guardar
        </Button>{' '}
        <Button className="btn btn-danger" onClick={toggle}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default TaskModal;
