import "./App.css";
import * as yup from "yup";
import InputTextField from "./components/InputField";
import DateField from "./components/DateField";
import StepForm from "./StepForm";
import SelectField from "./components/DropdownField";
import { Step } from "./StepForm";
import React from "react";
import axios from "axios";
import dropDownServices from "./services/gender";
import { Button, CircularProgress, FormControl, InputLabel, ListItemAvatar, MenuItem, Select } from "@material-ui/core";

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      phoneRegx: /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
      genders: null,
      status: false,
      isLoading: true,
      gender_code: null,

    }
  }

    componentDidMount(){
      dropDownServices.genderDropdown({}, (apiData) => {
        if (apiData.status){


          console.log(apiData.status)
          console.log(apiData.data)

          // let data = apiData.data;
          // data.map(item=> {
          //   console.log(item.genders[0]);
          // })


          this.setState({
            ...this.state,
            isLoading: false,
            genders: apiData.data.map(item => {
              console.log(item)
              return <MenuItem value={item.gender}>{item.gender}</MenuItem>
            })
            
          })
        }
      });
    }

    render(){

      const handleGenderChange = (event) => {
        this.setState({
          ...this.state,
          gender_code: event.target.value
        })
      };
  
      
      return (
        <div>
        {
          console.log(this.state.genders),

          this.state.isLoading ? console.log("waiting") : 

          console.log("Done"),
          console.log(this.state.genders),

          <div className="App">
              <header className="App-header">
                <StepForm
                  initialValues={{ fullName: "", dob: "", age: "", email: "", email: "" , phoenNo: "", address: ""}}
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
                      // gender: yup.string().required("Gender is required")
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

                    <div>
                     <FormControl fullWidth variant="outlined" style={{marginTop: 30}} >
                       <InputLabel id="gender-select-outlined-label">Gender</InputLabel>
                       <Select 
                        labelId = "gender-select-outlined-label"
                        id = "gender-select-outlined"
                        value = {this.state.gender_code}
                        onChange = {handleGenderChange}
                        label = "Gender"
                        style = {{alignItems: "start", width: 500}}
                       >
                         {this.state.genders}
                       </Select>
                     </FormControl>

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
                          required("Email is required"),
        
                      phoneNo: 
                        yup.string().required().matches(this.state.phoneRegx, "Phone number is invalid"), 
                      address:
                        yup.string().required("Address is required.")
                    })}
                  >
                    <div>
                      <InputTextField name="email" label="Email" />
                    </div>
                    <div>
                      <InputTextField name="phoneNo" label="Phone Number" />
                    </div>
                    <div>
                      <InputTextField name="address" label="Address"/>
                    </div>
                  </Step>
        
                </StepForm>
              </header>
            </div>
        }
        </div>
      );
    }

}

export default App;
