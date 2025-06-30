'use client';

import { useState } from 'react';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    alert('Gracias por tu interés. Nos pondremos en contacto contigo pronto.');
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-white mb-4">
        ¿Interesado en <span className="text-primary-DEFAULT">nuestra solución</span>?
      </h2>
      <p className="text-center text-gray-300 mb-6">
        Déjanos tus datos y te contactaremos para una demostración personalizada.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="name" className="block text-white mb-2">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-DEFAULT border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-DEFAULT border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
              required
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-white mb-2">Empresa</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-DEFAULT border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-white mb-2">Mensaje</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 bg-dark-DEFAULT border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-primary-DEFAULT text-white py-3 px-6 rounded-md hover:bg-primary-dark transition font-medium"
        >
          Enviar solicitud
        </button>
      </form>
    </>
  );
}