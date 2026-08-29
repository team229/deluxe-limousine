import React, { useState } from 'react';

interface Occasion {
  id: number;
  title: string;
  image: string;
  description: string;
  link: string;
}

export default function OccasionsSlider() {
  const occasions: Occasion[] = [
    {
      id: 1,
      title: "Weddings",
      image: "/images/2022/09/Deluxe-Limousine-Service-adds-1-6-1-1.png",
      description: "Arrive in classic elegance. Complimentary champagne toast, red carpet rollout, and decorations tailored to your wedding theme.",
      link: "/wedding"
    },
    {
      id: 2,
      title: "Proms & Homecomings",
      image: "/cbm-assets/deluxe-limousine/hummer-limo.jpeg",
      description: "Safe, supervised, and spectacular group travel for students. Parents rest easy, teens ride in absolute style.",
      link: "/prom"
    },
    {
      id: 3,
      title: "Airport Transfers",
      image: "/images/2022/09/Deluxe-Limousine-Service-adds-sprinter-1-4.png",
      description: "Stress-free, punctual transport to LAX, SNA, and LGB with real-time flight tracking and curbside passenger meet-and-greets.",
      link: "/airport-transportation-service"
    },
    {
      id: 4,
      title: "Quinceañeras",
      image: "/images/2022/09/Deluxe-Limousine-Service-adds-1-6.png",
      description: "A royal celebration. Elegant stretch limousines and custom decorations to make her 15th birthday party truly historic.",
      link: "/wedding" // Or quinceanera, mapping to wedding layout since they share styling
    },
    {
      id: 5,
      title: "Corporate Outings",
      image: "/images/2022/09/Deluxe-Limousine-Service-adds-sprinter-1-4-2.png",
      description: "Executive travel, airport transfers, and team event shuttles. Quiet, modern vehicles equipped for mobile business needs.",
      link: "/black-car-service"
    },
    {
      id: 6,
      title: "Concerts & Sports",
      image: "/images/2022/09/Deluxe-Limousine-Service-adds-1-6.png",
      description: "Skip traffic jams and crowded parking lot queues. Your party starts the moment you step into our custom sound-equipped vehicles.",
      link: "/party-bus-rental"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? occasions.length - 3 : prev - 1));
  };

  const handleNext = () => {
    // Show 3 slides on desktop, 1 on mobile. Max index is length - 3 on desktop.
    setCurrentIndex(prev => (prev >= occasions.length - 3 ? 0 : prev + 1));
  };

  return (
    <div className="occasions-slider-wrapper">
      <div className="slider-controls">
        <button className="slider-arrow prev" onClick={handlePrev} aria-label="Previous Occasions">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button className="slider-arrow next" onClick={handleNext} aria-label="Next Occasions">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      <div className="occasions-viewport">
        <div 
          className="occasions-track"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {occasions.map(occasion => (
            <div key={occasion.id} className="occasion-card-wrapper">
              <div className="occasion-card glass-panel">
                <div className="occasion-image-wrapper">
                  <img src={occasion.image} alt={occasion.title} loading="lazy" />
                  <div className="image-overlay"></div>
                </div>
                <div className="occasion-info">
                  <h3>{occasion.title}</h3>
                  <p>{occasion.description}</p>
                  <a href={occasion.link} className="btn-text">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="arrow-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
