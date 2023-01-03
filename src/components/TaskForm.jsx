

const TaskForm = ({createTask, name, handleInputChange, isEditting, updateTask, index}) => {
  return (
    <form className="task-form" action="" onSubmit={isEditting ? updateTask :  createTask}>
        <input type="text" placeholder={isEditting ? `Edit the ${index == 0 ? index + 1 + "st" : index == 1 ? index + 1 +"nd" : index == 2 ? index + 1 +"rd" :  index + 1+"th" } task` : "Add a task"} name="name" value={name} onChange={handleInputChange} />
        <button type="submit">{isEditting ? "Edit" : "Add"}</button>
    </form>
  )
}

export default TaskForm