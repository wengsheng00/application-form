import React, {useState} from "react";
import { FormikConfig, FormikValues} from "formik";

const StepForm = ({children, initialValues, onSubmit }) => {
    const [stepNumber, setStepNumber] = useState(0)
    const steps = React.Children.toArray(children);
    const step = steps[stepNumber]

    
}