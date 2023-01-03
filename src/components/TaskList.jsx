import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Task from "./Task"
import TaskForm from "./TaskForm"


 
const TaskList = () => {

    const [formData, setFormData] = useState({
        name: '',
        completed: false
    })
    const [isEditting, setIsEditting] = useState(false)
    const [taskId, setTaskId] = useState("")
    const [taskName, setTaskName] = useState("")
    const [taskIndex, setTaskIndex] = useState("")
    const [completedTasksIndex, setCompletedTasksIndex] = useState("")

    const {name} = formData

    const handleInputChange = (e) => {

        const {name, value} = e.target

        setFormData({
            ...formData,
            [name]: value
        })
        
    }


    const createTask = async (e) => {
        e.preventDefault()
        if (name == '') {
            return toast.error('input field cannot be empty')
        }

        
        await axios.post(
            '/api/tasks',
            formData
        )
        .then(() => {
            setFormData({
                ...formData,
                name: ''
            })
            toast.success('Task was created successfully!')
        })
        .catch((error) => {
            toast.error(error.message)
        })
        

    } 


    const [tasks, updatetasks] = useState([])
    
    const getTasks = async () => {

        axios.get(
            '/api/tasks'
        )
        .then((result) => {
            const task = result.data
            updatetasks(task);

            if (tasks != []) {
                let number = 0
                for (let index = 0; index < tasks.length; index++) {
                    const element = tasks[index];
                    if (element.completed == true) {
                        number++
    
                    }
                    
                    
                    setCompletedTasksIndex(number)
                }
    
            }
        })
        .catch((error) => {
            toast.error(error.message)
            console.log(error);
        })
    } 

    const deleteTask = async (id) => {

        await axios.delete(`/api/tasks/${id}`)
        .then(() => {
            toast.success('Task deleted successfully')
        } )
        .catch((error) => {
            toast.error(error.message)
            console.log(error)
        })

    }

    const getSingleTask = (task, index) => {
        setFormData({
            ...formData,
            name: task.name,
            completed: false
        })
        setIsEditting(true)
        setTaskId(task._id)
        setTaskName(task.name)
        setTaskIndex(index)
    }

    const updateTask = async (e) => {
        e.preventDefault()
        
        if (name == '') {
            return toast.error('input field cannot be empty')
        }
        if (name == taskName) {
            return toast.error('entered name is the same with the current name')
        }
        

        await axios.put(`/api/tasks/${taskId}`, formData)
        .then(() => {
            toast.success('Task updated successfully')
            setFormData({
                ...formData,
                name: '',
            })
            setIsEditting(false)
            setTaskId('')
            setTaskName('')
        })
        .catch((error) => {
            toast.error(error.message)
            console.log(error)
        })
    }

    const setToComplete = async (task) => {
        
        const newFormData = {
            name: task.name,
            completed: true
        }
        try {
            await axios.put(
                `/api/tasks/${task._id}`,
                newFormData
            )
            toast.success('task has been completed!')
        } catch (error) {
            toast.error(error.message)
            console.log(error);
        }
    }


    useEffect(() => {
        getTasks()
    
        
      
    }, [createTask, deleteTask])
    


  return (
    <div>
        <h2>Task Manager</h2>
        <TaskForm name={name} handleInputChange={handleInputChange} createTask={createTask} isEditting={isEditting} updateTask={updateTask} index={taskIndex} />
        <div className="--flex-between --pb" >

            <p>
                <b>Total Tasks:</b> {tasks.length}
            </p>
            <p>
                <b>Completed Tasks:</b> {completedTasksIndex}
            </p>

        </div>
        <hr />
        
        {
            
            tasks.map((task, index) => (
                <Task key={task._id} index={index} task={task} deleteFunction={() => deleteTask(task._id)} getSingleTask={() => getSingleTask(task, index)} setToComplete={() => setToComplete(task)} />
            ))
        }
    </div>
  )
}

export default TaskList