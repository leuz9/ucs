import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Music, Users, Heart, BookOpen, Baby } from 'lucide-react';

function Services() {
  const weeklyServices = [
    {
      day: "Dimanche",
      time: "10h00",
      name: "Culte Principal",
      description: "Un temps de louange, d'adoration et d'enseignement pour toute la famille."
    },
    {
      day: "Mercredi",
      time: "18h30",
      name: "Étude Biblique",
      description: "Approfondissement de la Parole de Dieu et partage fraternel."
    },
    {
      day: "Vendredi",
      time: "19h00",
      name: "Soirée de Prière",
      description: "Un moment dédié à la prière et à l'intercession communautaire."
    }
  ];

  const ministries = [
    {
      icon: Music,
      name: "Ministère de Louange",
      description: "Une équipe talentueuse qui conduit l'assemblée dans l'adoration."
    },
    {
      icon: Baby,
      name: "Ministère des Enfants",
      description: "Un enseignement adapté pour les plus jeunes pendant le culte."
    },
    {
      icon: Users,
      name: "Ministère des Jeunes",
      description: "Des activités et études bibliques pour les adolescents et jeunes adultes."
    },
    {
      icon: Heart,
      name: "Ministère d'Entraide",
      description: "Soutien aux personnes dans le besoin de notre communauté."
    },
    {
      icon: BookOpen,
      name: "Formation Disciples",
      description: "Programme de formation pour grandir dans la foi."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nos Services
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Découvrez nos différents services et ministères pour grandir ensemble dans la foi
            </p>
          </motion.div>
        </div>
      </section>

      {/* Weekly Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Services Hebdomadaires
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rejoignez-nous pour nos différentes rencontres tout au long de la semaine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {weeklyServices.map((service) => (
              <motion.div
                key={service.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">{service.day}</h3>
                    <p className="text-blue-600 font-medium">{service.time}</p>
                  </div>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">{service.name}</h4>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos Ministères
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des équipes dévouées au service de Dieu et de la communauté
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministries.map((ministry, index) => (
              <motion.div
                key={ministry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <ministry.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{ministry.name}</h3>
                <p className="text-gray-600">{ministry.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Participez à Nos Services
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nous serions ravis de vous accueillir lors de nos prochaines rencontres
          </p>
          <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Contactez-nous
          </button>
        </div>
      </section>
    </div>
  );
}

export default Services;