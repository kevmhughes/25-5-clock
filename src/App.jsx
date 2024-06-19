import React, { useState } from "react";
import "./App.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  // variable associated with setInterval
  let tickerSeconds;

  // reduces seconds on timer, and adds a zero from 9 - 0
  function reduceSecondsOnTimer() {
    let seconds = document.querySelector("#seconds").textContent;
    if (seconds == "00") {
      seconds = 59;
      reduceMinutesOnTimer();
      document.querySelector("#seconds").textContent = seconds;
    } else if (seconds <= 59 && seconds > 10) {
      seconds -= 1;
      document.querySelector("#seconds").textContent = seconds;
    } else if (seconds <= 10 && seconds > 0) {
      seconds -= 1;
      document.querySelector("#seconds").textContent = "0" + seconds;
    }
  }

  // reduces minutes on timer, and adds a zero from 9 - 0
  function reduceMinutesOnTimer() {
    let seconds = document.querySelector("#seconds").textContent;
    let minutes = document.querySelector("#minutes").textContent;
    let timerLabel = document.querySelector("#timer-label").textContent;

    // break timer
    if (document.querySelector("#timer-label").textContent == "Break") {
      if (minutes <= 60 && minutes > 10) {
        document.querySelector("#minutes").textContent =
          document.querySelector("#minutes").textContent - 1;
      } else if (minutes <= 10 && minutes > 0) {
        document.querySelector("#minutes").textContent =
          document.querySelector("#minutes").textContent - 1;
        document.querySelector("#extra-number").textContent = "0";
      } else if (seconds == 0o0 && minutes == 0) {
        document.querySelector("#timer-label").textContent = "Session";
        document.querySelector("#minutes").textContent = sessionLength - 1;
        document.querySelector("#seconds").textContent = "00";
        document.querySelector("#beep").play();
      }
    }

    // session timer
    if (seconds == "00" && timerLabel == "Session") {
      if (minutes <= 60 && minutes > 10) {
        document.querySelector("#minutes").textContent =
          document.querySelector("#minutes").textContent - 1;
      } else if (minutes <= 10 && minutes > 0) {
        document.querySelector("#minutes").textContent =
          document.querySelector("#minutes").textContent - 1;
        document.querySelector("#extra-number").textContent = "0";
      } else if (minutes <= 0 && seconds == "00") {
        document.querySelector("#timer-label").textContent = "Break";
        document.querySelector("#minutes").textContent = breakLength - 1;
        document.querySelector("#seconds").textContent = "00";
        document.querySelector("#beep").play();
      }
    }
  }

  // starts and stops the seconds timer
  const handlesStartStop = () => {
    if (!tickerSeconds) {
      tickerSeconds = setInterval(reduceSecondsOnTimer, 1000);
    } else {
      clearInterval(tickerSeconds);
      tickerSeconds = false;
    }
  };

  // resets the break and session length, resets seconds to 00 and stops the seconds timer (clears setInterval)
  function handlesReset() {
    setBreakLength(5);
    setSessionLength(25);
    document.querySelector("#extra-number").textContent = "";
    document.querySelector("#seconds").textContent = "00";
    document.querySelector("#minutes").textContent = sessionLength;
    document.querySelector("#timer-label").textContent = "Session";
    clearInterval(tickerSeconds);
    tickerSeconds = false;
    document.querySelector("#beep").pause();
    document.querySelector("#beep").currentTime = 0;
  }

  // reduces break length by 1, but does not allow 0 to be chosen
  function handlesBreakDecrement() {
    setBreakLength(breakLength - 1);
    if (breakLength <= 1) {
      setBreakLength(1);
    }
  }

  // increases break length by 1, but stops at 60
  function handlesBreakIncrement() {
    setBreakLength(breakLength + 1);
    if (breakLength >= 60) {
      setBreakLength(60);
    }
  }

  // decreases session length by 1, and also adds a 0 in front of the numbers between 9 and 1. It also does not allow the session length to be set to 0
  function handlesSessionDecrement() {
    clearInterval(tickerSeconds);
    tickerSeconds = false;
    document.querySelector("#seconds").textContent = "00";
    if (sessionLength > 10 && sessionLength <= 60) {
      setSessionLength(sessionLength - 1);
    } else if (sessionLength <= 10 && sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      document.querySelector("#extra-number").textContent = "0";
    } else if (sessionLength <= 1) {
      document.querySelector("#extra-number").textContent = "0";
      document.querySelector("#minutes").textContent = "1";
    }
  }

  // increases session length by 1, but stops at 60
  function handlesSessionIncrement() {
    clearInterval(tickerSeconds);
    tickerSeconds = false;
    document.querySelector("#seconds").textContent = "00";
    if (sessionLength >= 60) {
      setSessionLength(60);
    } else if (sessionLength >= 9 && sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      document.querySelector("#extra-number").textContent = "";
    } else if (sessionLength <= 10 && sessionLength > 0) {
      setSessionLength(sessionLength + 1);
      document.querySelector("#extra-number").textContent = "0";
    }
  }

  return (
    <>
      <div className="container">
        <h1 className="title">25 + 5 Clock</h1>

        <div className="break-and-session-length-boxes-container">
          <div className="break-length-container">
            <div id="break-label" className="break-length-title">
              Break Length
            </div>
            <div className="break-length-controls-container">
              <div id="break-decrement" onClick={handlesBreakDecrement}>
                &#11015;
              </div>
              <div id="break-length">{breakLength}</div>
              <div id="break-increment" onClick={handlesBreakIncrement}>
                &#11014;
              </div>
            </div>
          </div>

          <div className="session-length-container">
            <div id="session-label" className="session-length-title">
              Session Length
            </div>
            <div className="session-length-controls-container">
              <div id="session-decrement" onClick={handlesSessionDecrement}>
                &#11015;
              </div>
              <div id="session-length">{sessionLength}</div>
              <div id="session-increment" onClick={handlesSessionIncrement}>
                &#11014;
              </div>
            </div>
          </div>
        </div>

        <div className="timer-container">
          <div className="timer-inner-container">
            <div id="timer-label">Session</div>
            <div id="time-left">
              <span id="extra-number"></span>
              <span id="minutes">{sessionLength}</span>:
              <span id="seconds">00</span>
            </div>
          </div>
          <div className="play-pause-reset-container">
            <div id="start_stop" onClick={handlesStartStop}>
              &#9199;
            </div>
            <div id="reset" onClick={handlesReset}>
              &#8634;
            </div>
          </div>
        </div>

        <audio
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          id="beep"
        ></audio>
      </div>
    </>
  );
}

export default App;
