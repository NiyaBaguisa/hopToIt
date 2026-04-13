import { useState } from "react";


function NewTaskBar(props){
const [inputText, setInputText] = useState(""); 
const [selectedPriority, setSelectedPriority] =useState("")


function handleInput(text){
        setInputText(text.target.value)
    }
function createNewTask(){
    if(inputText !== ""){
        const newTask ={
            name: inputText,
            desc:"this is a test.",
            id: Date.now(),
            priority: selectedPriority,
            category: "demo",
            done: false
        }
        props.sendData(newTask)
        //reset values
        setInputText("");
        setSelectedPriority("")
    }
}  

    function handleChange (event){
    setSelectedPriority(event.target.value);
}

 return(
        <div className="taskbar-container">
            <label>
                <input className="task-input" value={inputText} onChange={handleInput} placeholder="add a new task..."/>
            </label>
            <button className="addButton" onClick={createNewTask}>Add task</button>
            
            <label for="priority">
                <select 
                className="dropdown" 
                name="priority"
                value ={selectedPriority}
                onChange={handleChange}>
                    <option>Select Priority</option>
                    {props.priorityList.map((p)=>(
                        <option
                        key={p}
                        value={p}>
                            {p}
                        </option>
                    ))}
                </select>
            </label>

        </div>
    )

}

export default NewTaskBar;