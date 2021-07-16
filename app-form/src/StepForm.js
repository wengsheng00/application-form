import React, {useState} from "react";
import { Formik, FormikConfig, FormikValues} from "formik";

const StepForm = ({children, initialValues, onSubmit }) => {
    const [stepNumber, setStepNumber] = useState(0);
    const [snapshot, setSnapshot] = useState(initialValues);

    const steps = React.Children.toArray(children);
    const step = steps[stepNumber];
    const totalSteps = step.length;
    const isLastStep = totalSteps - 1 === stepNumber;

    const nextStep = (values) => {
        setSnapshot(values)
        setStepNumber(stepNumber + 1);
    }

    const previousStep = (values) => {
        setSnapshot(values)
        setStepNumber(stepNumber - 1);
    }

    const handleSubmit = (values, actions) => {
        {step.props.onSubmit ? 
            await step.props.onSubmit(values) : 
            null
        }

       if (isLastStep){
           return onSubmit(values, actions)
       }
       else{
            actions.setTouched({});
            nextStep(values);
       }
    }

    return (
        <div>
            <Formik 
                initialValues={{
                    snapshot
                }} 
                onSubmit={handleSubmit} 
                validationSchema={step.props.validationSchema}>
            {(formik) => (
                <form onSubmit={formik.handleSubmit}></form>)}
            </Formik>
        </div>
    )

}

const Step = ({stepName = '', children}) => children