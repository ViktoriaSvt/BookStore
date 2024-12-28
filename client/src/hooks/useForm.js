import { useState } from "react"


export function useForm (defaultValues, submitCallback) {
    const [values, setValues] = useState(defaultValues);


    const changeHandler = (e) => {
        setValues(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const submitHandler = (e) => {
        e.preventDefault();
        submitCallback(values)
    }

    return {
        values,
        changeHandler,
        submitHandler
    }
}