import React, { useState, useEffect } from 'react';

interface Review {
  id?: number;
  name: string;
  rating?: number;
  source?: string;
  date?: string;
  text: string;
}

interface ReviewsSliderProps {
  reviews?: Review[];
}

const fallbackReviews: Review[] = [
  {
    name: 'Eli Isho',
    rating: 5,
    source: 'Google Review',
    date: '2 weeks ago',
    text: 'The absolute best limousine service in Orange County! We booked a Sprinter Limo for a corporate outing and it was in pristine condition. Our driver, Anthony, was professional, polite, and knew the best routes. Highly recommend!',
  },
  {
    name: 'Joel Romero',
    rating: 5,
    source: 'Google Review',
    date: '1 month ago',
    text: "We rented a stretch Hummer for my daughter's Quinceañera. Deluxe Limo went above and beyond. They decorated the interior to match her dress and even provided a red carpet rollout. Truly unforgettable experience!",
  },
  {
    name: 'Sena Ji',
    rating: 5,
    source: 'Google Review',
    date: '3 weeks ago',
    text: 'Extremely reliable airport transfer service. I use their executive black car service to SNA and LAX regularly. They are always 10 minutes early, the cars are clean, and the booking process is completely seamless.',
  },
  {
    name: 'Ashley B.',
    rating: 5,
    source: 'Yelp Review',
    date: '2 months ago',
    text: 'Deluxe Limo was the perfect choice for our wedding transportation. The Lincoln MKT stretch was spotless, the bar was fully stocked with cold drinks, and the driver arrived early. Excellent value for money!',
  },
];

export default function ReviewsSlider({ reviews = fallbackReviews }: ReviewsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const arrowClasses =
    'shrink-0 w-11 h-11 rounded-full border border-line bg-ink-raised text-gold flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-gold hover:bg-gold hover:text-black';

  return (
    <div>
      <div className="flex items-center gap-4">
        <button className={arrowClasses} onClick={handlePrev} aria-label="Previous Review">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        </button>

        <div className="overflow-hidden flex-1">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review, i) => (
              <div key={i} className="w-full shrink-0 px-1">
                <div className="bg-ink-raised/60 border border-line rounded-xl backdrop-blur-sm p-8 text-center max-w-[760px] mx-auto">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full bg-gold text-black font-bold flex items-center justify-center text-lg">
                      {review.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <h4 className="text-white text-[0.95rem] m-0">{review.name}</h4>
                      <span className="text-white/50 text-xs">
                        {review.source ?? 'Google Review'}
                        {review.date ? ` • ${review.date}` : ''}
                      </span>
                    </div>
                  </div>
                  <div className="text-gold tracking-[0.2em] mb-3">{'★'.repeat(review.rating ?? 5)}</div>
                  <p className="text-white/75 text-[0.95rem] leading-[1.75] m-0 italic">"{review.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className={arrowClasses} onClick={handleNext} aria-label="Next Review">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full border-none cursor-pointer transition-all duration-300 ${
              index === currentIndex ? 'bg-gold scale-125' : 'bg-white/25 hover:bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
