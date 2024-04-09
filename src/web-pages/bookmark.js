import React, { useEffect, useState } from "react";
import Logo from "../logo.svg";
import OtherNavBar from "./other-nav-bar";
import { Row, Col } from "reactstrap";
import { CgDetailsMore } from "react-icons/cg";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { IoMdBookmark } from "react-icons/io";
import { base_url } from "..";

const Bookmark = (props) => {
  const history = useHistory();
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [bookmarkList, setBookmarkList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await localStorage.getItem("userId");
      setUserId(data);
      getBookmarkList();
    };
    fetchData();
  }, []);

  const getBookmarkList = async () => {
    try {
      const response = await axios.get(
        base_url+"/saved-job-posts",
        {
          params: {
            userId: userId,
          },
        }
      );
      
      setBookmarkList(response.data.data);
    } catch (err) {
      console.log("error", err);
    }
  };

  const delBookmarkFunction = async (index) => {
    console.log("Delete Bookmark");
    try {
      const response = await axios.get(base_url + "/job-saved-post-delete", {
        params: {
          jobSavedPostId: bookmarkList[index].jobPostId+"001",
        },
      });
      getBookmarkList()
    } catch (error) {
      console.log(error.message);
    }
  };

  const jobDetailPage = async (index) => {
    localStorage.setItem("jobPostId", bookmarkList[index].jobPostId);
    localStorage.setItem("jobTypeName", bookmarkList[index].jobType);
    localStorage.setItem("jobTitle", bookmarkList[index].jobTitle);
    localStorage.setItem("imageURL", bookmarkList[index].imageURL);
    localStorage.setItem("jobDescription", bookmarkList[index].jobDescription);
    localStorage.setItem("jobRole", bookmarkList[index].jobRole);
    localStorage.setItem("salary", bookmarkList[index].salary);
    localStorage.setItem("jobLocation", bookmarkList[index].jobLocation);
    localStorage.setItem("siteUrl", bookmarkList[index].siteUrl);
    localStorage.setItem("userId", userId);
    history.push("/job-detail");
  };
  return (
    <>
      <>
        <OtherNavBar />
        {bookmarkList.length!=0?(<div className="auth-wrapper" style={{ marginTop: "7%" }}>
          <div className="auth-inner-list">
            {bookmarkList.map((element, index) => {
              return (
                <div key={index}>
                  <div className="card mb-2 shadow p-1 bg-white rounded">
                    <Row className="no-gutters">
                      <Col md={2}>
                        <img
                          src={element.imageURL ? element.imageURL : Logo}
                          alt=""
                          width="auto"
                          height="100"
                        />
                      </Col>
                      <Col md={8}>
                        <div className="card-body">
                          <h5 className="card-jobTitle">{element.jobTitle}</h5>
                          <p className="card-text">{element.jobLocation}</p>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="card-body">
                          <Row>
                            <Col>
                              {" "}
                              <button
                                type="button"
                                className="btn button-style"
                                onClick={() => delBookmarkFunction(index)}
                              >
                                <IoMdBookmark /> Remove
                              </button>
                            </Col>
                          </Row>
                          <Row>
                            <Col style={{ marginTop: "5%" }}>
                              {" "}
                              <button
                                type="button"
                                className="btn btn-outline-info"
                                onClick={() => jobDetailPage(index)}
                              >
                                <CgDetailsMore /> More details
                              </button>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              );
            })}
          </div>
        </div>): (<div><h6 style={{marginTop:"10%"}}>No Bookmark added</h6></div>)}
        
      </>
    </>
  );
};
export default Bookmark;
