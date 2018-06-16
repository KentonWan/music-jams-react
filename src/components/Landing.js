import React from 'react';
import './Landing.css';

const Landing = () => (
  <section className="landing">
    <section className="subheading">
      <h1 className="hero-title">TURN THE MUSIC UP!</h1>
      <img className="landing-image" src="https://i.ytimg.com/vi/5Xh9sDqeVkU/maxresdefault.jpg" alt="Music Party" />
    </section>

    <section className="selling-points">
      <div className="point">
        <h2 className="point-title"><span className="ion-md-musical-notes"></span> Choose Your Music</h2>
        <p className="point-descriptions">The world is full of music; why should you have to listen to music that someone else chose?</p>
      </div>
      <div className="point">
        <h2 className="point-title"><span className="ion-md-wifi"></span> Unlimited, Streaming, Ad-Free</h2>
        <p className="point-descriptions">No arbitrary limits. No distractions.</p>
      </div>
      <div className="point">
        <h2 className="point-title"><span className="ion-md-phone-portrait"></span> Mobile Enabled</h2>
        <p className="point-descriptions">Listen to your music on the go. This streaming service is available on all mobile platforms</p>
      </div>
    </section>
  </section>
);

export default Landing;
