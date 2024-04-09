import React, { Component, useState } from "react";
import Logo from "../assets/login.gif";
import OtherNavBar from "./other-nav-bar";
import { Alert } from "reactstrap";

const Profile = (props) => {
  const [showPassword, setShowPassword] = useState(true);
  const [userDetails, setUserDetails] = useState({
    username: "Unnati",
    emailAdd: "unnatikapadia97@gmail.com",
    password: "Unnati@123",
  });
  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);

  const [success, setSuccessMessage] = useState("");

  const setPasswordShown = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = ({ target: { name, value } }) => {
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const profileFunction = async (e) => {
    e.preventDefault();
    setSuccessMessage("Update successfully")
  };

  const { username, password, emailAdd } = userDetails;
  return (
    <>
      <OtherNavBar />
      <div className="profile-wrapper" style={{ marginTop: "7%" }}>
        <div className="profile-inner">
          <form onSubmit={profileFunction}>
          {success && (
                  <Alert color="success" isOpen={visible} toggle={onDismiss}>
                    {success} 
                  </Alert>
                )}
          <img width="96" height="96" src="https://img.icons8.com/fluency/96/gender-neutral-user--v1.png" alt="Profile" style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",}}/>

            <h3>Personal Details</h3>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                required
                onChange={handleChange}
                name="username"
                id="username"
                value={username}
              />
            </div>
            <br></br>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                required
                className="form-control"
                placeholder="Enter email"
                onChange={handleChange}
                name="emailAdd"
                id="emailAdd"
                value={emailAdd}
              />
            </div>
            <br></br>
            <div className="form-group">
              <label>Password</label>
              <input
                required
                className="form-control"
                placeholder="Enter password"
                type={showPassword ? "password" : "text"}
                value={password}
                onChange={handleChange}
                name="password"
                id="password"
              />
              <img
                src={
                  showPassword
                    ? "https://icons.veryicon.com/png/o/miscellaneous/hekr/action-hide-password.png"
                    : "https://static.thenounproject.com/png/777508-200.png"
                }
                style={{marginTop:"-10%", width:"10%"}}
                onClick={setPasswordShown}
                className="show-password-icon"
                alt="show/hide"
              />
            </div>
            <br></br>
            <button type="submit" className="btn btn-block  button-style">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Profile;
