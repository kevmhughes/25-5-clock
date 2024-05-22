import React, { useState } from "react";
import "./App.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25)
  const [timeLeftMinutes, setTimeLeftMinutes] = useState(25)
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(60)

  let timerSeconds;
  if (timeLeftSeconds == 60) {
    timerSeconds = "00"
  } else if (timeLeftSeconds < 60) {
    timerSeconds = timeLeftSeconds
  }


  const handleStartStop = () => {
    console.log("start_stop")
  }

  const handleReset = () => {
    console.log("reset")
    // timer should be stopped
    setBreakLength(5)
    setSessionLength(25)
  }

  const handleBreakDecrement = () => {
    setBreakLength(breakLength - 1)
    if (breakLength == 0) {
      setBreakLength(0)
    }
  }

  const handleBreakIncrement = () => {
    setBreakLength(breakLength + 1)
  }

  return (
    <>
      <div>
        <div className="break-and-session-length-container">
        <div className="break-outer-container">
        <div id="break-label">Break Length</div>
        <div className="break-inner-container">
        <div onClick={handleBreakDecrement} id="break-decrement">break -</div>
        <div id="break-length">{breakLength}</div>
        <div onClick={handleBreakIncrement} id="break-increment">break +</div>
        </div>
        </div>
        <div>
        <div id="session-label">Session Length</div>
        <div>
        <div onClick={""} id="session-decrement"></div>
        <div id="session-length">{sessionLength}</div>
        <div onClick={""} id="session-increment"></div>
        </div>
        </div>
        </div>


        <div>
          <div id="timer-label">Session</div>
          <div id="time-left">{timeLeftMinutes}:{timerSeconds}</div>
        </div>
        <div>
          <div id="start_stop" onClick={handleStartStop}>start/stop</div>
          <div id="reset" onClick={handleReset}>reset</div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default App;
