import "./App.css";
import logo from "./img/menu.png";

import React, { useState } from "react";
import Button from "./button/Button";
import {
  eventDigit,
  eventFunction,
  eventOperator,
  eventResult,
  checkType,
} from "./functions";

function App() {
  const [value, setValue] = useState("0");
  const [memory, setMemory] = useState(null);
  const [operator, setOperator] = useState(null);
  const [savedValue, setSavedValue] = useState(0);
  const [time] = useState(new Date());

  const buttons = [
    "AC",
    "+/-",
    "%",
    "÷",
    "mc",
    "mr",
    "m-",
    "m+",
    7,
    8,
    9,
    "×",
    4,
    5,
    6,
    "−",
    1,
    2,
    3,
    "+",
    0,
    ",",
    "=",
  ];

  const handleButton = (content) => () => {
    const operators = ["−", "+", "×", "÷"];
    const functions = ["AC", "+/-", "%", "mc", "mr", "m-", "m+", ","];

    if (!isNaN(content)) {
      eventDigit(content, value, setValue);
    }

    if (functions.includes(content)) {
      eventFunction(
        content,
        value,
        savedValue,
        setValue,
        setMemory,
        setOperator,
        setSavedValue
      );
    }
    
    if (operators.includes(content)) {
      eventOperator(
        content,
        operator,
        value,
        memory,
        setMemory,
        setValue,
        setOperator
      );
      return;
    }

    if (content === "=") {
      eventResult(operator, memory, value, setValue, setMemory, setOperator);
    }
  };

  return (
    <div className="App">
      <div className="top">
        <div className="time">
          {time.getHours().toString().padStart(2, "0")}:
          {time.getMinutes().toString().padStart(2, "0")}
        </div>
        <div className="menu">
          <img src={logo} alt="menu" />
        </div>
      </div>
      <div className="display">{value}</div>
      <div className="buttons">
        {buttons.map((item, index) => {
          return (
            <Button
              onButtonClick={handleButton}
              content={item}
              type={checkType(item)}
              key={index}
            />
          );
        })}
      </div>
      <div className="bottom" />
    </div>
  );
}

export default App;
