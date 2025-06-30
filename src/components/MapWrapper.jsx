// components/MapWrapper.jsx
'use client';
import dynamic from 'next/dynamic';

const MapWrapper = dynamic(
  () => import('./MapAnimation'),
  { 
    ssr: false,
    loading: () => <div className="h-[500px] md:h-[600px] w-full bg-gray-800 rounded-xl" />
  }
);

export default MapWrapper;