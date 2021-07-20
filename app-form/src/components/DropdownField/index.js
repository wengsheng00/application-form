import React from "react";
import { Select } from "@material-ui/core";
import { useField } from "formik";

const SelectField = ({name, ...props}) => {
    const [field, meta] = useField(name);

    const confSelectField = {
        variant: 'outlined',
        ...field,
        ...props,
        error: meta.touched && Boolean(meta.error),
        helperText: meta.touched && meta.error,
    }

    return (
        <Select {...confSelectField}>
        </Select>
    )
}

export default SelectField;