import React from "react";
import { MenuItem, Select } from "@material-ui/core";
import { useField } from "formik";

const SelectField = ({name, ...props}) => {
    const [field, meta] = useField(name);

    const confSelectField = {
        variant: 'outlined',
        ...field,
        ...props,
        error: meta.touched && Boolean(meta.error),
        helperText: meta.touched && meta.error,
        style: {marginTop: 30, width: 500, marginRight: 10}
    }

    return (
        <Select {...confSelectField}>
        </Select>
    )
}

export default SelectField;