import { Button } from '@material-ui/core';
import React from 'react';
import {Formik} from "formik"

const NavButton = (props) => {
    return (
        <div 
        style = {{
            display: 'flex',
            marginTop: 30,
            justifyContent: 'space-around',
        }}

        >
            <Button variant = 'outlined' type='reset' onClick={() => props.resetForm()} >Reset</Button>
            
            {props.hasPrevious && (
                <Button variant='outlined' onClick={props.onBackClick}>
                    Back
                </Button>
            )}

            <Button variant='outlined' type='submit'>{props.isLastStep ? 'Submit' : 'Next'}</Button>
        </div>
    )
}

export default NavButton;