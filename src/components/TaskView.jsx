import React from 'react'
//Styles
import '../sass/TaskView.scss'
//Components
import CreateTask from '../modalsWindows/CreateTask' 
//Hooks
import { useState,useEffect } from 'react'
//icons
import { FaPlusCircle } from "react-icons/fa";

import Card from './Card'
function TaskView() {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [taskList, setTaskList] = useState([])
    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem('taskList', JSON.stringify(tempList))
        setModal(false)
    }
    useEffect(() => {
        let arr = localStorage.getItem('taskList')
        if (arr) {
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])
    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem('taskList', JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }
    const updateList = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem('taskList', JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }
    

  return (
    <>
        <div className='title'>
            <h1>Task Manager</h1>
        
            <button className='btn btn-success' id='btn-createTask' onClick={()=>setModal(true)}><FaPlusCircle id='icon-createTask'/>Nueva tarea</button>
        </div>
        <div className='container mt-4'>
            {taskList.map((obj,index) => 
                <Card key={index} task={obj} index={index} deleteTask={deleteTask} updateList={updateList}/>
            )}
        </div>
        <CreateTask  modal={modal} toggle={toggle} save={saveTask}/>
    </>
  )
}

export default TaskView