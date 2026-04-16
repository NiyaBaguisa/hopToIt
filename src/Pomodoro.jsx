import { useState, useRef } from "react";
function Pomodoro(){

    //auto work time and rest time transition
  
    const[workTime, setWorkTime] = useState(.05) //25 minutes
    const[restTime, setRestTime] = useState(.05) // 5 minutes
    //[minutes, seconds]
    const[timeText, setTimeText] = useState([0,0]);     
    //true = work false = rest
    const timerRef = useRef(true);
    const timerId = useRef();
    const workTimeRemaining = useRef(0)
    const restTimeRemaining = useRef(0)
    const numberOfPomodoro = useRef(0);

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
            console.log("work",workTimeRemaining.current);
                if(workTimeRemaining.current <=0){
                   
                    //switch to rest time
                    timerRef.current =false;
                    //reset work time
                    workTimeRemaining.current = workTime*60;
                }
            }else{
                restTimeRemaining.current--;
                //change the text on screen to match
                updateDisplay(restTimeRemaining.current)
                //console.log("rest:", restTimeRemaining.current);
                if(restTimeRemaining.current <=0){
                   //switch to work time
                    timerRef.current=true;
                    //reset rest time
                    restTimeRemaining.current = restTime*60;
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

    }

    //end pomodoro session button

function endPomodoro(){
    clearInterval(timerId.current);

        // Reset everything
        timerRef.current = true;
        workTimeRemaining.current = 0;
        restTimeRemaining.current = 0;
        numberOfPomodoro.current = 0;
        setWorkTime(0.05);
        setRestTime(0.05);
        updateDisplay(workTimeRemaining.current)

        console.log("Session ended");
    

        
    }
function updateDisplay(time){
    const minutes = Math.floor(time /60)
    const seconds = time % 60;
    setTimeText([minutes.toString(), seconds.toString()])
    

}


    // popup that will show how long user worked and number of pomodoros
    return(
        <div className="pomodoro">
            <h1>{timeText[0]}:{timeText[1].toString()}</h1>
           
            <div className="button-container">
                <button id="pomodoro-button" onClick={startPomodoro}>Start Pomodoro</button>
                <button id="pomodoro-button" onClick={pausePomodoro}>Pause</button>
                <button id="pomodoro-button" onClick={endPomodoro}>End Pomodoro</button>
            </div>
        </div>
    )

}

export default Pomodoro;