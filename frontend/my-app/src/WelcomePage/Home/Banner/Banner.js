// Banner.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bannerImg from '../../images/banner.png';
import './Banner.css';

const Banner = () => {
  return (
    <section className="banner" id="home">
      <Container fluid className="px-5">
        <Row className="align-items-center gx-5">
          <Col xs={12} md={6} className="text-center text-md-start">
            <div className="fade-in-up">
              <h1 className="heading">Welcome to the Real-Time Safety Monitoring System</h1>
              <p className="p-text mt-3">                     
                Monitor workplace safety in real time using smart AI technology.
                Detect PPE violations instantly, view live camera feeds, and stay in control — anytime, anywhere.
              </p>
            </div>
            <Link>
              <button className="global-btn mt-4" href="#pricing">Get Start</button>
            </Link>
          </Col>

          <Col xs={12} md={6} className="text-center mt-4 mt-md-0">
            <img
              src={bannerImg}
              alt="athena-agency"
              className="img-fluid scale-up rounded"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Banner;