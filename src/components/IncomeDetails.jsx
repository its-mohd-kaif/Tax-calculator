import React, { useContext, useRef} from "react";
import { incomeContext } from "../App";

function IncomeDetails() {
  const data = useContext(incomeContext);
  console.log("data", data);
  const salaryRef = useRef();
  const hraRef = useRef();
  const ltaRef = useRef();
  const aioRef = useRef();
  const regex = /^[1-9]\d*$/;

  const inputHandler = () => {
    if (regex.test(salaryRef.current.value) === false) {
      salaryRef.current.value = "";
    } else if (regex.test(hraRef.current.value) === false) {
      hraRef.current.value = "";
    } else if (regex.test(ltaRef.current.value) === false) {
      ltaRef.current.value = "";
    } else if (regex.test(aioRef.current.value) === false) {
      aioRef.current.value = "";
    } else {
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
        <div class="input-group mb-3">
          <span class="input-group-text rupeeSpan">₹</span>
          <input
            ref={salaryRef}
            onChange={inputHandler}
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            placeholder="Basic Salary Per Annum"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text rupeeSpan">₹</span>
          <input
            ref={hraRef}
            onChange={inputHandler}
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            placeholder="HRA Recieved Per Annum"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text rupeeSpan">₹</span>
          <input
            ref={ltaRef}
            onChange={inputHandler}
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            placeholder="LTA"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text rupeeSpan">₹</span>
          <input
            ref={aioRef}
            onChange={inputHandler}
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            placeholder="Annual Income From Other Sources"
          />
        </div>
      </div>
    </div>
  );
}

export default IncomeDetails;
