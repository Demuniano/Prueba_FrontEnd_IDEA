import React from 'react'
//Hooks
import { useState } from 'react'
//Components
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

function CreateTask({modal, toggle,save}) {
    
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskPriority, setTaskPriority] = useState('')
    const [taskState, setTaskState] = useState('')


    const handleChange = (e) => {
        const {name, value} = e.target
        if (name === 'title') {
            setTaskName(value)
        }
        if (name === 'description') {
            setTaskDescription(value)
            console.log(taskDescription)
        }
        if (name === 'priority') {
            setTaskPriority(value)
            console.log(taskPriority)
            console.log('hola')
        }
        setTaskState('pendiente')
    }
    const handleSave = () => {
        let taskObj = {}
        taskObj['Title'] = taskName
        taskObj['Description'] = taskDescription
        taskObj['Priority'] = taskPriority
        taskObj['State'] = taskState
        
        save(taskObj)
    }

  return (
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Nueva tarea</ModalHeader>
        <ModalBody>
            <form>
                <div className='form-group'>
                    <label htmlFor='title'>Título</label>
                    <input type='text' className='form-control' id='title' placeholder='Nueva tarea' value={taskName} onChange={handleChange} name='title'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='description'>Descripción</label>
                    <textarea rows='4' className='form-control' id='description' placeholder='Descripcion' value={taskDescription} onChange={handleChange} name='description' />
                </div>
                <div className='form-group'>
                    <label htmlFor='priority'>Prioridad</label>
                    <select className='form-control' id='priority' value={taskPriority} onChange={handleChange} name='priority' >
                        <option>Seleccione una prioridad</option>
                        <option>Baja</option>
                        <option>Media</option>
                        <option>Alta</option>
                    </select>
                </div>
            </form>

        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={handleSave}>
                Do Something
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
                Cancel
            </Button>
        </ModalFooter>
    </Modal>
  )
}

export default CreateTask