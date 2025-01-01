import { useAuthForm } from "../../hooks/useAuthForm";
import { useRegister } from "../../hooks/useRegister";

export default function Register() {


  const register = useRegister();
  const defaultValues = { email: '', password: '', rePass: '' };
  const registerHandler = async ({ email, password }) => {
    try {
      await register(email, password)
    } catch (error) {
      console.log(error.message);

    }
  }

  const { values, changeHandler, submitHandler } = useAuthForm(
    defaultValues, registerHandler
  )


  return (

    <div className="form-divider">
      <form  className="form" onSubmit={submitHandler}>
        <header>
          <h1>Register</h1>
        </header>
        <div className="field">
          <input 
          type="email" 
          name="email" 
          id="signup-email" 
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
          id="register-password" 
          placeholder="Password" 
          value={values.password}
          onChange={changeHandler}
          required />
          <i className="fa-solid fa-circle-check" /><label htmlFor="login-password">Password:</label>
          <span className="helper info">Password must be at least 8 characters long</span>
        </div>
        <div className="field">
          <input 
          type="password" 
          name="rePass" 
          id="repeat-password" 
          placeholder="rePass" 
          value={values.rePass}
          onChange={changeHandler}
          required />
          <i className="fa-solid fa-circle-check" /><label htmlFor="login-password">Repeat password:</label>
         
        </div>
        <p className="link-signup">Already have an account??<a href="/login">Login</a></p>
        <input type="submit" defaultValue="Submit" />
      </form>
    </div>
  );
}