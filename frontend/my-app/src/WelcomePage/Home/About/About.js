// About.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import aboutImg from '../../images/about.png';
import experience from '../../images/2.png';
import prototyping from '../../images/3.png';
import illustration from '../../images/4.png';
import interfaceImg from '../../images/5.png';
import './About.css';

const aboutCard = [
  { id: 1, img: experience, title: 'Live Camera Monitoring', text: 'Watch up to 6 camera feeds in real time directly on the dashboard.' },
  { id: 2, img: interfaceImg, title: 'PPE Detection with AI', text: 'Our AI detects whether workers are wearing helmets, vests, and gloves.' },
  { id: 3, img: prototyping, title: ' Violation Reports', text: 'All safety violations are recorded and shown clearly.' },
  { id: 4, img: illustration, title: 'Flexible AI Integration', text: 'The system supports different AI models.'}
];

const About = () => {
  return (
    <section id="about">
      <Container fluid>

        {/* Section Title */}
        <div className="text-center mb-5">
          <h2 className="section-title">What we do</h2>
          <p className="p-text">
          Our system is designed to make safety monitoring fast, smart, and user-friendly. Simplicity and real-time response are our strengths.
          </p>
        </div>

        {/* Cards */}
        <Row className="mb-5">
          {aboutCard.map((ab) => (
            <Col key={ab.id} xs={12} sm={6} md={6} lg={3} className="mb-4">
              <div className="about-cards h-100">
                <div className="img-top d-flex align-items-center justify-content-center">
                <img 
                  src={ab.img} 
                  alt={ab.title} 
                  className="img-fluid rounded" 
                  style={{ height: '80px', objectFit: 'contain' }} 
                />
                </div>
                <div className="text-center card-body pt-3">
                  <h5><strong>{ab.title}</strong></h5>
                  <p className="text-secondary">{ab.text}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* About Image & Description */}
        <Row className="align-items-center">
          <Col xs={12} md={6} className="mb-4 mb-md-0">
            <img src={aboutImg} alt="About" className="img-fluid" />
          </Col>
          <Col xs={12} md={6}>
            <div className="pl-md-3">
              <h2 className="section-title">Stay Safe & In Control</h2>
              <p className="text-secondary">
                Monitor workplace safety in real time with smart analytics and clear visuals.
                Track PPE usage, incident trends, and heatmaps — all in one dashboard.
                Make fast and informed decisions to protect your team.
              </p>
              <Link to="#contact-us">
                <button className="global-btn mt-3">Contact Us</button>
              </Link>
            </div>
          </Col>
        </Row>

      </Container>
    </section>
  );
};

export default About;
