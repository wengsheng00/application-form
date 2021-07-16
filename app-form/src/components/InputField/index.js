import React from "react";
import { TextField } from "@material-ui/core";
import { Field, useField } from "formik"

const InputTextField = ({name, ...props}) => {
    const [field, meta] = useField(name);

    const confInputTextField = {
        fullWidth: true,
        variant: 'outlined', 
        ...field, 
        ...props,
        error: meta.touched && Boolean(meta.error),
        helperText: meta.touched && meta.error,
        style: {marginTop: 30}
    };

    return (
        <TextField 
            {...confInputTextField}
        />
    )
};

export default InputTextField;