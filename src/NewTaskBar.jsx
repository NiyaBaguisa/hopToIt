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
    if(inputText !== "" && selectedPriority !=="Select Priority"&& selectedPriority !==""){
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
    }else{
        alert("Please enter a task name and a priority");
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
            <label className="task-label">
                <input className="task-input" value={inputText} onChange={handleInput} required placeholder="add a new task..."/>
            </label>
            <button className="add-button" onClick={createNewTask}>Add task</button>
            
            <label className="priority-label" for="priority">
                <select 
                className="dropdown" 
                name="priority"
                value ={selectedPriority}
                onChange={handleChange}
                required>
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
            <div className="cat-master">
                <label for="categoryColor" className="color-label">
                <input className="color-input" type="color" name="categoryColor" value={selectedColor} onChange={handleColor}/>
            </label>

            
         <label className="category-label" for="category">
            <input
            className="category-input"
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
            

                

        </div>
    )

}

export default NewTaskBar;