import { useState } from 'react';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="accordion">
      {items.map((item, i) => (
        <div className="accordion-item" key={i}>
          <button
            className={`accordion-trigger${openIndex === i ? ' open' : ''}`}
            onClick={() => toggle(i)}
            aria-expanded={openIndex === i}
          >
            {item.title}
          </button>
          <div className={`accordion-body${openIndex === i ? ' open' : ''}`}>
            <div className="accordion-body-inner">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
