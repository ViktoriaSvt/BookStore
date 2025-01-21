
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthForm} from "../../hooks/useAuthForm";
import { useLogin } from "../../hooks/useLogin";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Login() {
 const {language} = useAuthContext();
 
  const {loginCallback, translations} = useLogin(language);

  const defaultValues = { email: '', password: '', rePass: '' };

  const loginHandler = async ({ email, password }) => {
    
    try {
      await loginCallback(email, password)
    } catch {
      toast.error("Invalid email or password. Please try again", {
        position: "top-right",
      });

    }
  }

  const { values, changeHandler, submitHandler, isSubmitting, errors } = useAuthForm(
    defaultValues, loginHandler
  )


  return (

    <div className="form-divider">
      <ToastContainer />
      <form autoComplete="off" className="form" onSubmit={submitHandler}>
        <header>
          <h1>{translations.header}</h1>

        </header>
        <div className="field">
          <input
            type="email"
            name="email"
            id="login-email"
            placeholder={translations.emailPlaceholde}
            value={values.email}
            onChange={changeHandler}
            required
          />
          {errors.email ? <i className="fa-solid fa-circle-xmark text-red-500"></i> : <i className="fa-solid fa-circle-check text-green-500" />}
          <label htmlFor="login-email">{translations.emailLabel}</label>
          {errors.email && (
            <span className="error text-red-500 text-sm">{errors.email}</span>
          )}

        </div>
        <div className="field">
          <input
            type="password"
            name="password"
            id="login-password"
            placeholder={translations.passwordPlaceholder}
            value={values.password}
            onChange={changeHandler}
            required />
          {errors.password ? <i className="fa-solid fa-circle-xmark text-red-500"></i> : <i className="fa-solid fa-circle-check text-green-500" />}
          <label htmlFor="login-password">{translations.passwordLabel}</label>
          {errors.password && (
            <span className="error text-red-500 text-sm">{errors.password}</span>
          )}

        </div>
        <p className="link-signup"> {translations.noAccount}<a href="/register">{translations.signUpLink}</a></p>
        <input type="submit" defaultValue="Submit" disabled={isSubmitting} />
      </form>
    </div>
  );
}