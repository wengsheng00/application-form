import "./App.css";
import { Button } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import InputTextField from "./components/InputField";
import DateField from "./components/DateField";

const schema = yup.object({
  fullName: yup.string().required("Name is required"),
  age: yup
    .number()
    .required("Age is required")
    .integer("Invalid age")
    .positive("Invalid Age"),
  email: yup
    .string()
    .email("Email must be valid (e.g abc123@gmail.com)")
    .required("Email is required"),
  dob: yup.date().required("Date of Birth is required"),
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Formik
          initialValues={{ fullName: "", dob: "", age: "", email: "" }}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
          validationSchema={schema}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <InputTextField name="fullName" label="Full Name" />

              <DateField name="dob" label="Date of Birth" />

              <InputTextField name="age" label="Age" />

              <InputTextField name="email" label="Email" />

              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{ marginTop: 30 }}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </header>
    </div>
  );
}

export default App;
