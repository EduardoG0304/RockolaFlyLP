// components/AppShowcase.jsx
'use client';
import { ContainerScroll } from './ScrollAnimation';
import Image from 'next/image';

export default function AppShowcase() {
  return (
    <section className="py-20 bg-dark-light">
      <ContainerScroll
        titleComponent={
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Descubre <span className="text-primary-DEFAULT">nuestra app</span>
          </h2>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
          <div className="space-y-4">
            <Image
              src="/images/feature-1.png"
              alt="Feature 1"
              width={300}
              height={300}
              className="rounded-lg"
            />
            <h3 className="text-xl font-bold text-white">Interfaz intuitiva</h3>
          </div>
          <div className="space-y-4">
            <Image
              src="/images/feature-2.png"
              alt="Feature 2"
              width={300}
              height={300}
              className="rounded-lg"
            />
            <h3 className="text-xl font-bold text-white">Panel de control</h3>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}