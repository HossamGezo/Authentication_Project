import {useState} from "react";
import {useAuth} from "../context/AuthContextProvider";
import "./login.css";
import {Link, useNavigate} from "react-router-dom";
const Dasboard = () => {
  const {currentUser, logout} = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("You Failed To Logout");
    }
  };
  return (
    <>
      <form className="profile">
        <h1 className="profileHead">Profile</h1>
        {error && <p className="match">{error}</p>}
        <div className="profileBody">
          <p className="userMail">
            <strong className="mail">Email:</strong>{" "}
            {currentUser && currentUser.email}
          </p>
        </div>
        <Link to="/update-profile">
          <button className="profileBtn">Update Profile</button>
        </Link>
      </form>
      <button className="profileLogout" onClick={handleLogOut}>
        Log out
      </button>
    </>
  );
};

export default Dasboard;
