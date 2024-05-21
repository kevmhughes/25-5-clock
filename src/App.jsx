import React, { useState } from "react";
import "./App.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);

  return (
    <>
      <div>
        <div id="break-label">Break Length</div>
        <div id="session-label">Session Length</div>
        <div onClick={""} id="break-decrement"></div>
        <div onClick={""} id="session-decrement"></div>
        <div onClick={""} id="break-increment"></div>
        <div onClick={""} id="session-increment"></div>
        <div id="break-length">{breakLength}</div>
      </div>
    </>
  );
}

export default App;
