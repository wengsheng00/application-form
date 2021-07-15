import logo from "./logo.svg";
import "./App.css";
import { TextField } from "@material-ui/core";
import { Form, Formik } from "formik";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Formik 
          initialValues={{ name: "" }}
          onSubmit={values => {alert(JSON.stringify(values, null, 2))}}
        > 

        {(formik) => 
          <form onSubmit={formik.handleSubmit}>
            <TextField 
              fullWidth 
              id="name" 
              name="name" 
              label="Name" 
              value={formik.values.name}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.name)}
              helperText="You did it wrong"
            />

            
          </form>}
        
        </Formik>
      </header>
    </div>
  );
}

export default App;
