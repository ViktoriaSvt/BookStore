import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {

  const [hasError, setHasError] = useState('');

  const login = useLogin();
  const defaultValues = { email: '', password: '' };
  const loginhandler = async ({ email, password }) => {
    try {
      await login(email, password)
    } catch (error) {
      setHasError('Invalid email or password. Please try again')
    
      
    }
  }

  const { values, changeHandler, submitHandler } = useForm(
    defaultValues, loginhandler
  )


  return (

    <div className="form-divider">
      <form autoComplete="off"  className="form" onSubmit={submitHandler}>
        <header>
          <h1>Login</h1>
          {hasError && <h2>{hasError}</h2>}
        </header>
        <div className="field">
          <input
            type="email"
            name="email"
            id="login-email"
            placeholder="Email"
            value={values.email}
            onChange={changeHandler}
            required />
          <i className="fa-solid fa-circle-check" /><label htmlFor="login-email">Email:</label>
          <span className="helper info">example: JohnDoe344@gmail.com</span>
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
          <i className="fa-solid fa-circle-check" /><label htmlFor="login-password">Password:</label>
          <span className="helper info">Password must be at least 8 characters long</span>
        </div>
        <p className="link-signup">No account?<a href="/register">sign up</a></p>
        <input type="submit" defaultValue="Submit" />
      </form>
    </div>
  );
}