import React from "react";
import { TextField } from "@material-ui/core";
import { useField } from "formik"

const InputTextField = ({name, ...props}) => {
    const [field, meta] = useField(name);

    const confInputTextField = {
        variant: 'outlined', 
        ...field, 
        ...props,
        error: meta.touched && Boolean(meta.error),
        helperText: meta.touched && meta.error,
    };

    return (
        <TextField 
            {...confInputTextField}
        />
    )
};

export default InputTextField;