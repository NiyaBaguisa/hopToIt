import { useState, useRef } from "react";
function Pomodoro(){

    //auto work time and rest time transition
  
    const[workTime, setWorkTime] = useState(0.1) //25 minutes
    const[restTime, setRestTime] = useState(5) // 5 minutes
    //[minutes, seconds]
    const[timeText, setTimeText] = useState([0,0]);     
    //true = work false = rest
    const [sheet, setSheet] =useState("./spritesheets/frogIdleSpritesheet.png")
    const timerRef = useRef(true);
    const timerId = useRef();
    const workTimeRemaining = useRef(0)
    const restTimeRemaining = useRef(0)
    const numberOfPomodoro = useRef(0);
    const textOptions= ["Rest Time START! Working time is over!", "Work Time START! Resting time is over!"]
   const alarmSound = new Audio("./croak.mp3");

    //switch spritesheets and update frame count
    function setAnimation(filePath, frames, sheetWidth){
        setSheet(filePath);
        document.documentElement.style.setProperty('--frame-amt', frames)
        document.documentElement.style.setProperty('--sheet-width', sheetWidth)
        
    }

    //start pomodoro button
    function startPomodoro(){
        
        //convert worktime into seconds
         workTimeRemaining.current = workTime*60;
        //convert rest time into seconds
         restTimeRemaining.current = restTime*60;
        //after 4 consecutive pomodoros, take a longer break of 15 minutes


        const timer = setInterval(() =>{
            if(timerRef.current){
                //count down by 1 second
            workTimeRemaining.current--;
            //change the text on screen to match
            updateDisplay(workTimeRemaining.current)
            setAnimation("./spritesheets/workSpritesheet.png" , 24, '3072px');
            
            console.log("work",workTimeRemaining.current);
                if(workTimeRemaining.current <=0){
                    //play alarm sound
                   alarmSound.play().catch(error => console.error("Playback failed:", error));
                    //switch to rest time
                    timerRef.current =false;
                    //reset work time
                    workTimeRemaining.current = workTime*60;
                    notifyUser(textOptions[0]);
                }
            }else{
                restTimeRemaining.current--;
                //change the text on screen to match
                updateDisplay(restTimeRemaining.current)
                setAnimation("./spritesheets/frogRestSpritesheet.png", 12, '1536px');
               
                //console.log("rest:", restTimeRemaining.current);
                if(restTimeRemaining.current <=0){
                      //play alarm sound
                   alarmSound.play();
                   //switch to work time
                    timerRef.current=true;
                    //reset rest time
                    restTimeRemaining.current = restTime*60;
                    notifyUser(textOptions[1]);
                     numberOfPomodoro.current++;
                    // console.log(numberOfPomodoro.current)
                     //after 4 consecutive pomodoros, take a longer break of 15 minutes
                     if(numberOfPomodoro.current % 4 === 0 && numberOfPomodoro.current > 0 ){
                          restTimeRemaining.current = 15 *60;

                     }
                }
                
            }
        }, 1000)
          
        //keep track of the time
        timerId.current = timer;
    }
        // pause pomodoro button
    function pausePomodoro(){
        clearInterval(timerId.current);
        console.log("paused")
        setAnimation("./spritesheets/frogIdleSpritesheet.png", 16, '2624px')
         console.log(Notification.permission)
        

    }

    //end pomodoro session button

function endPomodoro(){
    clearInterval(timerId.current);

        // Reset everything
        timerRef.current = true;
        workTimeRemaining.current = 0;
        restTimeRemaining.current = 0;
        numberOfPomodoro.current = 0;
        setWorkTime(25);
        setRestTime(5);
        updateDisplay(workTimeRemaining.current);
        setAnimation("./spritesheets/frogIdleSpritesheet.png", 16, '2624px');

        console.log("Session ended");
       
    

        
    }
function updateDisplay(time){
    const minutes = Math.floor(time /60)
    const seconds = time % 60;
    setTimeText([minutes.toString(), seconds.toString()])
    

}

function notifyUser(t){
    if("Notification" in window){
        // do i have permission to send notifications
        if(Notification.permission === "granted"){
            notify(t);
            // ask for permission if not
        }else{
            //handle async sucess and failure
            Notification.requestPermission().then((result)=>{
                if(result === "granted"){
                 notify(t);
                }else if (result ==="denied"){
                    console.log("permission denied")
                    //user has not yet granted access
                }else if (result ==="default"){
                    console.log("permission not given")
                }

            })
        }
//notifications aren't supported in the user's browser
    }else{
        console.error("Notification not supported")
    }

}
    //check if browser supports notification api

    

    function notify(t){
           
            new Notification("Hop To It Pomodoro",{
            body:t,
            icon:"/hopToItIcon.png"
        });

       
    }
    return(
        <div className="pomodoro">
            <h1 className="logo">Hop To It</h1>
            <h1 className="time-text">{timeText[0]}:{timeText[1].toString()}</h1>
           
            <div className="button-container">
                <button className="pomodoro-button" onClick={startPomodoro}>Start Pomodoro</button>
                <button className="pomodoro-button" onClick={pausePomodoro}>Pause</button>
                <button className="pomodoro-button" onClick={endPomodoro}>End</button>
            </div>
            <div className="frog">
                 <img className="spriteSheet pixelart"src={sheet} alt="frog-sprites"/>
            </div>
           

        </div>
    )

}

export default Pomodoro;