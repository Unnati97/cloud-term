import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/login.gif";
import { Row, Col } from "reactstrap";
import NavBar from "./welcome-nav-bar";

const Welcome = (props) => {
    return (
      <>
        <NavBar />
        <div className="auth-wrapper" style={{ marginTop: "5%" }}>
          <Row>
            <Col md={6} style={{ textAlign: "center" }}>
              <img
                src={Logo}
                alt=""
                style={{
                  height: "80%",
                  width: "auto",
                  margin: "5% 0 0 15%",
                }}
              />
            </Col>
            <Col md={6}>
              <div style={{ marginTop: "5%" }}>
                <h1>JobNest</h1>
                <h6>Find your choice of job with us.</h6>
                <p>
                  We offer a comprehensive platform for job seekers, providing a
                  seamless experience for connecting talent with opportunities.
                  With intuitive search and filtering features, candidates can
                  easily explore a wide range of job listings tailored to their
                  preferences. Our user-friendly interface ensures a smooth
                  navigation experience, empowering users to efficiently
                  navigate the job market. Our website serves as the ultimate
                  destination for fulfilling career aspirations.
                </p>
                <Link to="/login">
                  <button type="button" class="btn  button-style">
                    Sign In
                  </button>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/register">
                  <button type="button" class="btn btn-outline-info">
                    Sign Up
                  </button>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/chat">
                  <button type="button" class="btn btn-outline-info">
                    Chat with us
                  </button>
                </Link>
              </div>
            </Col>
          </Row>
          <div
            className="container"
            style={{ marginBottom: "5%", marginTop: "5%" }}
          >
            <Row>
              <Col>
                <div className="card mb-2 shadow p-3 bg-white rounded">
                  <Col md={2}>
                    <img
                      width="60"
                      height="60"
                      src="https://img.icons8.com/fluency/60/search.png"
                      alt="search"
                    />
                  </Col>
                  <Col md={10}>
                    <h6>Job Search</h6>
                    <p>
                      Makes it easier for people to find jobs that fit their
                      skills and interests.
                    </p>
                  </Col>
                </div>
              </Col>

              <Col>
                <div className="card mb-2 shadow p-3 bg-white rounded">
                  <Col md={2}>
                    <img
                      width="60"
                      height="60"
                      src="https://img.icons8.com/fluency/60/submit-for-approval.png"
                      alt="submit-for-approval"
                    />
                  </Col>
                  <Col md={10}>
                    <h6>Direct Apply</h6>
                    <p>
                      Apply for jobs directly through the platform, simplifying
                      the application process and saving time
                    </p>
                  </Col>
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="card mb-2 shadow p-3 bg-white rounded">
                  <Col md={2}>
                    <img
                      width="60"
                      height="60"
                      src="https://img.icons8.com/fluency/60/subscription.png"
                      alt="subscription"
                    />
                  </Col>
                  <Col md={10}>
                    <h6>Subcribe</h6>
                    <p>
                      Notifies users of new job postings matching their
                      preferences, ensuring they stay updated on relevant
                      opportunities.
                    </p>
                  </Col>
                </div>
              </Col>
              <Col>
                <div className="card mb-2 shadow p-3 bg-white rounded">
                  <Col md={2}>
                    <img
                      width="60"
                      height="60"
                      src="https://img.icons8.com/fluency/60/000000/save-search.png"
                      alt="save-search"
                    />
                  </Col>
                  <Col md={10}>
                    <h6>Save for latter</h6>
                    <p>
                      Allows users to save interesting job postings for future
                      reference, making it convenient to revisit and apply to
                      them later.
                    </p>
                  </Col>
                </div>
              </Col>
            </Row>
          </div>
          <br></br>
          
        </div>
        
      </>
    );
}
export default Welcome;
