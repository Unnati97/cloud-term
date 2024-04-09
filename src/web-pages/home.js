import React, { useEffect, useState } from "react";
import Logo from "../logo.svg";
import OtherNavBar from "./other-nav-bar";
import { Row, Col } from "reactstrap";
import { CiBookmark } from "react-icons/ci";
import { CgDetailsMore } from "react-icons/cg";
import axios from "axios";
import { base_url } from "..";
import { useHistory } from "react-router";

const Home = (props) => {
  const history = useHistory();
  const [jobslist, setJobsList] = useState([]);
  const [jobslistDummy, setJobsListDummy] = useState([]);
  const [searchJob, setSearchJob] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    getJobList();
    const fetchData = async () => {
      const data = await localStorage.getItem("userId");
      console.log("data-home", data);
      setUserId(data);
    };
    fetchData();
  }, []);

  const getJobList = async () => {
    try {
      const response = await axios.get(base_url + "/job-posts");

      setJobsList(response.data.data);
      setJobsListDummy(response.data.data);
    } catch (err) {
      console.log("error", err);
    }
  };

  const bookmarkFunction = async (index) => {
    console.log("Bookmark");
    try {
      const response = await axios.get(base_url + "/job-saved-post-create", {
        params: {
          jobSavedPostId: jobslist[index].jobPostId+"001",
          jobPostId: jobslist[index].jobPostId,
          userId: userId,
          jobTitle: jobslist[index].jobTitle,
          jobDescription: jobslist[index].jobDescription,
          jobType: jobslist[index].jobTypeName,
          jobLocation: jobslist[index].jobLocation,
          time: "Last update 4 minutes",
          imageURL: jobslist[index].imageURL,
          jobRole: jobslist[index].jobRole,
          siteUrl: jobslist[index].siteUrl,
          salary: jobslist[index].salary,
        },
      });
      history.replace("/bookmark");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (event) => {
    setSearchJob(String(event.target.value));
    setJobsList(jobslist);
  };

  const getSearchKeyword = () => {
    if (searchJob != "") {
      const filtered = jobslistDummy.filter((item) =>
        item.jobTitle.toLowerCase().includes(searchJob.toLowerCase())
      );
      setJobsList(filtered);
    } else {
      setJobsList(jobslistDummy);
    }
  };

  const jobDetailPage = async (index) => {
    localStorage.setItem("jobPostId", jobslist[index].jobPostId);
    localStorage.setItem("jobSavedPostId", jobslist[index].jobPostId+"001");
    localStorage.setItem("jobTypeName", jobslist[index].jobType);
    localStorage.setItem("jobTitle", jobslist[index].jobTitle);
    localStorage.setItem("imageURL", jobslist[index].imageURL);
    localStorage.setItem("jobDescription", jobslist[index].jobDescription);
    localStorage.setItem("jobRole", jobslist[index].jobRole);
    localStorage.setItem("salary", jobslist[index].salary);
    localStorage.setItem("jobLocation", jobslist[index].jobLocation);
    localStorage.setItem("siteUrl", jobslist[index].siteUrl);
    localStorage.setItem("userId", userId);
    history.push("/job-detail");
  };
  return (
    <>
      <>
        <OtherNavBar />
        <div className="auth-wrapper" style={{ marginTop: "7%" }}>
          <div className="auth-inner-search">
            <div className="input-group rounded">
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                id="search"
                name="search"
                aria-label="Search"
                aria-describedby="search-addon"
                onChange={handleChange}
              />
              <img
                src="https://media.istockphoto.com/vectors/search-icon-vector-id1068237878?k=20&m=1068237878&s=170667a&w=0&h=BpBnkSHoDP3tPTyBvzu_rWcVVb_c0dTSNs9XbC-xfc8="
                style={{ width: "50px", height: "50px" }}
                onClick={getSearchKeyword}
              />
            </div>
          </div>
          <br></br>
          <div className="auth-inner-list">
            {jobslist.map((element, index) => {
              if (index % 2 === 0) {
                return (
                  <div key={index}>
                    <Row>
                      <Col md={6}>
                        <div className="card mb-2 shadow p-1 bg-white rounded">
                          <Row className="no-gutters">
                            <Col md={4}>
                              <img
                                src={element.imageURL ? element.imageURL : Logo}
                                alt=""
                                width="auto"
                                height="100"
                              />
                            </Col>
                            <Col md={8}>
                              <div className="card-body">
                                <h5 className="card-jobTitle">
                                  {element.jobTitle}
                                </h5>
                                <p className="card-text">
                                  {element.jobLocation}
                                </p>
                                <p className="text-highlight">
                                  {element.jobType}
                                </p>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col style={{ padding: "0 5% 0 5%" }}>
                              <p
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: "vertical",
                                }}
                              >
                                {element.jobDescription}
                              </p>
                              <p className="card-text">
                                <small className="text-muted">
                                  {element.time}
                                </small>
                              </p>
                              <div
                                style={{
                                  float: "right",
                                  marginBottom: "1%",
                                }}
                              >
                                <button
                                  type="button"
                                  className="btn btn-info"
                                  onClick={() => bookmarkFunction(index)}
                                >
                                  <CiBookmark />
                                </button>
                                &nbsp;&nbsp;&nbsp;
                                <button
                                  type="button"
                                  className="btn btn-info"
                                  onClick={() => jobDetailPage(index)}
                                >
                                  <CgDetailsMore />
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col md={6}>
                        {index + 1 < jobslist.length && (
                          <div className="card mb-2 shadow p-1 bg-white rounded">
                            <Row className="no-gutters">
                              <Col md={4}>
                                <img
                                  src={
                                    jobslist[index + 1].imageURL
                                      ? jobslist[index + 1].imageURL
                                      : Logo
                                  }
                                  alt=""
                                  width="auto"
                                  height="100"
                                />
                              </Col>
                              <Col md={8}>
                                <div className="card-body">
                                  <h5 className="card-jobTitle">
                                    {jobslist[index + 1].jobTitle}
                                  </h5>
                                  <p className="card-text">
                                    {jobslist[index + 1].jobLocation}
                                  </p>
                                  <p className="text-highlight">
                                    {jobslist[index + 1].jobType}
                                  </p>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col style={{ padding: "0 5% 0 5%" }}>
                                <p
                                  style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                  }}
                                >
                                  {jobslist[index + 1].jobDescription}
                                </p>
                                <p className="card-text">
                                  <small className="text-muted">
                                    {jobslist[index + 1].time}
                                  </small>
                                </p>
                                <div
                                  style={{
                                    float: "right",
                                    marginBottom: "1%",
                                  }}
                                >
                                  <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={() => bookmarkFunction(index + 1)}
                                  >
                                    <CiBookmark />
                                  </button>
                                  &nbsp;&nbsp;&nbsp;
                                  <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={() => jobDetailPage(index + 1)}
                                  >
                                    <CgDetailsMore />
                                  </button>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </>
    </>
  );
};
export default Home;
