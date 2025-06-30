'use client';

import { useState } from 'react';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    plan: 'basic'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registro enviado:', formData);
    alert('¡Registro exitoso! Bienvenido a nuestra plataforma.');
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-white mb-4">
        Crea tu <span className="text-primary-DEFAULT">cuenta</span> ahora
      </h2>
      <p className="text-center text-gray-300 mb-6">
        Únete a miles de usuarios satisfechos con nuestra plataforma.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-white mb-2">Nombre completo</label>
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
          <label htmlFor="password" className="block text-white mb-2">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-dark-DEFAULT border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
            required
          />
        </div>
        <div>
          <label htmlFor="plan" className="block text-white mb-2">Plan</label>
          <select
            id="plan"
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-dark-DEFAULT border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
          >
            <option value="basic">Básico</option>
            <option value="pro">Profesional</option>
            <option value="enterprise">Empresarial</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-primary-DEFAULT text-white py-3 px-6 rounded-md hover:bg-primary-dark transition font-medium"
        >
          Registrarse ahora
        </button>
      </form>
    </>
  );
}