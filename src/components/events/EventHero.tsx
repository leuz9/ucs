import React from 'react';
import { motion } from 'framer-motion';

function EventHero() {
  return (
    <section className="relative py-20 bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Événements à Venir
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Découvrez nos prochains événements et rejoignez-nous pour des moments de partage et de communion
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default EventHero;