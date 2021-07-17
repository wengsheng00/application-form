import "./App.css";
import { Button } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import InputTextField from "./components/InputField";
import DateField from "./components/DateField";
import StepForm from "./StepForm";
import {Step} from "./StepForm";

const schema = yup.object({
  fullName: yup.string().required("Name is required"),
  age: yup
    .number()
    .required("Age is required")
    .integer("Invalid age")
    .positive("Invalid Age"),
  dob: yup.date().required("Date of Birth is required"),
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StepForm
          initialValues={{ fullName: "", dob: "", age: "", email: "" , firstName: ""}}
          onSubmit={(values) => {
            alert(JSON.stringify("Form Submitted", null, 2));
          }}
          validationSchema={schema}
        >
            <Step 
              stepName = "Personal Details" 
              onSubmit={() => console.log('Step 1')} 
              validationSchema={schema}
            >
              <InputTextField name="fullName" label="Full Name" />
              <DateField name="dob" label="Date of Birth" />
              <InputTextField name="age" label="Age" />
             
              
              {/* <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{ marginTop: 30 }}
              >
                Submit
              </Button> */}
            </Step>

            <Step
              stepName = "Email" 
              onSubmit={() => console.log('Step 2')} 
              validationSchema={{
                email: yup
                .string()
                .email("Email must be valid (e.g abc123@gmail.com)")
                .required("Email is required"),
                firstName: yup.string().required("First Name Required")
              }}
            >
              {/* <InputTextField name="email" label="Email" /> */}
              <InputTextField name="firstName" label="First Name" />

            </Step>

        </StepForm>
      </header>
    </div>
  );
}

export default App;
