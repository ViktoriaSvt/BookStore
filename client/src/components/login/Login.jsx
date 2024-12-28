export default function Login() {
    return (

        <div className="form-divider">
          <form autoComplete="off" action="#" className="form">
            <header>
              <h1>Login</h1>
            </header>
            <div className="field">
              <input type="email" name="email" id="login-email" placeholder="Email" required />
              <i className="fa-solid fa-circle-check" /><label htmlFor="login-email">Email:</label>
              <span className="helper info">example: JohnDoe344@gmail.com</span>
            </div>
            <div className="field">
              <input type="password" name="password" id="login-password" placeholder="Password" required />
              <i className="fa-solid fa-circle-check" /><label htmlFor="login-password">Password:</label>
              <span className="helper info">Password must be at least 8 characters long</span>
            </div>
            <p className="link-signup">No account?<a href="/register">sign up</a></p>
            <input type="submit" defaultValue="Submit" />
          </form>
        </div>
      );
}