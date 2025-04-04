import {Link, useNavigate} from "react-router-dom";
import "./login.css";
import {useAuth} from "../context/AuthContextProvider";
import {useRef, useState} from "react";
const SignUp = () => {
  const {signup} = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error){
      setError(`Error: ${error.message}`);
    }
    setLoading(true);
  };

  return (
    <>
      <form className="sinup" onSubmit={handleSubmit}>
        <h1 className="sinupHead">Signup</h1>
        {error && <p className="match">{error}</p>}
        <div className="sinupBody">
          <label className="email label">
            <span>Email</span>
            <input type="email" ref={emailRef} />
          </label>
          <label className="password label">
            <span>Password</span>
            <input type="password" ref={passwordRef} />
          </label>
          <label className="password label">
            <span>Password Confirmation</span>
            <input type="password" ref={passwordConfirmationRef} />
          </label>
        </div>
        <button disabled={loading}>Signup</button>
      </form>
      <div className="sinUp">
        Already have an account <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default SignUp;
