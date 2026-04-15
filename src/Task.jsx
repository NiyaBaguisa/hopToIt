function Task(props){

    const task = {
        name: props.name,
        
        id: props.id,
        priority: props.priority,
        category: props.category,
        done: props.done,
    }

   



    return(
        <div className="task">
            <h3>{task.name}</h3>
            <div className="category-tag" style={{backgroundColor: task.category.color}}>
                <p>{task.category.value}</p>
            </div>            
            <button style={{display: task.done ? 'none' : 'inline-block'}}
            onClick={()=> props.onComplete(task)} >Complete</button>

            <button style={{display: task.done ? 'none' : 'inline-block'}}
            onClick={()=> props.onRemove(task)}>remove</button>

        </div>
    )
}

export default Task;