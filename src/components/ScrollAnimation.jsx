'use client';
import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export const ContainerScroll = ({
  titleComponent,
  children,
  direction = 'vertical',
  translateY = [-50, 0],
  rotateRange = [5, 0],
  scaleRange = [0.92, 1],
  opacityRange = [0.8, 1, 0.8], // Asegurar que coincida con el rango de entrada
  perspective = '1200px',
  className = '',
  containerClassName = ''
}) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
    smooth: 0.1
  });

  // Asegurar que los rangos de entrada/salida coincidan
  const inputRange = [0, 1]; // Rango de entrada consistente
  
  const rotate = useTransform(scrollYProgress, inputRange, rotateRange);
  const scale = useTransform(scrollYProgress, inputRange, scaleRange);
  const translate = useTransform(scrollYProgress, inputRange, translateY);
  
  // Para opacity que usa 3 puntos, asegurar que el rango de salida tenga 3 valores
  const opacityInputRange = [0, 0.5, 1];
  const opacity = useTransform(scrollYProgress, opacityInputRange, opacityRange);

  if (isMobile) {
    return (
      <div className={`flex items-center justify-center relative p-4 md:p-10 ${containerClassName}`}>
        <div className="py-10 w-full relative">
          {titleComponent}
          <div className="max-w-5xl mx-auto h-auto w-full border-4 border-primary-DEFAULT/80 p-4 bg-dark-light rounded-[30px]">
            <div className="h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-dark-DEFAULT to-dark-light/80 p-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-[60rem] md:h-[55rem] flex items-center justify-center relative p-4 md:p-10 ${containerClassName}`}
      ref={containerRef}
    >
      <div className="py-10 w-full relative" style={{ perspective }}>
        <Header translate={translate} opacity={opacity} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale} opacity={opacity} direction={direction}>
          {children}
        </Card>
      </div>
    </div>
  );
};

const Header = ({ translate, opacity, titleComponent }) => {
  return (
    <motion.div
      style={{ translateY: translate, opacity }}
      className="div max-w-5xl mx-auto text-center mb-8 md:mb-12"
    >
      {titleComponent}
    </motion.div>
  );
};

const Card = ({ rotate, scale, opacity, children, direction = 'vertical' }) => {
  return (
    <motion.div
      style={{
        rotateX: direction === 'vertical' ? rotate : 0,
        rotateY: direction === 'horizontal' ? rotate : 0,
        scale,
        opacity,
        boxShadow: '0 0 15px rgba(255, 95, 31, 0.3)',
        transformStyle: 'preserve-3d'
      }}
      className="max-w-5xl mx-auto h-auto w-full border-4 border-primary-DEFAULT/80 p-4 bg-dark-light rounded-[30px] backdrop-blur-sm"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-dark-DEFAULT to-dark-light/80 p-4">
        {children}
      </div>
    </motion.div>
  );
};

export default ContainerScroll;