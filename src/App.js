import "./App.css";
import React, { useState } from "react";
import Button from "./button/Button";
import logo from "./logo/menu.png";

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
      eventDigit(content, operator);
    }

    if (functions.includes(content)) {
      eventFunction(content, value, savedValue);
    }

    if (operators.includes(content)) {
      eventOperator(content, operator, value, memory);
      return;
    }

    if (content === "=") {
      eventResult(operator, memory, value);
    }
  };

  const eventResult = (operator, memory, value) => {
    if (!operator) return;

    if (operator === "+") {
      setValue(parseFloat(memory) + parseFloat(value));
    } else if (operator === "−") {
      setValue(parseFloat(memory) - parseFloat(value));
    } else if (operator === "×") {
      setValue(parseFloat(memory) * parseFloat(value));
    } else if (operator === "÷") {
      setValue(parseFloat(memory) / parseFloat(value));
    }
    setMemory(null);
    setOperator(null);
    return;
  };

  const eventOperator = (content, operator, value, memory) => {
    if (operator !== null) {
      if (operator === "+") {
        setMemory(parseFloat(memory) + parseFloat(value));
      } else if (operator === "−") {
        setMemory(parseFloat(memory) - parseFloat(value));
      } else if (operator === "×") {
        setMemory(parseFloat(memory) * parseFloat(value));
      } else if (operator === "÷") {
        setMemory(parseFloat(memory) / parseFloat(value));
      }
    } else {
      setMemory(parseFloat(value));
    }
    setValue("0");
    setOperator(content);
    return;
  };

  const eventFunction = (content, value, savedValue) => {
    switch (content) {
      case "AC":
        setValue("0");
        setMemory(null);
        setOperator(null);
        return;
      case "+/-":
        setValue(value * -1);
        return;
      case "%":
        setValue(value / 100);
        setMemory(null);
        setOperator(null);
        return;
      case ",":
        if (value.toString().includes(".")) return;
        setValue(value + ".");
        return;
      case "mc":
        setSavedValue(0);
        setValue(0);
        return;
      case "mr":
        setValue(savedValue);
        return;
      case "m+":
        setSavedValue(parseFloat(savedValue) + parseFloat(value));
        return;
      case "m-":
        setSavedValue(parseFloat(savedValue) - parseFloat(value));
        return;
      default:
        break;
    }
  };

  const eventDigit = (content) => {
    if (value !== "0") {
      const input = value.toString() + content.toString();
      setValue(input);
      return;
    } else {
      setValue(content);
      return;
    }
  };

  const checkType = (item) => {
    const operatorStyle = ["−", "+", "×", "÷", "=", "m+"];
    const functionStale = ["AC", "+/-", "%"];

    if (operatorStyle.includes(item)) {
      return "operator";
    } else if (functionStale.includes(item)) {
      return "function";
    } else return false;
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
