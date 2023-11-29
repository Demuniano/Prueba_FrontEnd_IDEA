import React, { useState, useEffect } from 'react';
import '../sass/TaskView.scss';
// import CreateTask from '../modalsWindows/CreateTask';
import { FaPlusCircle } from 'react-icons/fa';
import TaskModal from '../modalsWindows/TaskModal';
import Card from './Card';

function TaskView() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [taskList, setTaskList] = useState([]);

  const saveTask = (taskObj) => {
    const updatedList = [...taskList, taskObj];
    localStorage.setItem('taskList', JSON.stringify(updatedList));
    setTaskList(updatedList);
    setModal(false);
  };

  useEffect(() => {
    const arr = localStorage.getItem('taskList');
    if (arr) {
      const obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  const deleteTask = (index) => {
    const tempList = [...taskList];
    tempList.splice(index, 1);
    localStorage.setItem('taskList', JSON.stringify(tempList));
    setTaskList(tempList);
  };

  const updateList = (obj, index) => {
    const tempList = [...taskList];
    tempList[index] = obj;
    localStorage.setItem('taskList', JSON.stringify(tempList));
    setTaskList(tempList);
  };

  return (
    <>
      <div className='title'>
        <h1>Task Manager</h1>
        <button className='btn btn-success' id='btn-createTask' onClick={() => setModal(true)}>
          <FaPlusCircle id='icon-createTask'/>
          Nueva tarea
        </button>
      </div>
      <div className='container mt-4'>
        {taskList.map((obj, index) => (
          <Card key={index} task={obj} index={index} deleteTask={deleteTask} updateList={updateList} />
        ))}
      </div>
      <TaskModal
        modal={modal}
        toggle={toggle}
        onSave={saveTask}
        initialState={{ Title: '', Description: '', Priority: '', State: 'Pendiente' }}
        isEdit={false}
      />
    </>
  );
}

export default TaskView;
