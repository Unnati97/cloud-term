import React, {useState} from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useHistory } from "react-router";
import axios from "axios";
import { base_url } from "..";

const OtherNavBar = (props) => {
  const history = useHistory();
  const [subscribeText, setSubscribeText] = useState("Subscribe");
  const handleLogOut = (event) => {
    event.preventDefault();
    try {
      history.replace("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const subscribe = async () => {
    try {
      const response = await axios.get(base_url + "/create-and-broadcast",{
        params:{
          action:"subscribe",
          email:"unnatikapadia97@gmail.com"
        }
      });

      setSubscribeText("Subscribed");
      
    } catch (err) {
      console.log("error", err);
    }
    console.log("Subscribe Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <img src={Logo} alt="" width="auto" height="60" />

        <Link className="navbar-brand" to={"/home"}>
          <b style={{ color: "var(--textColor)" }}>JobNest</b>
        </Link>

        <div
          className="collapse navbar-collapse"
          id="navbarNavAltMarkup"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={subscribe}
                style={{ cursor: "pointer" }}
              >
                {subscribeText}
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/bookmark"}>
                WishList
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/profile"}>
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={handleLogOut}
                style={{ cursor: "pointer" }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default OtherNavBar;
