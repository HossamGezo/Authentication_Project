import "./App.css";
import {Routes, Route} from "react-router-dom";
import SinUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import UpdateProfile from "./components/UpdateProfile";
import ForgotPassword from "./components/ForgotPassword";
import Dasboard from "./components/Dashboard";
import RequireAuth from "./context/RequireAuth";

function App() {
  return (
    <>
      <div className="container">
        <div className="app">
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Dasboard />
                </RequireAuth>
              }
            />
            <Route path="/signup" element={<SinUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
