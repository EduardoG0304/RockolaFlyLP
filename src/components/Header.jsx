'use client';
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const VortexHeader = ({ 
  children, 
  className,
  containerClassName,
  particleCount = 500,
  baseHue = 20,
  rangeY = 150,
  baseSpeed = 0.1,
  rangeSpeed = 1.0,
  baseRadius = 0.8,
  rangeRadius = 1.5,
  backgroundColor = "#000000",
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationFrameId = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const PARTICLE_PROP_COUNT = 9;
  const particleProps = useRef(new Float32Array(particleCount * PARTICLE_PROP_COUNT));
  const center = useRef([0, 0]);
  const tick = useRef(0);
  const noise3D = useRef(null);

  useEffect(() => {
    noise3D.current = createNoise3D();
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeCanvas(canvas);
    initParticles(canvas);
    startAnimation(canvas, ctx);

    const handleResize = () => {
      resizeCanvas(canvas);
      initParticles(canvas);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const resizeCanvas = (canvas) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    center.current = [canvas.width * 0.5, canvas.height * 0.5];
  };

  const initParticles = (canvas) => {
    tick.current = 0;
    const props = particleProps.current;
    
    for (let i = 0; i < props.length; i += PARTICLE_PROP_COUNT) {
      props[i] = Math.random() * canvas.width;
      props[i + 1] = center.current[1] + (Math.random() * rangeY * 2 - rangeY);
      props[i + 2] = 0;
      props[i + 3] = 0;
      props[i + 4] = 0;
      props[i + 5] = 50 + Math.random() * 150;
      props[i + 6] = baseSpeed + Math.random() * rangeSpeed;
      props[i + 7] = baseRadius + Math.random() * rangeRadius;
      props[i + 8] = baseHue + Math.random() * 30;
    }
  };

  const startAnimation = (canvas, ctx) => {
    const animate = () => {
      tick.current++;
      drawFrame(canvas, ctx);
      animationFrameId.current = requestAnimationFrame(animate);
    };
    animate();
  };

  const drawFrame = (canvas, ctx) => {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawParticles(canvas, ctx);
    applyGlowEffect(canvas, ctx);
  };

  const drawParticles = (canvas, ctx) => {
    const props = particleProps.current;
    const noise = noise3D.current;
    const xOff = 0.00125;
    const yOff = 0.00125;
    const zOff = 0.0005;
    const noiseSteps = 3;
    const TAU = 2 * Math.PI;

    for (let i = 0; i < props.length; i += PARTICLE_PROP_COUNT) {
      let x = props[i];
      let y = props[i + 1];
      const life = props[i + 4];
      const ttl = props[i + 5];
      const speed = props[i + 6];
      const radius = props[i + 7];
      const hue = props[i + 8];

      const n = noise(x * xOff, y * yOff, tick.current * zOff) * noiseSteps * TAU;
      const vx = 0.5 * props[i + 2] + 0.5 * Math.cos(n);
      const vy = 0.5 * props[i + 3] + 0.5 * Math.sin(n);
      const x2 = x + vx * speed;
      const y2 = y + vy * speed;

      ctx.save();
      ctx.lineCap = "round";
      ctx.lineWidth = radius;
      ctx.strokeStyle = `hsla(${hue},100%,60%,${Math.abs(((life + ttl * 0.5) % ttl) - ttl * 0.5) / (ttl * 0.5)})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();

      props[i] = x2;
      props[i + 1] = y2;
      props[i + 2] = vx;
      props[i + 3] = vy;
      props[i + 4] = life + 1;

      if (x2 < 0 || x2 > canvas.width || y2 < 0 || y2 > canvas.height || life > ttl) {
        props[i] = Math.random() * canvas.width;
        props[i + 1] = center.current[1] + (Math.random() * rangeY * 2 - rangeY);
        props[i + 4] = 0;
      }
    }
  };

  const applyGlowEffect = (canvas, ctx) => {
    ctx.save();
    ctx.filter = "blur(6px) brightness(150%)";
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  };

  if (isMobile) {
    return (
      <div className={cn("relative h-full w-full", containerClassName)}>
        <div className={cn("relative z-10", className)}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative h-full w-full", containerClassName)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={containerRef}
        className="absolute h-full w-full inset-0 z-0 bg-transparent flex items-center justify-center"
      >
        <canvas ref={canvasRef} className="w-full h-full" />
      </motion.div>
      <div className={cn("relative z-10", className)}>
        {children}
      </div>
    </div>
  );
};

function Header() {
  return (
    <VortexHeader 
      className="min-h-screen"
      containerClassName="bg-dark-DEFAULT"
    >
      <div className="container mx-auto px-4 h-full flex flex-col">
        <nav className="pt-6 pb-4 flex justify-between items-center z-20">
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="mr-3"
              priority
            />
            <span className="text-2xl font-bold text-white">
              Rockola<span className="text-orange-500">Fly</span>
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="#features" className="text-white/80 hover:text-white transition-colors">
              Características
            </Link>
            <Link href="#demo" className="text-white/80 hover:text-white transition-colors">
              Demo
            </Link>
          </div>
          
          <Link 
            href="#signup"
            className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
          >
            Registrarse
          </Link>
        </nav>

        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-4xl text-center z-20 py-10">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Revoluciona tu <span className="text-orange-500">música</span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-10"
            >
              La plataforma definitiva para gestionar y compartir tus listas de reproducción.
            </motion.p>
            
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="#signup"
                className="px-8 py-3 bg-orange-500 text-white rounded-full text-lg font-medium hover:bg-orange-600 transition-colors"
              >
                Comenzar ahora
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </VortexHeader>
  );
}

export { VortexHeader };
export default Header;  