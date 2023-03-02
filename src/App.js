import { createContext, useState } from "react";
import "./App.css";
import LinearStepper from "./components/LinearStepper";
// Create Context
export const incomeContext = createContext();
function App() {
  // State For Income Details Field
  const [income, setIncome] = useState({
    salary: "",
    hra: "",
    lta: "",
    aio: "",
  });
  // State For Deduction Details Field
  const [deduction, setDeduction] = useState({
    ded_80Cref: "",
    ded_80Dref: "",
    ded_80TTAref: "",
    ded_TARref: "",
    metro: false,
  });
  return (
    <div className="App">
      <incomeContext.Provider
        value={{ income, setIncome, deduction, setDeduction }}
      >
        <LinearStepper />
      </incomeContext.Provider>
    </div>
  );
}

export default App;
