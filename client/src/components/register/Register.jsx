
import { useAuthContext } from "../../contexts/AuthContext";
import { useAuthForm } from "../../hooks/useAuthForm";
import { useRegister } from "../../hooks/useRegister";

export default function Register() {
  const { language } = useAuthContext();

  const { registerCallback, translations } = useRegister(language);

  const defaultValues = { email: '', password: '', rePass: '' };

  const submitCallback = async ({ email, password, rePass }) => {

    if (password == rePass) {
      await registerCallback(email, password, rePass)
    }

  }

  const { values, changeHandler, submitHandler, isSubmitting, errors } = useAuthForm(
    defaultValues, submitCallback
  )

  return (

    <div className="form-divider">
      <form role="registerForm" className="form" onSubmit={submitHandler}>
        <header>
          <h1>{translations.header}</h1>
        </header>
        <div className="field">
          <input
            type="email"
            name="email"
            id="signup-email"
            placeholder={translations.emailPlaceholder}
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
            id="register-password"
            placeholder={translations.passwordPlaceholder}
            value={values.password}
            onChange={changeHandler}
            required
          />
          {errors.password ? <i className="fa-solid fa-circle-xmark text-red-500"></i> : <i className="fa-solid fa-circle-check text-green-500" />}
          <label htmlFor="login-password">{translations.passwordLabel}</label>
          {errors.password && (
            <span className="error text-red-500 text-sm">{errors.password}</span>
          )}
        </div>
        <div className="field">
          <input
            type="password"
            name="rePass"
            id="repeat-password"
            placeholder={translations.repeatPasswordPlaceholder}
            value={values.rePass}
            onChange={changeHandler}
            required />
          {errors.rePass ? <i className="fa-solid fa-circle-xmark text-red-500"></i> : <i className="fa-solid fa-circle-check text-green-500" />}
          <label htmlFor="login-password">{translations.repaetPasswordLabel}</label>
          {errors.rePass && (
            <span className="error text-red-500 text-sm" data-testid="error-rePass">
              {errors.rePass}
            </span>

          )}
        </div>
        <p className="link-signup">{translations.alreadyHaveAccount}<a href="/login">{translations.loginLink}</a></p>
        <input type="submit" defaultValue="Submit" disabled={isSubmitting} />
      </form>
    </div>
  );
}