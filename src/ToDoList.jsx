import { useState } from "react";
import NewTaskBar from "./NewTaskBar";
import Task from "./Task";

function ToDoList(){
        //priority types, hide done from priority list
    const priorityList = ["Low Priority", "Medium Priority", "High Priority"];
    //list sections
    const [lowList, setLowList] = useState([]);
    const [medList, setMedList] = useState([]);
    const [highList, setHighList] = useState([]);
    const [doneList, setDoneList] = useState([]);

    function handleChildData(newTask){
        //if task is not done, sort it in the columns
      if (newTask.done == false){
        if(newTask.priority === "Low Priority"){
         setLowList([newTask,...lowList]);
        }else if(newTask.priority === "Medium Priority"){
            setMedList([newTask,...medList])
        }else if(newTask.priority === "High Priority"){
            setHighList([newTask,...highList])
        }      
    }
}
  
    function handleComplete(completedTask){
    let taskToMove;
    if (completedTask.priority === "Low Priority") {
        taskToMove = lowList.find(task => task.id === completedTask.id);
        setLowList(lowList.filter(task => task.id !== completedTask.id));
    } else if (completedTask.priority === "Medium Priority") {
        taskToMove = medList.find(task => task.id === completedTask.id);
        setMedList(medList.filter(task => task.id !== completedTask.id));
    } else if (completedTask.priority === "High Priority") {
        taskToMove = highList.find(task => task.id === completedTask.id);
        setHighList(highList.filter(task => task.id !== completedTask.id));
    }
    if (taskToMove) {
        taskToMove.done = true;
        setDoneList([taskToMove, ...doneList ]);
    }

    }

    function handleRemove(removedTask){
        if(removedTask.done === true){
            setDoneList(doneList.filter(task => task.id !== removedTask.id));
        }
        else if(removedTask.priority === "Low Priority"){
            setLowList(lowList.filter(task => task.id !== removedTask.id));
        }else if(removedTask.priority === "Medium Priority"){
            setMedList(medList.filter(task => task.id !== removedTask.id));
        }else if(removedTask.priority === "High Priority"){
            setHighList(highList.filter(task => task.id !== removedTask.id));
        }
    }

    return(
        <div className="left-section">
            <NewTaskBar
            sendData={handleChildData}
            priorityList ={priorityList}/>
       
         <div className="list-section">
            <div className="p-container">
                <h1>Low</h1>
                <ul>
                    {lowList.map((task) =>(
                        <li key={task.id}>
                            <Task
                            name={task.name}
                            desc = {task.desc}
                            id ={task.id}
                            priority ={task.priority}
                            category ={task.category}
                            done = {task.done}
                            onComplete={handleComplete}
                            onRemove={handleRemove}
                            
                            />

                        </li>
                    ))}

                </ul>
               
            </div>
            <div className="p-container">
                <h1>Medium</h1>
                  <ul>
                    {medList.map((task) =>(
                        <li key={task.id}>
                            <Task
                            name={task.name}
                            desc = {task.desc}
                            id ={task.id}
                            priority ={task.priority}
                            category ={task.category}
                            done = {task.done}
                            onComplete={handleComplete}
                            onRemove={handleRemove}
                            />
                        </li>
                    ))}

                </ul>
            </div>
            <div className="p-container">
                <h1>High</h1>
                  <ul>
                    {highList.map((task) =>(
                        <li key={task.id}>
                            <Task
                            name={task.name}
                            desc = {task.desc}
                            id ={task.id}
                            priority ={task.priority}
                            category ={task.category}
                            done = {task.done}
                            onComplete={handleComplete}
                            onRemove={handleRemove}
                            />

                        </li>
                    ))}

                </ul>
            </div>
            <div className="p-container">
                <h1>Done</h1>
                <ul>
                    {doneList.map((task) =>(
                        <li key={task.id}>
                            <Task
                            name={task.name}
                            desc = {task.desc}
                            id ={task.id}
                            priority ={task.priority}
                            category ={task.category}
                            done = {task.done}
                            
                            />

                        </li>
                    ))}

                </ul>
            </div>
        </div>
        </div>
       
        

    );
}

export default ToDoList;