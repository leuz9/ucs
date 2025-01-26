import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Book, Star } from 'lucide-react';

function About() {
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
              Notre Histoire
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Découvrez l'histoire de notre église, notre mission et nos valeurs qui nous guident dans notre service pour Christ.
            </p>
          </motion.div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Notre Parcours de Foi
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Fondée en 1995, l'Unité Charité Sainteté est née de la vision de créer une communauté chrétienne authentique et accueillante au cœur de Paris.
                </p>
                <p>
                  Au fil des années, notre église a grandi non seulement en nombre mais aussi en impact dans la communauté locale, développant des ministères qui touchent les vies et transforment les cœurs.
                </p>
                <p>
                  Aujourd'hui, nous continuons d'avancer avec la même passion et le même engagement pour l'Évangile, tout en nous adaptant aux besoins changeants de notre génération.
                </p>
              </div>
            </div>
            <div className="relative h-96">
              <img
                src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Church interior"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos Valeurs Fondamentales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ces principes guident notre mission et façonnent notre communauté
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Communauté</h3>
              <p className="text-gray-600">
                Créer des liens authentiques et soutenir chaque membre dans son parcours spirituel
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Compassion</h3>
              <p className="text-gray-600">
                Manifester l'amour du Christ à travers des actions concrètes
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <Book className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enseignement</h3>
              <p className="text-gray-600">
                Approfondir notre connaissance de la Parole de Dieu
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                Servir Dieu et les autres avec excellence et intégrité
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Notre Équipe Pastorale
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une équipe dévouée au service de Dieu et de la communauté
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Pasteur David Martin",
                role: "Pasteur Principal",
                image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Sarah Dubois",
                role: "Pasteure Associée",
                image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Marc Laurent",
                role: "Responsable Jeunesse",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
              }
            ].map((leader) => (
              <div key={leader.name} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{leader.name}</h3>
                  <p className="text-gray-600">{leader.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;