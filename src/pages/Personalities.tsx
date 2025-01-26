import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { personalities } from '../types/personalities';
import ImageLightbox from '../components/personalities/ImageLightbox';

function Personalities() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
  };

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => (prev !== null ? Math.max(0, prev - 1) : null));
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => 
      prev !== null ? Math.min(personalities.length - 1, prev + 1) : null
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-blue-900 text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1548625149-fc4a29cf7092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 to-blue-900/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Users className="h-16 w-16 mx-auto mb-6 text-blue-300" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Nos Personnalités Marquantes
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-300">
              Découvrez les visages qui ont façonné l'histoire de l'Union du Clergé Sénégalais à travers les années
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Un Héritage de Foi et de Service
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Ces hommes d'Église ont consacré leur vie au service de Dieu et de la communauté. 
              Leur dévouement et leur leadership ont contribué à bâtir et à renforcer l'Église au Sénégal.
            </p>
            <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {personalities.map((personality, index) => (
              <motion.div
                key={personality.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={personality.image}
                  alt=""
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedImageIndex !== null && (
        <ImageLightbox
          image={personalities[selectedImageIndex].image}
          onClose={handleClose}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isFirst={selectedImageIndex === 0}
          isLast={selectedImageIndex === personalities.length - 1}
        />
      )}
    </div>
  );
}

export default Personalities;