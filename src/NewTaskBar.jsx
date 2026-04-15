import { useState } from "react";



function NewTaskBar(props){
const [inputText, setInputText] = useState(""); 
const [selectedPriority, setSelectedPriority] =useState("")
const [selectedCategory, setSelectedCategory] =useState({});
const [newCategory, setNewCategory] = useState({});
const [selectedColor, setSelectedColor] = useState("#ffffff");

function handleInput(text){
        setInputText(text.target.value)
    }

function createNewTask(){
    if(inputText !== ""){
        const newTask ={
            name: inputText,
            id: Date.now(),
            priority: selectedPriority,
            category: selectedCategory,
            done: false
        }
        props.sendData([newTask, newCategory])
        //reset values
        setInputText("");
        setSelectedPriority("");
        setSelectedCategory({value:"", color:""});
        setNewCategory({})
        setSelectedColor("#ffffff")
    }
}  

    function handleChange (event){
    setSelectedPriority(event.target.value);
}


function handleCategory(event){
    const categoryValue = event.target.value;
    
    // Check if it's an existing category - compare c.value (string) to categoryValue (string)
    const existingCat = props.categoryList.find(c => c.value.toLowerCase() === categoryValue.trim().toLowerCase());
    
    if(existingCat){
        setSelectedCategory(existingCat);
                setNewCategory({});
    } else if(categoryValue.trim() !== ""){
        // It's a new category
       
        setSelectedCategory({value: categoryValue.trim(), color: selectedColor});
        setNewCategory({value: categoryValue.trim(), color: selectedColor});
    }
}

function handleColor(event){
    const ncolor = event.target.value
    setSelectedColor(ncolor);
    // If a new category is being created, update its color
    if (newCategory.value) {
        setSelectedCategory(prev => ({ ...prev, color:ncolor }));
        setNewCategory(prev => ({ ...prev, color: ncolor }));
    }
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
            <label for="categoryColor">
                <input type="color" name="categoryColor" value={selectedColor} onChange={handleColor}/>
            </label>

            
         <label for="category">
            <input
            list="categories"
            name="category"
            value={selectedCategory.value}
            onChange={handleCategory}
            placeholder="Select or create category..."
            style={{backgroundColor: selectedCategory.color}}/>
            <datalist id="categories">
                {props.categoryList.map((c)=>(
                        <option
                        key={c.value}
                        value={c.value}>
                            {c.value}
                        </option>))}
            </datalist>       
              </label>

                

        </div>
    )

}

export default NewTaskBar;