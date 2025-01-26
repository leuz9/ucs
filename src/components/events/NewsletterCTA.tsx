import React from 'react';

function NewsletterCTA() {
  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ne Manquez Aucun Événement
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Inscrivez-vous à notre newsletter pour être informé de tous nos événements à venir
        </p>
        <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
          S'inscrire à la Newsletter
        </button>
      </div>
    </section>
  );
}

export default NewsletterCTA;