import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { subscribeToNewsletter } from '../api/newsletter';

interface NewsletterForm {
  email: string;
}

function Newsletter() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsletterForm>();
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: NewsletterForm) => {
    try {
      setLoading(true);
      const result = await subscribeToNewsletter(data.email);
      
      setStatus({
        type: result.success ? 'success' : 'error',
        message: result.message
      });

      if (result.success) {
        reset();
        // Réinitialiser le statut après 5 secondes
        setTimeout(() => {
          setStatus({ type: null, message: '' });
        }, 5000);
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Une erreur est survenue. Veuillez réessayer.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-blue-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Mail className="h-12 w-12 mx-auto mb-6 text-blue-300" />
            <h2 className="text-3xl font-bold mb-4">
              Restez Informé
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Inscrivez-vous à notre newsletter pour recevoir les dernières nouvelles et mises à jour
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-grow relative">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  {...register('email', {
                    required: 'L\'email est requis',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Adresse email invalide'
                    }
                  })}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border ${
                    errors.email ? 'border-red-400' : 'border-white/20'
                  } text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent`}
                  disabled={loading}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 top-full mt-1 text-sm text-red-400"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'S\'inscrire'
                )}
              </button>
            </div>

            <AnimatePresence>
              {status.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex items-center justify-center space-x-2 ${
                    status.type === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                  <span>{status.message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;