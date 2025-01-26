import React from 'react';
import { motion } from 'framer-motion';

function PersonalityHero() {
  return (
    <section className="relative py-20 bg-blue-900 text-white">
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 0.6 }}
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
            Personnalités Marquantes
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-200">
            Les figures qui ont façonné l'histoire de l'Union du Clergé Sénégalais
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default PersonalityHero;