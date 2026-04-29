import { useState, useEffect } from "react";
import NewTaskBar from "./NewTaskBar";
import Task from "./Task";

function ToDoList() {
    //priority types, hide done from priority list
    const priorityList = ["Low Priority", "Medium Priority", "High Priority"];
    //set category list to the local storage one otherwise if there is nothing in storage set it to the default
   const [categoryList, setCategoryList] = useState(() => {
    const saved = localStorage.getItem('categoryList');
    return saved ? JSON.parse(saved) : [
        { value: "Work", color: "#000000" },
        { value: "Hobby", color: "#D1AE00" },
        { value: "Learning", color: "#0011D1" }
    ];
});
    //list sections
    const [lowList, setLowList] = useState([]);
    const [medList, setMedList] = useState([]);
    const [highList, setHighList] = useState([]);
    const [doneList, setDoneList] = useState([]);
    // filter state
    const [selectedFilters, setSelectedFilters] = useState({});
   //filter div toggle
   const [isVisible, setIsVisible] = useState(false);
   
    //inital load data, if nothing is stored yet load empty array
useEffect(() => {
    const low = JSON.parse(localStorage.getItem('lowList')) || [];
    const med = JSON.parse(localStorage.getItem('medList')) || [];
    const high = JSON.parse(localStorage.getItem('highList')) || [];
  
    setLowList(low);
    setMedList(med);
    setHighList(high);
    
}, []);
//store low med high and category lists in local storage when the lists change
useEffect(() => {
    localStorage.setItem('lowList', JSON.stringify(lowList));
}, [lowList]);

useEffect(() => {
    localStorage.setItem('medList', JSON.stringify(medList));
}, [medList]);

useEffect(() => {
    localStorage.setItem('highList', JSON.stringify(highList));
}, [highList]);

useEffect(() => {
    localStorage.setItem('categoryList', JSON.stringify(categoryList));
}, [categoryList]);


    // 0: newtask 1: {newcatval, color}
    function handleChildData(newArr) {
        //add newcaat to category list
        if (newArr[1]?.value && !categoryList.some(c => c.value.trim().toLowerCase() === newArr[1].value.trim().toLowerCase())) {
            setCategoryList([...categoryList, newArr[1]])
          
        };
        //if task is not done, sort it in the columns
        if (newArr[0].done === false) {
            if (newArr[0].priority === "Low Priority") {
                setLowList([newArr[0], ...lowList]);
            } else if (newArr[0].priority === "Medium Priority") {
                setMedList([newArr[0], ...medList])
            } else if (newArr[0].priority === "High Priority") {
                setHighList([newArr[0], ...highList])
            }
        }
    }

    function handleComplete(completedTask) {
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
            setDoneList([taskToMove, ...doneList]);
        }

    }

    function handleRemove(removedTask) {
        if (removedTask.done === true) {
            setDoneList(doneList.filter(task => task.id !== removedTask.id));
        }
        else if (removedTask.priority === "Low Priority") {
            setLowList(lowList.filter(task => task.id !== removedTask.id));
        } else if (removedTask.priority === "Medium Priority") {
            setMedList(medList.filter(task => task.id !== removedTask.id));
        } else if (removedTask.priority === "High Priority") {
            setHighList(highList.filter(task => task.id !== removedTask.id));
        }
    }

    function showFilters() {
        //display div 
        setIsVisible(!isVisible);


    }
    function isFiltered(task) {
        //for the values that are true in the selected filters object they are active filters
    const isFilterActive = Object.values(selectedFilters).some(v => v === true);
// if isFilterActive falsy = show all everything
    if (!isFilterActive) return false;
    // 
    return !Object.keys(selectedFilters).filter(key => selectedFilters[key]).includes(task.category.value);
}

    function handleFilters(event) {
        const target = event.target;
        const name = target.name;
        //add the checked box into the object
        setSelectedFilters({ ...selectedFilters, [name]: target.checked });
        console.log(selectedFilters)

    }
    return (
        <div className="left-section">
            <NewTaskBar
                sendData={handleChildData}
                priorityList={priorityList}
                categoryList={categoryList} />
            <div className="master-filter-container">
                <button onClick={showFilters} className="filter-btn">Filter</button>
                <div className="filter-container"style={{ display: isVisible ? 'flex': 'none'}}>
                    {categoryList.map((c) => (
                        <label>
                            <input
                            key={c.value}
                                type="checkbox"
                                name={c.value}
                                checked={selectedFilters[c.value] || false}
                                onChange={handleFilters} />
                                {c.value}
                        </label>))}

                </div>
            </div>

            <div className="list-section">
                <div className="p-container">
                    <h1>Low</h1>
                    <ul>
                        {lowList.filter(task => !isFiltered(task)).map((task) => (
                            <li key={task.id}>
                                <Task
                                    name={task.name}
                                    desc={task.desc}
                                    id={task.id}
                                    priority={task.priority}
                                    category={task.category}
                                    done={task.done}
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
                        {medList.filter(task => !isFiltered(task)).map((task) => (
                            <li key={task.id}>
                                <Task
                                    name={task.name}
                                    desc={task.desc}
                                    id={task.id}
                                    priority={task.priority}
                                    category={task.category}
                                    done={task.done}
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
                        {highList.filter(task => !isFiltered(task)).map((task) => (
                            <li key={task.id}>
                                <Task
                                    name={task.name}
                                    desc={task.desc}
                                    id={task.id}
                                    priority={task.priority}
                                    category={task.category}
                                    done={task.done}
                                    onComplete={handleComplete}
                                    onRemove={handleRemove}
                                />

                            </li>
                        ))}

                    </ul>
                </div>
                <div className="p-container">
                    <h1 className="done">Done</h1>
                    <ul>
                        {doneList.filter(task => !isFiltered(task)).map((task) => (
                            <li key={task.id}>
                                <Task
                                    name={task.name}
                                    desc={task.desc}
                                    id={task.id}
                                    priority={task.priority}
                                    category={task.category}
                                    done={task.done}

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