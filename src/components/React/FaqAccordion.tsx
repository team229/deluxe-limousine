import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={index}
            className={`bg-ink-raised border rounded-xl transition-colors duration-300 ${
              isOpen ? 'border-gold' : 'border-line hover:border-line-hover'
            }`}
          >
            <button
              className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 bg-transparent border-none cursor-pointer"
              onClick={() => toggleIndex(index)}
              aria-expanded={isOpen}
            >
              <span className="text-white text-[0.95rem] font-medium font-sans-body">{item.question}</span>
              <svg
                className={`w-[18px] h-[18px] shrink-0 text-gold transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-white/70 text-sm leading-[1.7] px-5 pb-5 m-0">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
