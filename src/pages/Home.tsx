import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Users, Dribbble as Bible, SprayCan as Pray } from 'lucide-react';

function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen bg-black overflow-hidden">
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://cdn.pixabay.com/photo/2021/10/12/13/46/cross-6703536_1280.jpg')"
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-black opacity-50" />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-3xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-white"
            >
              Bienvenue à l'Unité
              <span className="text-blue-400"> Charité </span>
              Sainteté
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="text-xl md:text-2xl mb-8 text-gray-200"
            >
              Un lieu de foi, d'amour et de communion fraternelle
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center hover:bg-blue-700 transition-colors"
            >
              Rejoignez-nous
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <ArrowRight className="h-8 w-8 text-white transform rotate-90" />
          </div>
        </motion.div>
      </section>

      {/* Vision Section with Floating Cards */}
      <section className="py-24 bg-gradient-to-b from-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-white mb-6"
            >
              Notre Vision
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Nous sommes une communauté chrétienne dédiée à vivre et à partager l'amour du Christ
              à travers l'unité, la charité et la sainteté.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Unité",
                description: "Nous croyons en la force de l'unité dans la diversité",
                image: "https://i.ibb.co/Z6KB9nY/Whats-App-Image-2025-01-26-at-15-06-21-1.jpg"
              },
              {
                icon: Heart,
                title: "Charité",
                description: "L'amour du Christ nous pousse à servir notre prochain",
                image: "https://i.ibb.co/cDrFJ11/Whats-App-Image-2025-01-26-at-15-06-21.jpg"
              },
              {
                icon: Bible,
                title: "Sainteté",
                description: "Nous aspirons à une vie transformée par la grâce de Dieu",
                image: "https://i.ibb.co/h14Dc25/Whats-App-Image-2025-01-26-at-15-06-20-6.jpg"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 rounded-xl" />
                <div
                  className="relative bg-cover bg-center h-96 rounded-xl overflow-hidden"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <item.icon className="h-12 w-12 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-200">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div
              variants={fadeInUp}
              className="relative h-[600px] rounded-xl overflow-hidden"
            >
              <img
                src="https://i.ibb.co/4YtvJFG/Whats-App-Image-2025-01-26-at-15-06-21-2.jpg"
                alt="Worship"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-8">
              <h2 className="text-4xl font-bold text-gray-900">
                Une Communauté Vivante
              </h2>
              <p className="text-xl text-gray-600">
                Rejoignez une communauté dynamique où chacun peut grandir dans sa foi
                et développer des relations authentiques.
              </p>
              <div className="space-y-4">
                {[
                  "Cultes inspirants et contemporains",
                  "Groupes de maison chaleureux",
                  "Programmes pour tous les âges",
                  "Engagement social actif"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 bg-blue-900 text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0.3 }}
          whileInView={{ opacity: 0.6 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1445025526996-91f25e87b228?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80')"
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Rejoignez Notre Communauté
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Venez découvrir une communauté accueillante et vivante, où chacun peut
              grandir dans sa foi et son service pour Dieu.
            </p>
            <div className="space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Nos Services
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
              >
                Contactez-nous
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;