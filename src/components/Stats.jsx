"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Stats = () => {
  // Datos de ejemplo - puedes reemplazarlos con tus propios datos
  const [statsData, setStatsData] = useState([
    { id: 1, value: 0, target: 12500, label: "Usuarios activos", suffix: "+" },
    { id: 2, value: 0, target: 98, label: "Satisfacción", suffix: "%" },
    { id: 3, value: 0, target: 24, label: "Tiempo respuesta", suffix: "h" },
    { id: 4, value: 0, target: 350, label: "Descargas diarias", suffix: "" },
  ]);

  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      // Animación de conteo
      statsData.forEach((stat, index) => {
        animateCounter(index, stat.target);
      });
    }
  }, [inView]);

  const animateCounter = (index, target) => {
    const duration = 2000; // 2 segundos
    const startTime = Date.now();
    const startValue = 0;
    const endValue = target;

    const updateCounter = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const currentValue = Math.floor(progress * (endValue - startValue) + startValue);
      
      setStatsData(prevStats => 
        prevStats.map((stat, i) => 
          i === index ? { ...stat, value: currentValue } : stat
        )
      );

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="bg-black py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl"
          >
            Nuestro Impacto
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="mt-5 max-w-xl mx-auto text-xl text-orange-200"
          >
            Datos que hablan por sí solos
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300"
              whileHover={{ y: -5, scale: 1.03 }}
            >
              <div className="text-center">
                <p className="text-5xl font-bold text-orange-500 mb-2">
                  {stat.value.toLocaleString()}
                  <span className="text-orange-400">{stat.suffix}</span>
                </p>
                <p className="text-lg font-medium text-white">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <button className="px-8 py-3 bg-orange-600 text-white font-medium rounded-full hover:bg-orange-700 transition-colors duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30">
            Ver estadísticas detalladas
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Stats;