import React, { useState } from 'react';
import { fleetList } from '../../data/fleet';

const inputBase =
  'w-full px-4 py-2.5 rounded-lg bg-ink border border-line text-white text-sm focus:outline-none focus:border-gold transition-colors duration-300';
const labelBase = 'block text-white/70 text-[0.8rem] font-medium mb-1.5';

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    fleetType: '',
    occasion: '',
    date: '',
    passengers: '',
    hours: '',
    requests: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const occasions = [
    'Wedding',
    'Quinceañera',
    'Prom & Homecoming',
    'Bachelor/Bachelorette Party',
    'Corporate Outing',
    'Concert or Sporting Event',
    'Airport Transfer',
    'Anniversary or Date Night',
    'Birthday Celebration',
    'Other Special Event',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Submit to the lead-capture API
      const res = await fetch('https://api-inform.bythub.in/?formId=uaavNvBcBBznC581zb54', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          fleetType: formData.fleetType,
          occasion: formData.occasion,
          date: formData.date,
          passengers: formData.passengers,
          hours: formData.hours,
          message: formData.requests,
        }),
      });

      if (!res.ok) throw new Error('Submission failed');

      // Redirect to the thank-you page (no client-side success state)
      window.location.href = '/oc/thank-you/';
    } catch {
      setError('Something went wrong. Please call us directly at (714) 313-9173 to book your ride.');
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl">
      <form onSubmit={handleSubmit}>
        <h3 className="font-serif-display text-lg text-white font-bold">Tell Us the Occasion</h3>
          <p className="text-white/60 text-sm mt-1 mb-5">We will handle all the details. Request a free quote in seconds.</p>

          {error && <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">{error}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className={labelBase}>Full Name *</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={inputBase} required placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="phone" className={labelBase}>Phone Number *</label>
              <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className={inputBase} required placeholder="(555) 000-0000" />
            </div>
            <div>
              <label htmlFor="email" className={labelBase}>Email Address *</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={inputBase} required placeholder="john@example.com" />
            </div>
            <div>
              <label htmlFor="fleetType" className={labelBase}>Preferred Fleet Type *</label>
              <select name="fleetType" id="fleetType" value={formData.fleetType} onChange={handleChange} className={inputBase} required>
                <option value="">Select a Vehicle</option>
                {fleetList.map((v) => (
                  <option key={v.id} value={v.id}>{v.name} (Up to {v.capacity} Pax)</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="occasion" className={labelBase}>Occasion *</label>
              <select name="occasion" id="occasion" value={formData.occasion} onChange={handleChange} className={inputBase} required>
                <option value="">Select Occasion</option>
                {occasions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className={labelBase}>Date of Service *</label>
              <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className={inputBase} required />
            </div>
            <div>
              <label htmlFor="passengers" className={labelBase}>Estimated Passengers *</label>
              <input type="number" name="passengers" id="passengers" value={formData.passengers} onChange={handleChange} className={inputBase} required min="1" max="100" placeholder="10" />
            </div>
            <div>
              <label htmlFor="hours" className={labelBase}>Hours Needed *</label>
              <input type="number" name="hours" id="hours" value={formData.hours} onChange={handleChange} className={inputBase} required min="1" max="24" placeholder="4" />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="requests" className={labelBase}>Special Demands / Destination details</label>
            <textarea
              name="requests"
              id="requests"
              value={formData.requests}
              onChange={handleChange}
              rows={3}
              className={inputBase}
              placeholder="E.g., Airport stops, wedding colors, custom decorations, beverages request..."
            />
          </div>

          <button type="submit" disabled={loading} className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer no-underline bg-gold text-black border border-gold shadow-[0_8px_25px_rgba(212,175,55,0.2)] hover:-translate-y-px hover:bg-gold-soft disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Processing...' : 'Get My Free Quote'}
          </button>
        </form>
    </div>
  );
}
