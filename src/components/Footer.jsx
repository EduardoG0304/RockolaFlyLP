import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-dark-DEFAULT text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <Image 
                src="/images/logo.png" 
                alt="Logo de la aplicación"
                width={40}
                height={40}
                className="mr-3"
              />
              <span className="text-xl font-bold">Rockola<span className="text-primary-DEFAULT">Fly</span></span>
            </div>
            <p className="mt-4 text-gray-400 max-w-xs">
              La solución todo en uno para tus necesidades empresariales.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-gray-400 hover:text-primary-DEFAULT transition">Características</Link></li>
                <li><Link href="#lead" className="text-gray-400 hover:text-primary-DEFAULT transition">Contacto</Link></li>
                <li><Link href="#signup" className="text-gray-400 hover:text-primary-DEFAULT transition">Registro</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-primary-DEFAULT transition">Términos</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-primary-DEFAULT transition">Privacidad</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">info@appname.com</li>
                <li className="text-gray-400"></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} RockolaFly. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}