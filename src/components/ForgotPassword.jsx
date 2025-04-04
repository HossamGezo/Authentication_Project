import {Link} from "react-router-dom";
import "./login.css";
import {useRef, useState} from "react";
import {useAuth} from "../context/AuthContextProvider";
const ForgotPassword = () => {
  const emailRef = useRef();
  const {resetPassword} = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await resetPassword(emailRef.current.value);
      setMessage("Check Your Inbox to get New Password");
    } catch {
      setError("Failed To Reset Password");
    }
    setLoading(false);
  };
  return (
    <>
      <form className="login" onSubmit={handleSubmit}>
        <h1 className="loginHead">Reset Password</h1>
        {error && <p className="match">{error}</p>}
        {message && <p className="match-green">{message}</p>}
        <div className="loginBody">
          <label className="email label">
            <span>Email</span>
            <input type="email" ref={emailRef} />
          </label>
        </div>
        <button disabled={loading}>Reset Password</button>
        <Link to="/login">
          <div className="forgotPassword">Login</div>
        </Link>
      </form>
      <div className="sinUp">
        Need an account? <Link to="/signup">Signup</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
