export const eventResult = (
  operator,
  memory,
  value,
  setValue,
  setMemory,
  setOperator
) => {
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

export const eventOperator = (
  content,
  operator,
  value,
  memory,
  setMemory,
  setValue,
  setOperator
) => {
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

export const eventFunction = (
  content,
  value,
  savedValue,
  setValue,
  setMemory,
  setOperator,
  setSavedValue
) => {
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

export const eventDigit = (content, value, setValue) => {
  if (value !== "0") {
    const input = value.toString() + content.toString();
    setValue(input);
    return;
  } else {
    setValue(content);
    return;
  }
};

export const checkType = (item) => {
  const operatorStyle = ["−", "+", "×", "÷", "=", "m+"];
  const functionStale = ["AC", "+/-", "%"];

  if (operatorStyle.includes(item)) {
    return "operator";
  } else if (functionStale.includes(item)) {
    return "function";
  } else return false;
};
