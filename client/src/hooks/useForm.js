import { useState } from "react";

export function useForm(initialValues, submitCallback) {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        console.log(values);

    }

    const submitHandler = async (e) => {
        e.preventDefault();
        await submitCallback(values);

    }


    return {
        values,
        changeHandler,
        submitHandler
    }
}