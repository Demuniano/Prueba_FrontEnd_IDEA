import React from 'react'
//Components
import EditTask from '../modalsWindows/EditTask'
//Hooks
import { useState } from 'react'
//styles
import '../sass/Card.scss'
function Card({task, index, deleteTask, updateList}) {

    const [modal, setModal] = useState(false);
    const handleDelete = () => {
        deleteTask(index)
    }
    const toggle = () => setModal(!modal);
    const updateTask = (task) => {
        updateList(task, index)
    }

  return (
    <div className='card'>
        <div className='card-header'>
            {task.Title}
        </div>
        <div className='card-body'>
            {task.Description}
        </div>
        <div className='card-footer'>
            {task.Priority}
        </div>
        <button className='btn btn-danger' onClick={handleDelete}>Eliminar</button>
        <button className='btn btn-warning' onClick={()=>setModal(true)}>Editar</button>
        <EditTask modal={modal} toggle={toggle} updateTask={updateTask} task={task}/>
    </div>
  )
}

export default Card