# Hop To It – A todo list and pomodoro timer

The motivation behind this project was to practice using CRUD principles, as well as working with React state management and components. I also used this project as an introduction to learning about local storage, and sprite animation using CSS. I was also able to build more confidence in working with time based functions.

## Table of contents

- [Overview](#overview)
  - [Functional Requirements](#functional-requirements)
   - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Acknowledgements](#acknowledgements)
- [Author](#author)

## Overview

### Functional Requirements

Users should be able to:

- Create tasks for their own to-do list
- Give each task a name, priority and category
- View all added tasks which are automatically sorted by level of priority
- Create custom category names and label colors
- Mark a task as completed
- View all completed tasks for the current session
- View all uncompleted tasks across sessions
- Filter tasks by category
- Delete unwanted previously added tasks
- Start, stop and end a pomodoro timer at will
- Receive desktop alerts for pomodoro state changes
- View Frog sprite animation that updates alongside the pomodoro timer
- View the optimal layout for the content depending on their device’s screen size
- See hover states for all interactive elements on the page


### Links

- [Github URL](https://github.com/NiyaBaguisa/hopToIt/tree/main)
- [Live Site URL](https://niyabaguisa.github.io/hopToIt/)

## My process

### Built with

- HTML5
- CSS
- Flexbox
- JSX
-Browser localStorage
-Notification API
- [React](https://reactjs.org/) - JS library
- [Aesprite](https://www.aseprite.org/) - pixel art software

### What I learned that I am most proud of:

#### Lifting state and Passing data via props
For the to-do list portion of this project, I had three main components:
-ToDoList component
The ToDoList component is where all the tasks are rendered and sorted into their respective lists. It is also where the array that holds the category list is housed.
-Task component
The Task Component takes in data and displays a single task div element with the correct data as well as the remove, and complete buttons for each task. 
-NewTaskBar component
The NewTaskBar component is where the data for each task is entered in by the user. It is also where new categories are added if there are any.

The Task and NewTaskBar components are siblings as they are both children of the ToDoList component. The task component needs the data created in  the NewTaskBar in order to properly display each task and category. However it is difficult to pass data between sibling components so I needed to lift up the states, and data from the NewTaskBar to the parent ToDoList component so that it can then be passed down from the ToDoList to the Task component. I accomplished this using the function handleChildData and the prop sendData.


The NewTaskBar component takes in a prop called sendData which contains the handleChildData function defined in the ToDoList component. The handleChildData function takes in an array as an argument.
```js
// 0: newtask 1: {newcatval, color}
    function handleChildData(newArr) {
        //add newcat to category list
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
```
The NewTaskBar component then passes in an array as the argument for the sendData prop. This array contains two objects: the first object contains data for a new task created in NewTaskBar and the other object contains data for the new category if there is one.

```js
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

```



### Continued development

As I continue to grow on my programming journey something that I would like to learn more about is local storage and session storage. It was really cool to see the data in the Chrome Development tools as I was working with it, but there is still quite a lot I do not know. For example I know how to set items in local storage but I don’t know how to remove them. But as this project was my first time even touching that technology, I know that the more I incorporate it into future projects the more I will learn. 

In future projects I would also like to add more interactivity and customization to my websites. I want to allow the user to be able to do more than what I allowed for this project. For instance in Hop To It, the user can create and delete tasks, but they can’t edit tasks. The user can also create categories but they can’t necessarily delete them. I think that this goal is also tied to more form validation work as well, so I will continue to focus on form validation as well and create even more refined projects in the future.

I also want to get better at understanding UseEffect, this was my first time implementing it into a project, but I feel that once I get a better understanding of async functions and UseEffect I will be able to make more efficient and optimized applications in the future


### Useful resources

- [Local Storage for Beginners | JavaScriptTutorial](https://www.youtube.com/watch?v=-ZRDZyUjEEI) - This helped me understand some of the basics of local storage.. I really liked how OpenJavaScript explained the principles very simply.
- [JavaScript Timer – How to Set a Timer Function in JS](https://www.freecodecamp.org/news/javascript-timer-how-to-set-a-timer-function-in-js/) - This is an amazing article which helped me understand the differences between setTimeout and SetInterval. I'd recommend it to anyone still learning this concept.
- [Sprite sheet animation tutorial with HTML and CSS](https://www.youtube.com/watch?v=ekI7vjkFrGA) - This is a great video which helped me implement the sprite sheets I’d drawn into the application as an animation. 
- [Show Desktop Notifications](https://www.youtube.com/watch?v=ssUcK23bjxc) - This video was a great walkthrough of how the Notifications API works.

## Acknowledgements
- [CSS Button Hover #2](https://codepen.io/thelaazyguy/pen/brryVq)
- [Algolia](https://copy-paste-css.com/)
- [Matemaise Font](https://fonts.google.com/specimen/Matemasie?preview.text=Hop%20To%20It&categoryFilters=Feeling:%2FExpressive%2FLoud&preview.script=Latn&specimen.preview.text=Hop+To+It)
- [Chiron GoRound TC Font](https://fonts.google.com/specimen/Chiron+GoRound+TC?preview.text=high%20low%20done%20medium%20complete&specimen.preview.text=high+low+done+medium+complete&categoryFilters=Sans+Serif:%2FSans%2FRounded)

## Author

- Github - [@NiyaBaguisa](https://github.com/NiyaBaguisa)
- LinkedIn - [Niya Baguisa](https://www.linkedin.com/in/niyayates/)




