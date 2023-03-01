import React, { useContext, useEffect, useState } from "react";
import { incomeContext } from "../App";

function Summary() {
  const dataIncome = useContext(incomeContext);
  const dataDeduction = useContext(incomeContext);
  const [exemption, setExemption] = useState(0);
  useEffect(() => {
    let totalIncome =
      dataIncome.income.salary +
      dataIncome.income.hra +
      dataIncome.income.lta +
      dataIncome.income.aio;

    let totalDeduction =
      dataDeduction.deduction.ded_80Cref +
      dataDeduction.deduction.ded_80Dref +
      dataDeduction.deduction.ded_80TTAref +
      dataDeduction.deduction.ded_TARref;
    console.log("TOTAL INCOME", totalIncome);
    console.log("TOTAL DEDUCTION", totalDeduction);
    // Hra calculation
    let hraCond1 = dataIncome.income.hra;
    // ----------------------
    let hraCond2 = 0;
    let rentPaid = Number(dataDeduction.deduction.ded_TARref);
    let salary = (dataIncome.income.salary * 10) / 100;
    console.log("INCOME", dataIncome.income.salary);
    console.log("SALARY", salary);
    hraCond2 = rentPaid - salary;
    hraCond2 = hraCond2 < 0 ? 0 : hraCond2;
    let hraCond3 = 0;
    if (dataDeduction.deduction.metro === true) {
      hraCond3 = parseInt(dataIncome.income.salary * 50) / 100;
    } else if (dataDeduction.deduction.metro === false) {
      hraCond3 = parseInt(dataIncome.income.salary * 40) / 100;
    }
    let hraExemption =
      hraCond3 < (hraCond1 < hraCond2 ? hraCond1 : hraCond2)
        ? hraCond3
        : hraCond1 < hraCond2
        ? hraCond1
        : hraCond2;
    setExemption(hraExemption);
    console.log("HRA 1", hraCond1);
    console.log("HRA 2", hraCond2);
    console.log("HRA 3", hraCond3);
    console.log("LOCAL HRA", hraExemption);
  }, [dataIncome, dataDeduction]);
  console.log("HRA Exemption", exemption);
  return (
    <div>
      <center>
        <h1>Summary</h1>
      </center>
    </div>
  );
}

export default Summary;
