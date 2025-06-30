export default function Features() {
  const features = [
    {
      title: "Calidad",
      description: "Las mejores canciones a tu eleccion y a tu disposicion.",
      icon: "⚡"
    },
    {
      title: "Control",
      description: "El mejor manejo para las lista de reproducciones en el programa.",
      icon: "🔒"
    },
    {
      title: "Soporte",
      description: "Equipo de expertos disponibles 24/7 para ayudarte.",
      icon: "🛠️"
    }
  ];

  return (
    <section id="features" className="py-20 bg-dark-light">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-white mb-16">
          Características <span className="text-primary-DEFAULT">Destacadas</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-dark-DEFAULT p-8 rounded-lg shadow-lg hover:shadow-primary-DEFAULT/20 transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}