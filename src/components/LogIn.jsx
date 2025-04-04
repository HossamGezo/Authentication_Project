import {Link, useLocation, useNavigate} from "react-router-dom";
import "./login.css";
import {useAuth} from "../context/AuthContextProvider";
import {useRef, useState} from "react";
const LogIn = () => {
  const {login} = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate(redirectPath, {replace: true});
    } catch {
      setError("Failed To Log In");
    }
    setLoading(false);
  };
  return (
    <>
      <form className="login" onSubmit={handleLogIn}>
        <h1 className="loginHead">Login</h1>
        {error && <p className="match">{error}</p>}
        <div className="loginBody">
          <label className="email label">
            <span>Email</span>
            <input type="email" ref={emailRef} />
          </label>
          <label className="password label">
            <span>Password</span>
            <input type="password" ref={passwordRef} />
          </label>
        </div>
        <button disabled={loading}>LogIn</button>
        <Link to="/forgot-password">
          <div className="forgotPassword">Forgot Password</div>
        </Link>
      </form>
      <div className="sinUp">
        Need an account? <Link to="/signup">Sinup</Link>
      </div>
    </>
  );
};

export default LogIn;
