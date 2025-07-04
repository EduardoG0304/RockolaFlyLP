'use client';
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from 'next/dynamic';

const VortexHeader = dynamic(
  () => import('./VortexHeader'),
  { 
    ssr: false,
    loading: () => <div className="min-h-screen bg-dark-DEFAULT" />
  }
);

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

export default Header;