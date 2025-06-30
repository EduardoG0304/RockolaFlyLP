import Image from 'next/image';
import { ContainerScroll } from './ScrollAnimation';

export default function Hero() {
  return (
    <div className="bg-dark-DEFAULT space-y-10 md:space-y-0"> {/* Añadido bg-dark-DEFAULT */}
      {/* Contenedor principal */}
      <ContainerScroll
        titleComponent={
          <div className="text-center">
            <h1 className="text-3xl md:text-6xl font-bold mb-4 text-white">
              Descubre Nuestra <span className="text-primary-DEFAULT">App</span>
            </h1>
            <p className="text-lg mb-6 text-gray-300 max-w-md mx-auto">
              La mejor solución móvil para tu negocio en cualquier dispositivo.
            </p>
          </div>
        }
      >
        <div className="flex flex-col md:flex-row justify-center items-center h-full gap-8 md:gap-16">
          {/* Primer teléfono */}
          <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[500px] w-[250px] md:h-[600px] md:w-[300px]">
            <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[3px] top-[72px] rounded-l-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[3px] top-[124px] rounded-l-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[3px] top-[178px] rounded-l-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[3px] top-[142px] rounded-r-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-[222px] h-[472px] md:w-[272px] md:h-[572px] bg-white">
              <Image
                src="/images/app-screenshot1.png"
                alt="Interfaz principal de la app"
                width={272}
                height={572}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Segundo teléfono */}
          <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[500px] w-[250px] md:h-[600px] md:w-[300px]">
            <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[3px] top-[72px] rounded-l-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[3px] top-[124px] rounded-l-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[3px] top-[178px] rounded-l-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[3px] top-[142px] rounded-r-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-[222px] h-[472px] md:w-[272px] md:h-[572px] bg-white">
              <Image
                src="/images/app-screenshot2.png"
                alt="Funciones avanzadas de la app"
                width={272}
                height={572}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}