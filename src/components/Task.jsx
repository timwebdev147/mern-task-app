import {FaCheckDouble, FaEdit, FaRegTrashAlt, FaTimesCircle } from 'react-icons/fa'

const Task = ({task, deleteFunction, getSingleTask, index, setToComplete}) => {
    
    




  return (

    <div className={task.completed == true ? "task completed" : "task" }>
        <p>
            <b>{index + 1}. </b>
            {task.name}
        </p>
        <div className="task-icons">
            <span className='complete-icon' >
            <FaCheckDouble className='complete-icon' color='green' onClick={setToComplete} />
            <span></span>
            </span>
            <span className='edit-icon' >
            <FaEdit color='black' className='edit-icon' onClick={getSingleTask} />
            <span></span>
            </span>
            <span className='delete-icon' >
            <FaRegTrashAlt  onClick={deleteFunction} color='red'/>
            <span></span>
            </span>
        </div>
    </div>
  )
}

export default Task