import React, { useContext, useEffect, useState } from "react";
import { incomeContext } from "../App";
function Summary() {
  // Income Context State
  const dataIncome = useContext(incomeContext);
  // Deduction Context State
  const dataDeduction = useContext(incomeContext);
  // Total Income State
  const [grandIncome, setGrandIncome] = useState(0);
  // Total Deduction State
  const [grandDeduction, setGrandDeduction] = useState(0);
  // HRA Exemption State
  const [exemption, setExemption] = useState(0);
  // Taxable Amount State
  const [taxAmount, setTaxAmount] = useState(0);
  // Old Tax Regime State
  const [oldTax, setOldTax] = useState(0);
  // New Tax Regime State
  const [newTax, setNewTax] = useState(0);
  // This useEffect will call a function that will calculate HRA Exemption
  useEffect(() => {
    calHraExemption();
  }, [dataIncome, dataDeduction, exemption, grandDeduction]);

  const calHraExemption = () => {
    let totalIncome =
      dataIncome.income.salary +
      dataIncome.income.hra +
      dataIncome.income.lta +
      dataIncome.income.aio;
    setGrandIncome(totalIncome);

    let totalDeduction =
      dataDeduction.deduction.ded_80Cref +
      dataDeduction.deduction.ded_80Dref +
      dataDeduction.deduction.ded_80TTAref +
      50000;

    // Hra calculation
    let hraCond1 = dataIncome.income.hra;
    let hraCond2 = 0;
    let rentPaid = Number(dataDeduction.deduction.ded_TARref);
    let salary = (dataIncome.income.salary * 10) / 100;
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

    totalDeduction = totalDeduction + hraExemption;
    setGrandDeduction(totalDeduction);
    setExemption(hraExemption);
    // Call a function to calculate tax
    calTax();
  };
  const calTax = () => {
    let taxableIncome = grandIncome - grandDeduction;
    setTaxAmount(taxableIncome);
    // Call Old Tax Regime
    existingTaxRegime(taxableIncome);
    // Call New Tax Regime
    newTaxRegime(taxableIncome);
  };
  // Function of calculate Old Tax Regime
  const existingTaxRegime = (income) => {
    let tempIncome = income - 250000;
    let tempTaxAmout = 0;
    if (tempIncome <= 250000) {
      tempTaxAmout = 0;
    } else if (tempIncome >= 250001 && tempIncome <= 500000) {
      tempTaxAmout = parseInt(((tempIncome - 250000) * 5) / 100);
    } else if (tempIncome >= 500001 && tempIncome <= 1000000) {
      tempTaxAmout = parseInt(((tempIncome - 500000) * 20) / 100);
      tempTaxAmout = tempTaxAmout + 12500;
    } else if (tempIncome > 1000000) {
      tempTaxAmout = parseInt(((tempIncome - 1000000) * 30) / 100);
      tempTaxAmout = tempTaxAmout + 112500;
    }
    setOldTax(tempTaxAmout);
  };
  // Function of calculate New Tax Regime
  const newTaxRegime = (income) => {
    let tempIncome = income - 250000;
    let tempTaxAmout = 0;
    if (tempIncome <= 250000) {
      tempTaxAmout = 0;
    } else if (tempIncome >= 250001 && tempIncome <= 500000) {
      tempTaxAmout = parseInt((tempIncome * 5) / 100);
    } else if (tempIncome >= 500001 && tempIncome <= 750000) {
      tempTaxAmout = parseInt(((tempIncome - 500000) * 10) / 100);
      tempTaxAmout = tempTaxAmout + 12500;
    } else if (tempIncome >= 750001 && tempIncome <= 1000000) {
      tempTaxAmout = parseInt(((tempIncome - 750000) * 15) / 100);
      tempTaxAmout = tempTaxAmout + 37500;
    } else if (tempIncome >= 1000001 && tempIncome <= 1250000) {
      tempTaxAmout = parseInt(((tempIncome - 1000000) * 20) / 100);
      tempTaxAmout = tempTaxAmout + 75000;
    } else if (tempIncome >= 1250001 && tempIncome <= 1500000) {
      tempTaxAmout = parseInt(((tempIncome - 1250000) * 25) / 100);
      tempTaxAmout = tempTaxAmout + 125000;
    } else if (tempIncome > 150000) {
      tempTaxAmout = parseInt(((tempIncome - 1500000) * 30) / 100);
      tempTaxAmout = tempTaxAmout + 187500;
    }
    setNewTax(tempTaxAmout);
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Summary</h1>
      <div>
        <table
          style={{ textAlign: "left", marginTop: "1em" }}
          class="table table-striped table-hover table-primary"
        >
          <thead>
            <tr>
              <th scope="col">Nature</th>
              <th scope="col">Amount</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Income From Salary</td>
              <td>Rs {dataIncome.income.salary}</td>
              <td></td>
            </tr>
            <tr>
              <td>Income From Other Sources</td>
              <td>
                Rs{" "}
                {dataIncome.income.aio +
                  dataIncome.income.lta +
                  dataIncome.income.hra}
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Gross Total Income</td>
              <td></td>
              <td>Rs {grandIncome}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bolder" }}>Deductions</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>80C</td>
              <td>Rs {dataDeduction.deduction.ded_80Cref}</td>
              <td></td>
            </tr>
            <tr>
              <td>80D</td>
              <td>Rs {dataDeduction.deduction.ded_80Dref}</td>
              <td>-</td>
            </tr>
            <tr>
              <td>80TTA</td>
              <td>Rs {dataDeduction.deduction.ded_80TTAref}</td>
              <td>
                Rs{" "}
                {dataDeduction.deduction.ded_80Cref +
                  dataDeduction.deduction.ded_80Dref +
                  dataDeduction.deduction.ded_80TTAref}
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bolder" }}>Gross Taxable Income</td>
              <td></td>
              <td>{taxAmount < 0 ? "Rs 0" : `Rs ${taxAmount}`}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bolder" }}>
                Total Tax Payable (New Regime)
              </td>
              <td></td>
              <td>Rs {newTax}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bolder" }}>
                Total Tax Payable (Old Regime)
              </td>
              <td></td>
              <td>Rs {oldTax}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Summary;
