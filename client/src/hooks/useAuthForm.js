
import { useFormik } from "formik";
import * as Yup from "yup";


export function useAuthForm(defaultValues, submitCallback) {
    const formik = useFormik({
      initialValues: defaultValues,
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
      }),
      onSubmit: async (values, { setSubmitting }) => {
        try {
          await submitCallback(values);
        } finally {
          setSubmitting(false);
        }
      },
    });

    const submitHandler = (e) => {
        e.preventDefault();
        submitCallback(formik.values)
    }
  
    return {
      values: formik.values,
      changeHandler: formik.handleChange,
      submitHandler: submitHandler,
      isSubmitting: formik.isSubmitting,
      errors: formik.errors
    };
  }