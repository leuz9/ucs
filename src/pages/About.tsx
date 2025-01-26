import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, BookOpen, Heart, Globe, Calendar, Building, ChevronDown, ChevronRight } from 'lucide-react';

function About() {
  const [activeSection, setActiveSection] = useState<string>('naissance');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  const historySections = [
    {
      id: 'naissance',
      title: 'La Naissance de l\'UCS',
      date: '22 Août 1973',
      content: [
        {
          subtitle: 'Fondation',
          text: 'L\'Union du Clergé Sénégalais est née au Séminaire Saint-Louis de Ziguinchor, en Casamance. Cette naissance fait suite à une Assemblée Plénière historique qui a réuni les Prêtres Diocésains du Sénégal.'
        },
        {
          subtitle: 'Premier Bureau',
          text: 'Le premier Bureau fut constitué avec l\'Abbé André SÈNE comme Président, l\'Abbé Théodore Adrien SARR (aujourd\'hui Cardinal) comme Secrétaire National, et l\'Abbé Alphonse NDIONE comme Trésorier.'
        }
      ]
    },
    {
      id: 'statuts',
      title: 'Les Statuts Fondateurs',
      date: '20-22 Août 1973',
      content: [
        {
          subtitle: 'Les Cinq Piliers',
          text: 'L\'Assemblée a établi les Statuts et le Règlement Intérieur autour de cinq axes majeurs : la vie commune, la vie spirituelle, la vie intellectuelle, la vie matérielle, et les relations.'
        }
      ]
    },
    {
      id: 'evolution',
      title: 'Évolution et Croissance',
      date: '1973-2023',
      content: [
        {
          subtitle: 'Développement',
          text: 'De 1973 à 2022, l\'UCS a connu 18 bureaux nationaux, témoignant d\'une gouvernance dynamique et évolutive.'
        },
        {
          subtitle: 'Configuration Actuelle',
          text: 'L\'UCS compte aujourd\'hui 508 Prêtres, répartis dans les sept Diocèses du Sénégal, formant un réseau pastoral étendu et efficace.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-blue-900 text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0.3 }}
          whileInView={{ opacity: 0.6 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1548625149-fc4a29cf7092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-blue-900/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Union du Clergé Sénégalais
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-200">
              Une histoire de foi, d'unité et de service depuis 1973
            </p>
          </motion.div>
        </div>
      </section>

      {/* Histoire Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Notre Histoire
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un demi-siècle d'engagement au service de l'Église du Sénégal
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Timeline */}
            <div className="lg:col-span-8">
              <div className="space-y-8">
                {historySections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative"
                  >
                    <div 
                      className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${
                        activeSection === section.id 
                          ? 'from-blue-600 to-blue-300' 
                          : 'from-gray-300 to-gray-200'
                      }`}
                    />
                    <div className="ml-6">
                      <div 
                        className={`cursor-pointer group ${
                          expandedSection === section.id ? 'bg-blue-50' : 'bg-white'
                        } rounded-lg shadow-md p-6 transition-all duration-300`}
                        onClick={() => setExpandedSection(
                          expandedSection === section.id ? null : section.id
                        )}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {section.title}
                            </h3>
                            <p className="text-blue-600 font-medium">
                              {section.date}
                            </p>
                          </div>
                          {expandedSection === section.id ? (
                            <ChevronDown className="h-5 w-5 text-blue-600" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                          )}
                        </div>
                        
                        <AnimatePresence>
                          {expandedSection === section.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              {section.content.map((item, i) => (
                                <div key={i} className="mb-4 last:mb-0">
                                  <h4 className="font-medium text-gray-900 mb-2">
                                    {item.subtitle}
                                  </h4>
                                  <p className="text-gray-600">
                                    {item.text}
                                  </p>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image et statistiques */}
            <div className="lg:col-span-4 space-y-8">
              <motion.div
                variants={fadeInUp}
                className="relative h-[300px] rounded-xl overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1548625149-fc4a29cf7092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Histoire de l'UCS"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Chiffres Clés
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Prêtres</span>
                    <span className="font-semibold text-blue-600">508</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Diocèses</span>
                    <span className="font-semibold text-blue-600">7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Bureaux Nationaux</span>
                    <span className="font-semibold text-blue-600">18</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Années d'existence</span>
                    <span className="font-semibold text-blue-600">50</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              className="text-center"
            >
              <Users className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">508</h3>
              <p className="text-gray-300">Prêtres</p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              className="text-center"
            >
              <Building className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">7</h3>
              <p className="text-gray-300">Diocèses</p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              className="text-center"
            >
              <Calendar className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">50</h3>
              <p className="text-gray-300">Années de Service</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectifs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos Objectifs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              L'UCS poursuit plusieurs objectifs nobles pour le service de l'Église et de la société
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Sainteté Sacerdotale",
                description: "Stimuler la sainteté des Prêtres Diocésains dans l'exercice de leur ministère"
              },
              {
                icon: Users,
                title: "Collaboration",
                description: "Renforcer les liens avec les Évêques et la collaboration avec les Consacrées et les fidèles laïcs"
              },
              {
                icon: BookOpen,
                title: "Formation",
                description: "Contribuer à la recherche et la réflexion en Théologie et en Pastorale"
              },
              {
                icon: Globe,
                title: "Mission",
                description: "Offrir aux Prêtres une plus large ouverture pour la mission hors de leur Diocèse"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                className="bg-gray-50 p-6 rounded-xl shadow-md"
              >
                <item.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Structure Organisationnelle */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Notre Structure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              L'UCS s'appuie sur quatre organes principaux pour assurer sa mission
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Assemblée Générale",
                description: "Organe suprême de délibération qui se réunit annuellement"
              },
              {
                title: "Bureau National",
                description: "Composé de cinq membres qui assurent la gestion quotidienne"
              },
              {
                title: "Conseil National",
                description: "Organe consultatif apportant ses avis au Bureau National"
              },
              {
                title: "Conseil de Gestion",
                description: "Assure le contrôle et le conseil en matière de gestion"
              }
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
          >
            <h2 className="text-3xl font-bold mb-6">
              Rejoignez Notre Mission
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Ensemble, contribuons à la mission de l'Église au Sénégal
            </p>
            <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Contactez-nous
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default About;