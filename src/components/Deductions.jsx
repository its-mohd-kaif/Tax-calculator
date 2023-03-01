import React, { useContext, useRef, useState } from "react";
import { incomeContext } from "../App";
function Deductions() {
  const ded_80Cref = useRef();
  const ded_80Dref = useRef();
  const ded_80TTAref = useRef();
  const ded_TARref = useRef();
  const regex = /^[1-9]\d*$/;
  const data = useContext(incomeContext);
  const [check, setCheck] = useState(false);
  const inputHandler = () => {
    if (regex.test(ded_80Cref.current.value) === false) {
      ded_80Cref.current.value = "";
    } else if (regex.test(ded_80Dref.current.value) === false) {
      ded_80Dref.current.value = "";
    } else if (regex.test(ded_80TTAref.current.value) === false) {
      ded_80TTAref.current.value = "";
    } else if (regex.test(ded_TARref.current.value) === false) {
      ded_TARref.current.value = "";
    } else {
      data.setDeduction({
        ded_80Cref:
          Number(ded_80Cref.current.value) > 150000
            ? 150000
            : Number(ded_80Cref.current.value),
        ded_80Dref:
          Number(ded_80Dref.current.value) > 12000
            ? 12000
            : Number(ded_80Dref.current.value),
        ded_80TTAref:
          Number(ded_80TTAref.current.value) > 8000
            ? 8000
            : Number(ded_80TTAref.current.value),
        ded_TARref: Number(ded_TARref.current.value),
        metro: check,
      });
    }
  };
  console.log(data);
  const metroHandler = (e) => {
    if (e.target.checked === true) {
      setCheck(true);
    } else if (e.target.checked === false) {
      setCheck(false);
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Deductions</h1>
      <br></br>
      <div className="formDiv">
        <div class="form-check form-switch">
          <input
            onChange={metroHandler}
            class="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
          />
          <label class="form-check-label" for="flexSwitchCheckDefault">
            Do you live in a metro city?
          </label>
        </div>
        <br></br>
        <div class="input-group mb-3">
          <span class="input-group-text rupeeSpan">₹</span>
          <input
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            placeholder="Deductions 80C"
            value="50000 (Standard Deduction)"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text rupeeSpan">₹</span>
          <input
            onChange={inputHandler}
            ref={ded_80Cref}
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            placeholder="Deductions 80C"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text rupeeSpan">₹</span>
          <input
            onChange={inputHandler}
            ref={ded_80Dref}
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            placeholder="Deductions 80D"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text rupeeSpan">₹</span>
          <input
            onChange={inputHandler}
            ref={ded_80TTAref}
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            placeholder="Deductions 80TTA"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text rupeeSpan">₹</span>
          <input
            onChange={inputHandler}
            ref={ded_TARref}
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            placeholder="Total Annual Rent"
          />
        </div>
      </div>
    </div>
  );
}

export default Deductions;
