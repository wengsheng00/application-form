import "./App.css";
import * as yup from "yup";
import InputTextField from "./components/InputField";
import DateField from "./components/DateField";
import StepForm from "./StepForm";
import { Step } from "./StepForm";
import React from "react";
import "./index.css";
import dropDownServices from "./services/gender";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneRegx:
        /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
      genders: null,
      status: false,
      isLoading: true,
      gender_code: null,
    };
  }

  componentDidMount() {
    dropDownServices.genderDropdown({}, (apiData) => {
      if (apiData.status) {
        this.setState({
          ...this.state,
          isLoading: false,
          genders: apiData.data.map((item) => {
            console.log(item);
            return <MenuItem value={item.gender}>{item.gender}</MenuItem>;
          }),
        });
      }
    });
  }

  render() {
    const handleGenderChange = (event) => {
      this.setState({
        ...this.state,
        gender_code: event.target.value,
      });
    };

    return (
      <div>
        {
          (console.log(this.state.genders),
            this.state.isLoading ? console.log("waiting") : console.log("Done"),
            console.log(this.state.genders),
            (
              <div className="App">
                <header className="App-header">
                  <StepForm
                    initialValues={{
                      fullName: "",
                      dob: "",
                      age: "",
                      gender: "",
                      email: "",
                      phoenNo: "",
                      address: "",
                    }}
                    onSubmit={(values) => {
                      alert(JSON.stringify(values, null, 2));
                    }}
                  >
                    <Step
                      stepName="Personal Details"
                      onSubmit={() => console.log("Step 1")}
                      validationSchema={yup.object({
                        fullName: yup.string().required("Name is required"),
                        age: yup
                          .number()
                          .required("Age is required")
                          .integer("Invalid age")
                          .positive("Invalid Age"),
                        dob: yup.date().required("Date of Birth is required"),
                        // gender: yup.string().required("Gender is required")
                      })}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputTextField
                          className="col-span-1 md:col-span-2  rounded"
                          name="fullName"
                          label="Full Name"
                        />
                        <InputTextField
                          className="col-span-1 rounded"
                          name="age"
                          label="Age"
                        />
                        <DateField
                          className="col-span-1  rounded"
                          name="dob"
                          label="Date of Birth"
                        />
                        <FormControl
                          className="col-span-1 md:col-span-2 rounded"
                          variant="outlined"
                        >
                          <InputLabel id="gender-select-outlined-label">
                            Gender
                          </InputLabel>
                          <Select
                            labelId="gender-select-outlined-label"
                            id="gender-select-outlined"
                            value={this.state.gender_code}
                            onChange={handleGenderChange}
                            label="Gender"
                            name="gender"
                          >
                            {this.state.genders}
                          </Select>
                        </FormControl>
                      </div>
                    </Step>

                    <Step
                      stepName="Details"
                      onSubmit={() => console.log("Step 2")}
                      validationSchema={yup.object({
                        email: yup
                          .string()
                          .email("Email must be valid (e.g abc123@gmail.com)")
                          .required("Email is required"),

                        phoneNo: yup
                          .string()
                          .required()
                          .matches(
                            this.state.phoneRegx,
                            "Phone number is invalid"
                          ),
                        address: yup.string().required("Address is required."),
                      })}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputTextField
                          className="col-span-1 rounded"
                          name="email"
                          label="Email"
                        />
                        <InputTextField
                          className="col-span-1 rounded"
                          name="phoneNo"
                          label="Phone Number"
                        />
                        <InputTextField
                          className="col-span-1 md:col-span-2 rounded"
                          name="address"
                          label="Addrss"
                        />
                      </div>
                    </Step>
                  </StepForm>
                </header>
              </div>
            ))
        }
      </div>
    );
  }
}

export default App;
