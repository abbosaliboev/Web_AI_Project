// Contact.js
import React from 'react';
import './Contact.css';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <section className="contact-container text-center" id="contact-us">
      {/* Header */}
      <div className="contact-header">
        <h2 className="section-title" style={{ color: 'white' }}>Stay Updated on Workplace Safety</h2>
        <p style={{ color: 'white' }}>
            Subscribe to get the latest features, updates, and AI improvements from our system.
        </p>
      </div>

      {/* Email form */}
      <div className="search-bar mt-5">
        <input
          type="text"
          className="input-p"
          placeholder="Your email address"
        />
        <button className="contact-btn">Get Started</button>
      </div>

      {/* Footer body */}
      <div className="container-fluid footer-body mt-5">
        <div className="row">

          {/* Footer text */}
          <div className="col-md-12">
            <div className="row">
                <p className="footer-item text-center">© 2025 Real-Time Safety Monitoring System. All rights reserved. </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;