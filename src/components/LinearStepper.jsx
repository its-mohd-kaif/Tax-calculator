import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IncomeDetails from "./IncomeDetails";
import Deductions from "./Deductions";
import Summary from "./Summary";
import { incomeContext } from "../App";

const steps = ["INCOME DETAILS", "DEDUCTIONS", "SUMMARY"];
// Stepper Component
export default function LinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const data = React.useContext(incomeContext);
  // Handler Next Function
  const handleNext = () => {
    if (
      activeStep === 0 &&
      (data.income.salary === "" ||
        data.income.hra === "" ||
        data.income.lta === "" ||
        data.income.aio === "")
    ) {
      setMessage("Manadtory to fill all details !!");
    } else if (
      activeStep === 1 &&
      (data.deduction.ded_80Cref === "" ||
        data.deduction.ded_80Dref === "" ||
        data.deduction.ded_80TTAref === "" ||
        data.deduction.ded_TARref === "")
    ) {
      setMessage("Manadtory to fill all details !!");
    } else {
      setMessage("");
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  // Handler Back Function
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  // Handle Reset Function
  const handleReset = () => {
    setActiveStep(0);
    data.setIncome({
      salary: "",
      hra: "",
      lta: "",
      aio: "",
    });
    data.setDeduction({
      ded_80Cref: "",
      ded_80Dref: "",
      ded_80TTAref: "",
      ded_TARref: "",
      metro: false,
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <h1 style={{ textAlign: "center" }}>INCOME TAX CALCULATOR</h1>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed :)</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {/* Call Component */}
            Step&nbsp;{activeStep + 1}
            {activeStep === 0 ? (
              <IncomeDetails />
            ) : activeStep === 1 ? (
              <Deductions />
            ) : activeStep === 2 ? (
              <Summary />
            ) : null}
          </Typography>
          <div className="alertContainer">
            {message !== "" ? (
              <div
                class="alert alert-warning alert-dismissible fade show"
                role="alert"
              >
                <span>{message}</span>
                <button
                  type="button"
                  class="btn-close"
                  // data-bs-dismiss="alert"
                  // aria-label="Close"
                  onClick={() => setMessage("")}
                ></button>
              </div>
            ) : null}
          </div>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
