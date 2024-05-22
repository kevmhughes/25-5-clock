import React, { useState } from "react";
import "./App.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeftMinutes, setTimeLeftMinutes] = useState(25);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(60);

  let timerSeconds;
  if (timeLeftSeconds == 60) {
    timerSeconds = "00";
  } else if (timeLeftSeconds < 60) {
    timerSeconds = timeLeftSeconds;
  }

  const handleStartStop = () => {
    console.log("start_stop");
  };

  const handleReset = () => {
    console.log("reset");
    // timer should be stopped
    setBreakLength(5);
    setSessionLength(25);
  };

  const handleBreakDecrement = () => {
    setBreakLength(breakLength - 1);
    if (breakLength == 0) {
      setBreakLength(0);
    } 
  };

  const handleBreakIncrement = () => {
    setBreakLength(breakLength + 1);
    if (breakLength == 60) {
      setBreakLength(60);
    }
  };

  const handleSessionDecrement = () => {
    setSessionLength(sessionLength - 1);
    if (sessionLength == 0) {
      setSessionLength(0);
    }
  };

  const handleSessionIncrement = () => {
    setSessionLength(sessionLength + 1);
    if (sessionLength == 60) {
      setSessionLength(60);
    }
  };

  return (
    <>
      <div className="app-container">
        <h1>25 + 5 Clock</h1>
        <div className="break-and-session-length-container">
          <div className="break-outer-container">
            <div id="break-label" className="break-length-labels">Break Length</div>
            <div className="break-inner-container">
              <div onClick={handleBreakDecrement} id="break-decrement">
              &#8681;
              </div>
              <div id="break-length" className="break-length-numbers">{breakLength}</div>
              <div onClick={handleBreakIncrement} id="break-increment">
              &#8679;
              </div>
            </div>
          </div>
          <div className="session-outer-container">
            <div id="session-label" className="break-length-labels">Session Length</div>
            <div>
              <di className="session-inner-container">
                <div onClick={handleSessionDecrement} id="session-decrement">
                &#8681;
                </div>
                <div id="session-length" className="break-length-numbers">{sessionLength}</div>
                <div onClick={handleSessionIncrement} id="session-increment">
                &#8679;
                </div>
              </di>
            </div>
          </div>
        </div>

        <div className="clock-container">
          <div id="timer-label" className="timer-label">Session</div>
          <div id="time-left" className="time-left">
            {timeLeftMinutes}:{timerSeconds}
          </div>
        </div>
        <div>
          <div id="start_stop" onClick={handleStartStop}>
            start/stop
          </div>
          <div id="reset" onClick={handleReset}>
            reset
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default App;
