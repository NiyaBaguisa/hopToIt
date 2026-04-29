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
            <div className="button-section"   >
                <button className="complete-button" style={{display: task.done ? 'none' : 'inline-block'}}
            onClick={()=> props.onComplete(task)} ><div className="text"><span>Complete</span></div></button>

            <button className="remove-button" style={{display: task.done ? 'none' : 'inline-block'}}
            onClick={()=> props.onRemove(task)}>
                <div className="text"><span>Delete</span></div>
              
                
            </button>
           

                </div>      
            
        </div>
    )
}

export default Task;