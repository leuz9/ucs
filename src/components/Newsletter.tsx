import React from 'react';
import { useForm } from 'react-hook-form';
import { subscribeToNewsletter } from '../api/newsletter';

function Newsletter() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data: { email: string }) => {
    try {
      await subscribeToNewsletter(data.email);
      reset();
      alert('Merci de votre inscription à notre newsletter!');
    } catch (error) {
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <section className="bg-blue-600 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Restez Connecté</h2>
          <p className="mb-8">Inscrivez-vous à notre newsletter pour recevoir les dernières nouvelles et mises à jour</p>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                {...register('email', { 
                  required: 'Email requis',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Adresse email invalide'
                  }
                })}
                placeholder="Votre adresse email"
                className="flex-grow px-4 py-2 rounded text-gray-900"
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-6 py-2 rounded font-semibold hover:bg-blue-50 transition-colors"
              >
                S'inscrire
              </button>
            </div>
            {errors.email && (
              <p className="text-red-200 mt-2">{errors.email.message as string}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;