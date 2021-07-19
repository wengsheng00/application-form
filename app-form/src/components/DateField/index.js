import React from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";

const DateField = ({name, ...props}) => {

    const [field, meta] = useField(name);

    const confDateField = {
        
        type: 'date', 
        variant: 'outlined',
        InputLabelProps: {
            shrink: true
        },
        ...field,
        ...props,
        error: meta.touched && Boolean(meta.error),
        helperText: meta.touched && meta.error,
        style: {marginTop: 30, width: 500, marginRight: 10},
    };

    return (
        <TextField 
            {...confDateField}
        />
    );

};

export default DateField;