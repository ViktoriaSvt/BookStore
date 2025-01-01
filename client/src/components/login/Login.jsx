
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "../../hooks/useForm";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {

  const login = useLogin();

  const defaultValues = { email: '', password: '' };

  const loginhandler = async ({ email, password }) => {
    try {
      await login(email, password)
    } catch {
      toast.error("Invalid email or password. Please try again", {
        position: "top-right",
      });

    }
  }

  const { values, changeHandler, submitHandler, isSubmitting, errors } = useForm(
    defaultValues, loginhandler
  )




  return (

    <div className="form-divider">
      <ToastContainer />
      <form autoComplete="off" className="form" onSubmit={submitHandler}>
        <header>
          <h1>Login</h1>

        </header>
        <div className="field">
          <input
            type="email"
            name="email"
            id="login-email"
            placeholder="Email"
            value={values.email}
            onChange={changeHandler}
            required
          />
          {errors.email ? <i className="fa-solid fa-circle-xmark text-red-500"></i> : <i className="fa-solid fa-circle-check text-green-500" />}
          <label htmlFor="login-email">Email:</label>
          {errors.email && (
            <span className="error text-red-500 text-sm">{errors.email}</span>
          )}

        </div>
        <div className="field">
          <input
            type="password"
            name="password"
            id="login-password"
            placeholder="Password"
            value={values.password}
            onChange={changeHandler}
            required />
          {errors.password ? <i className="fa-solid fa-circle-xmark text-red-500"></i> : <i className="fa-solid fa-circle-check text-green-500" />}
          <label htmlFor="login-password">Password:</label>
          {errors.password && (
            <span className="error text-red-500 text-sm">{errors.password}</span>
          )}

        </div>
        <p className="link-signup">No account?<a href="/register">sign up</a></p>
        <input type="submit" defaultValue="Submit" disabled={isSubmitting} />
      </form>
    </div>
  );
}