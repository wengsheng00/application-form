import React, {useState} from "react";
import { Form, Formik } from "formik";
import NavButton from "./components/NavButton";
import { Button } from "@material-ui/core";

const StepForm = ({children, initialValues, onSubmit}) => {
    const [stepNumber, setStepNumber] = useState(0);
    const [snapshot, setSnapshot] = useState(initialValues);

    const steps = React.Children.toArray(children);
    const step = steps[stepNumber];
    const totalSteps = steps.length;
    const isLastStep = (totalSteps - 1 === stepNumber);

    const nextStep = (values) => {
        setSnapshot(values);
        setStepNumber(stepNumber + 1);
    }

    const previousStep = (values) => {
        setSnapshot(values);
        setStepNumber(stepNumber - 1);
    }

    const handleSubmit = async (values, actions) => {
        if (step.props.onSubmit){
            await step.props.onSubmit(values)
        }

        if (isLastStep){
            await step.props.onSubmit(values)
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
                validationSchema={step.props.validationSchema}
            >
                
                {(formik) => (
                    <Form>
                        {step}
                        <div className="grid">
                        <NavButton 
                            hasPrevious={stepNumber > 0}
                            isLastStep={isLastStep}
                            onBackClick={() => previousStep(formik.values)}
                        >
                        </NavButton>

                        <Button variant = 'outlined' type="reset">Reset</Button>
                        </div>
                    </Form>)}
            </Formik>
        </div>
    )

}
export default StepForm;

export const Step = ({stepName = '', children}) => children