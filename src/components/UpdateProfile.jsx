import {Link, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import "./login.css";
import {useAuth} from "../context/AuthContextProvider";

const UpdateProfile = () => {
  const {
    currentUser,
    updateUserEmail,
    updateUserPassword,
  } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Password do not match");
    }
    const promises = [];
    setError("");
    setLoading(true);
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateUserEmail(emailRef.current.value));
      console.log(emailRef.current.value);
    }
    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
      console.log(passwordRef.current.value);
    }
    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <form className="updateProfile" onSubmit={handleSubmit}>
        <h1 className="updateProfileHead">Update Profile</h1>
        {error && <p className="match">{error}</p>}
        <div className="updateProfileBody">
          <label className="email label">
            <span>Email</span>
            <input
              type="email"
              defaultValue={currentUser?.email}
              ref={emailRef}
              required
            />
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
        <button className="updateBtn" disabled={loading}>
          Update
        </button>
      </form>
      <div className="update">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
};

export default UpdateProfile;

// 45ba25246c@emaily.pro
