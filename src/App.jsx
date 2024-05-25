import React, { useState } from "react";
import "./App.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  // controls minutes of the timer
  const [timeLeftMinutes, setTimeLeftMinutes] = useState(25);
  // controls seconds of the timer
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(60);

  if (timeLeftMinutes < 10) {
    document.querySelector("#time-left-minutes").textContent = "0" + timeLeftMinutes
  }

  // sets seconds to 60
  let seconds = timeLeftSeconds;
  // setInterval variables
  let ticker;
  let ticker2;


  /*  reduces seconds of the timer by one every 1000 ms (1 sec), puts a zero before numbers (0)9 and below & resets seconds to 60 when the textContent of the seconds field reaches 00 */
  function reduceSeconds() {
    let secondsField = document.querySelector("#time-left-seconds");
    seconds -= 1;
    secondsField.textContent = seconds;

    // puts a zero before numbers (0)9 and below
    if (seconds < 10) {
      secondsField.textContent = "0" + seconds;
    }

    // resets seconds to 60 when the textContent of the seconds field reaches 00
    if (secondsField.textContent == "00") {
      seconds = timeLeftSeconds;
      secondsField.textContent = "00";
    }
    ZeroInFrontOfMinutesWhenLessThan10() 
  }

  // reduces timer of the clock by one every 60,000 ms (60 secs)
  function reduceMinutes() {
    let minutes = document.querySelector("#time-left-minutes").textContent;
    minutes -= 1;
    document.querySelector("#time-left-minutes").textContent = minutes;

  }

  // is invoked when the timer reaches 0:00 & sets timer to previously chosen session length
  function stopTheTimer() {
    clearInterval(ticker);
    clearInterval(ticker2);
    ticker = null;
    ticker2 = null;
    document.querySelector("#time-left-minutes").textContent = sessionLength;
    document.querySelector("#time-left-seconds").textContent = "00";
  }

  // is invoked when the user presses reset & sets the timer to 25:00
  function resetTheTimer() {
    clearInterval(ticker);
    clearInterval(ticker2);
    ticker = null;
    ticker2 = null;
    document.querySelector("#time-left-minutes").textContent = "25";
    document.querySelector("#time-left-seconds").textContent = "00";
  }

  // stops the timer when it reaches 0:00
  function stopTheTimerAt00() {
    if (
      document.querySelector("#time-left-minutes").textContent == "00" &&
      document.querySelector("#time-left-seconds").textContent == "00"
    ) {
      stopTheTimer();
    }
  }

  // starts seconds timer & stops the timer on click
  function startTimer() {
    reduceSeconds();
    stopTheTimerAt00();
  }

  // starts minutes timer on click
  function startTimerTwo() {
    reduceMinutes();
  }

  // reduces the minutes by one on starting the timer, so that 25:00 becomes 24:59 after one second and not 25:59
  function reduceMinutesByOneOnStartTimer() {
    if (
      document.querySelector("#time-left-minutes").textContent ==
        timeLeftMinutes &&
      document.querySelector("#time-left-seconds").textContent == "00"
    ) {
      document.querySelector("#time-left-minutes").textContent =
        timeLeftMinutes - 1;
    }
  }

  function ZeroInFrontOfMinutesWhenLessThan10() {
    if (document.querySelector("#time-left-minutes").textContent < 10) {
      document.querySelector("#time-left-minutes").textContent = `0${timeLeftMinutes - 1}`;
    }

    if (document.querySelector("#time-left-minutes").textContent < 10 && document.querySelector("#time-left-minutes").textContent.length == 2) {
      console.log("hello")
    }
  }

  // handles onClick of the start/stop button
  const handleStartStop = () => {
    setTimeout(reduceMinutesByOneOnStartTimer, 1000);

    if (!ticker) {
      ticker = setInterval(startTimer, 1000);
    } else if (ticker) {
      clearInterval(ticker);
      ticker = null;
    }

    if (!ticker2) {
      ticker2 = setInterval(startTimerTwo, 60000);
    } else if (ticker2) {
      clearInterval(ticker2);
      ticker2 = null;
    }
  };

  // handles resetting of the timer to the default session length (25) and to the default break length (5) onClick of the reset button
  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    resetTheTimer();
    document.querySelector("#add-zero").textContent = null
  };

  const handleBreakDecrement = () => {
    setBreakLength(breakLength - 1);
    if (breakLength == 1) {
      setBreakLength(1);
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
    
    if (timeLeftMinutes > 10) {
      setTimeLeftMinutes(timeLeftMinutes - 1);
      document.querySelector("#add-zero").textContent = ""
    } else if (timeLeftMinutes == 1) {
      setTimeLeftMinutes(1);
    } else {
      document.querySelector("#add-zero").textContent = 0
      setTimeLeftMinutes(timeLeftMinutes - 1);
    } 

    if (sessionLength == 1) {
      setSessionLength(1);

    }
    
    console.log("dec", timeLeftMinutes, typeof timeLeftMinutes)

  };

  const handleSessionIncrement = () => {
    setSessionLength(sessionLength + 1);
    
    /*   CONTINUE FROM HERE */
    if (timeLeftMinutes < 9) {
      document.querySelector("#add-zero").textContent = 0
      setTimeLeftMinutes(timeLeftMinutes + 1);
    } else {
      setTimeLeftMinutes(timeLeftMinutes + 1);
      document.querySelector("#add-zero").textContent = null
    }
    

    console.log("incText", document.querySelector("#add-zero").textContent)
    console.log("incSpan", document.querySelector("#add-zero"))
    console.log("inc", timeLeftMinutes, typeof timeLeftMinutes)
    
    if (sessionLength == 60) {
      setSessionLength(60);
    }
  };

  // https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-25--5-clock

  return (
    <>
      <div className="app-container">
        <h1>25 + 5 Clock</h1>
        <div className="break-and-session-length-container">
          <div className="break-outer-container">
            <div id="break-label" className="break-length-labels">
              Break Length
            </div>
            <div className="break-inner-container">
              <div onClick={handleBreakDecrement} id="break-decrement">
                &#8681;
              </div>
              <div id="break-length" className="break-length-numbers">
                {breakLength}
              </div>
              <div onClick={handleBreakIncrement} id="break-increment">
                &#8679;
              </div>
            </div>
          </div>
          <div className="session-outer-container">
            <div id="session-label" className="break-length-labels">
              Session Length
            </div>
            <div>
              <div className="session-inner-container">
                <div onClick={handleSessionDecrement} id="session-decrement">
                  &#8681;
                </div>
                <div id="session-length" className="break-length-numbers">
                  {sessionLength}
                </div>
                <div onClick={handleSessionIncrement} id="session-increment">
                  &#8679;
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="clock-container">
          <div id="timer-label" className="timer-label">
            Session
          </div>
          <div id="time-left" className="time-left">
            <span id="add-zero"></span><span id="time-left-minutes">{timeLeftMinutes}</span>
            <span>:</span><span id="time-left-seconds">00</span>
          </div>
        </div>
        <div>
          <div id="start_stop" className="start-stop" onClick={handleStartStop}>
            start/stop
          </div>
          <div id="reset" className="reset" onClick={handleReset}>
            reset
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default App;
