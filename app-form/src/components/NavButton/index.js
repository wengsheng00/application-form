import { Button } from '@material-ui/core';
import React from 'react';

const NavButton = (props) => {
    return (
        <div style = {{
            display: 'flex',
            marginTop: 30,
            justifyContent: 'space-between'
        }}>
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