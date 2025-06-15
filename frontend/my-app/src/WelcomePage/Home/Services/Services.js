import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,             // Live Detection
  faClock,           // Hours of Development
  faRobot,           // AI Training
  faLaptopCode       // Demo Runs
} from '@fortawesome/free-solid-svg-icons';
import './Service.css';

const achievement = [
  {
    id: 1,
    icon: faEye,
    num: '700+',
    des: 'Live Detections'
  },
  {
    id: 2,
    icon: faClock,
    num: '140+',
    des: 'Hours of Development'
  },
  {
    id: 3,
    icon: faRobot,
    num: '25+',
    des: 'AI Training Sessions'
  },
  {
    id: 4,
    icon: faLaptopCode,
    num: '75+',
    des: 'Demo Runs'
  }
];

const Services = () => {
  return (
    <section id="services">
      <Container fluid>
        <Row className="align-items-center">
          <Col xs={12} md={5}>
            <div>
              <h3 className="section-title">Our Achievements</h3>
              <p className="p-text">
                We have successfully built a smart and scalable safety monitoring system.
                From frontend to AI integration, every part was developed with care and teamwork.
              </p>
            </div>
          </Col>

          <Col xs={12} md={7}>
            <Row>
              {achievement.map((ac) => (
                <Col key={ac.id} xs={12} md={6} className="achieve mb-4">
                  <div className="achievement d-flex align-items-center gap-3">
                    <FontAwesomeIcon icon={ac.icon} className="achieve-icon" />
                    <div>
                      <p className="achieve-num"><strong>{ac.num}</strong></p>
                      <p>{ac.des}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Services;