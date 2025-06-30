'use client';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

// Configuración de iconos personalizados
const createCustomIcon = (color) => {
  return new L.Icon({
    iconUrl: `data:images/logo.png,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="${color}"><path d="M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zm0 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/></svg>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null
  });
};

const locations = [
  {
    id: 1,
    name: "Centro Histórico",
    position: [20.6766, -103.3475],
    users: 1240,
    description: "Zona con mayor concentración de usuarios",
    color: "#FF5F1F"
  },
  {
    id: 2,
    name: "Zapopan",
    position: [20.7238, -103.3858],
    users: 980,
    description: "Crecimiento rápido en los últimos meses",
    color: "#4CAF50"
  },
  {
    id: 3,
    name: "Tlaquepaque",
    position: [20.6409, -103.2932],
    users: 750,
    description: "Zona cultural con alta adopción",
    color: "#2196F3"
  },
  {
    id: 4,
    name: "Providencia",
    position: [20.6975, -103.3809],
    users: 1120,
    description: "Área empresarial con uso profesional",
    color: "#9C27B0"
  },
  {
    id: 5,
    name: "Andares",
    position: [20.7136, -103.4167],
    users: 890,
    description: "Zona comercial premium",
    color: "#FFC107"
  }
];

const MapAnimation = () => {
  const [activeLocation, setActiveLocation] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Pequeño delay para asegurar que el mapa se montó correctamente
    const timer = setTimeout(() => setMapReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleMarkerClick = (location) => {
    setActiveLocation(location);
  };

  return (
    <section className="py-20 bg-dark-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Nuestra presencia en <span className="text-primary-DEFAULT">Guadalajara</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Descubre los puntos clave donde nuestra aplicación está revolucionando la experiencia musical
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-dark-DEFAULT p-6 rounded-xl border border-gray-700 h-full">
              <h3 className="text-2xl font-bold text-white mb-6">
                Puntos de <span className="text-primary-DEFAULT">actividad</span>
              </h3>
              
              <div className="space-y-4">
                {locations.map((location) => (
                  <motion.div
                    key={location.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${activeLocation?.id === location.id ? 'bg-primary-DEFAULT/20 border border-primary-DEFAULT' : 'bg-dark-light hover:bg-gray-800'}`}
                    onClick={() => handleMarkerClick(location)}
                  >
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-3" 
                        style={{ backgroundColor: location.color }}
                      />
                      <h4 className="text-lg font-semibold text-white">{location.name}</h4>
                    </div>
                    <p className="text-gray-300 mt-1 text-sm">{location.users.toLocaleString()} usuarios</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 bg-dark-light p-4 rounded-lg border border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-2">Estadísticas totales</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-3xl font-bold text-primary-DEFAULT">
                      {locations.reduce((sum, loc) => sum + loc.users, 0).toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-sm">Usuarios activos</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary-DEFAULT">{locations.length}</p>
                    <p className="text-gray-400 text-sm">Zonas cubiertas</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative"
          >
            <div className="h-[500px] md:h-[600px] w-full rounded-xl overflow-hidden border-4 border-primary-DEFAULT/50 relative">
              {mapReady && (
                <MapContainer
                  center={[20.6766, -103.3475]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                  zoomControl={false}
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  />
                  
                  {locations.map((location) => (
                    <Marker
                      key={location.id}
                      position={location.position}
                      icon={createCustomIcon(location.color)}
                      eventHandlers={{
                        click: () => handleMarkerClick(location),
                      }}
                    >
                      <Popup>
                        <div className="text-dark-DEFAULT">
                          <h3 className="font-bold">{location.name}</h3>
                          <p>{location.users} usuarios</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}

              {/* Efecto de brillo animado */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-primary-DEFAULT/10 rounded-xl" />
              </motion.div>
            </div>

            {/* Información de ubicación seleccionada */}
            {activeLocation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 left-6 right-6 bg-dark-DEFAULT/90 backdrop-blur-sm p-4 rounded-lg border border-gray-700 shadow-lg z-[1000]"
              >
                <div className="flex items-start">
                  <div 
                    className="w-6 h-6 rounded-full mr-3 mt-1 flex-shrink-0" 
                    style={{ backgroundColor: activeLocation.color }}
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{activeLocation.name}</h3>
                    <p className="text-gray-300">{activeLocation.description}</p>
                    <p className="text-primary-DEFAULT font-medium mt-2">
                      {activeLocation.users.toLocaleString()} usuarios activos
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Leyenda animada */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          {locations.map((location) => (
            <motion.div
              key={location.id}
              whileHover={{ scale: 1.05 }}
              className="flex items-center px-4 py-2 bg-dark-DEFAULT rounded-full border border-gray-700"
            >
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: location.color }}
              />
              <span className="text-white text-sm">{location.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MapAnimation;