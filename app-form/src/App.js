import "./App.css";
import * as yup from "yup";
import InputTextField from "./components/InputField";
import DateField from "./components/DateField";
import StepForm from "./StepForm";
import { Step } from "./StepForm";

const personalSchema = yup.object({
  fullName: yup.string().required("Name is required"),
  age: yup
    .number()
    .required("Age is required")
    .integer("Invalid age")
    .positive("Invalid Age"),
  dob: yup.date().required("Date of Birth is required"),
  email:
    yup.
      string().
      email("Email must be valid (e.g abc123@gmail.com)").
      required("Email is required")
});

const detailsSchema = yup.object({
  email:
    yup.
      string().
      email("Email must be valid (e.g abc123@gmail.com)").
      required("Email is required")
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StepForm
          initialValues={{ fullName: "", dob: "", age: "", email: "", firstName: "" }}
          onSubmit={(values) => {
            alert(JSON.stringify("Form Submitted", null, 2));
          }}
        >
          <Step
            stepName="Personal Details"
            onSubmit={() => console.log('Step 1')}
            validationSchema={yup.object({
              fullName: yup.string().required("Name is required"),
              age: yup
                .number()
                .required("Age is required")
                .integer("Invalid age")
                .positive("Invalid Age"),
              dob: yup.date().required("Date of Birth is required"),
            })}
          >
            <div>
              <InputTextField name="fullName" label="Full Name" />
            </div>
            <div >
            <InputTextField name="age" label="Age" />
            </div>
            <div>
              <DateField name="dob" label="Date of Birth" />
            </div>

          </Step>

          <Step
            stepName="Details"
            onSubmit={() => console.log('Step 2')}
            validationSchema={yup.object({
              email:
                yup.
                  string().
                  email("Email must be valid (e.g abc123@gmail.com)").
                  required("Email is required")
            })}
          >
            <InputTextField name="email" label="Email" />
          </Step>

        </StepForm>
      </header>
    </div>
  );
}

export default App;
