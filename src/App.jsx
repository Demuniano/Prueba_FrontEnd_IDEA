import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskView from './components/TaskView'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  
  return (
    <div className='app'>
      <TaskView />
    </div>
  )
}

export default App
