import React, { useContext, useEffect, useRef } from "react";
import { incomeContext } from "../App";

function IncomeDetails() {
  // UseConext For Storing Form Input Field Data
  const data = useContext(incomeContext);
  // Ref for input fields
  const salaryRef = useRef();
  const hraRef = useRef();
  const ltaRef = useRef();
  const aioRef = useRef();
  // Regex for validation
  const regex = /^[0-9]\d*$/;
  // UseEffect For persist input fields data
  useEffect(() => {
    if (data.income.salary !== "") {
      salaryRef.current.value = data.income.salary;
    }
    if (data.income.hra !== "") {
      hraRef.current.value = data.income.hra;
    }
    if (data.income.lta !== "") {
      ltaRef.current.value = data.income.lta;
    }
    if (data.income.aio !== "") {
      aioRef.current.value = data.income.aio;
    }
  }, []);
  // Input Handler Function
  const inputHandler = () => {
    // Check Validation
    if (regex.test(salaryRef.current.value) === false) {
      salaryRef.current.value = "";
    } else if (regex.test(hraRef.current.value) === false) {
      hraRef.current.value = "";
    } else if (regex.test(ltaRef.current.value) === false) {
      ltaRef.current.value = "";
    } else if (regex.test(aioRef.current.value) === false) {
      aioRef.current.value = "";
    } else {
      // Set Data into Context State
      data.setIncome({
        salary: Number(salaryRef.current.value),
        hra: Number(hraRef.current.value),
        lta: Number(ltaRef.current.value),
        aio: Number(aioRef.current.value),
      });
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Income Details</h1>
      <br></br>
      <div className="formDiv">
        <div className="input-group mb-3">
          <span className="input-group-text rupeeSpan">₹</span>
          <input
            ref={salaryRef}
            onChange={inputHandler}
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            placeholder="Basic Salary Per Annum*"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text rupeeSpan">₹</span>
          <input
            ref={hraRef}
            onChange={inputHandler}
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            placeholder="HRA Recieved Per Annum*"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text rupeeSpan">₹</span>
          <input
            ref={ltaRef}
            onChange={inputHandler}
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            placeholder="LTA*"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text rupeeSpan">₹</span>
          <input
            ref={aioRef}
            onChange={inputHandler}
            type="text"
            className="form-control"
            aria-label="Amount (to the nearest dollar)"
            placeholder="Annual Income From Other Sources*"
          />
        </div>
      </div>
    </div>
  );
}

export default IncomeDetails;
