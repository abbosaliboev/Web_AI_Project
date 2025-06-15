import React from 'react';
import './Pricing.css';

const plans = [
  {
    title: 'Basic Plan',
    price: '$199',
    features: [
      'Real-time PPE Detection',
      '1 Live Camera Feed',
      'Summary Dashboard',
      'Basic Report View',
      '10 Days Free Support',
      '24/7 Technical Help',
    ],
  },
  {
    title: 'Pro Plan',
    price: '$399',
    features: [
      'Real-time PPE Detection',
      'Up to 4 Live Cameras',
      'Full Dashboard + Reports',
      'AI Custom Model Upload',
      '20 Days Free Support',
      '24/7 Technical Help',
    ],
  },
  {
    title: 'Enterprise Plan',
    price: '$599',
    features: [
      'Real-time PPE Detection',
      'Up to 8 Live Cameras',
      'Advanced Analytics & Exports',
      'Unlimited Report History',
      'Priority AI Model Integration',
      '30 Days Free Support',
      '24/7 Dedicated Support',
    ],
  },
];

const Pricing = () => {
  return (
    <section className="pricing-container" id="pricing">
      <h2 className="section-title mb-5 text-center">Choose Your Safety Package</h2>
      <div className="row">
        {plans.map((plan, idx) => (
          <div className="col-12 col-md-4 p-4" key={idx}>
            <div className="card h-100 shadow-sm p-3">
              <div className="card-body d-flex flex-column justify-content-between">
                <div className="text-center mb-3">
                  <h1 className="card-title">{plan.price}</h1>
                  <h6 className="price-tag">{plan.title}</h6>
                </div>
                <ul className="list-unstyled px-3 mb-4">
                  {plan.features.map((feature, i) => (
                    <li key={i}><h6>{feature}</h6></li>
                  ))}
                </ul>
                <div className="text-center" href="#pricing">
                  <button className="global-btn">Choose Plan</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;