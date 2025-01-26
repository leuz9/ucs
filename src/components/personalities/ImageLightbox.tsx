import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  image: string;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

function ImageLightbox({ image, onClose, onPrevious, onNext, isFirst, isLast }: ImageLightboxProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/75 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative">
            <img
              src={image}
              alt=""
              className="max-h-[90vh] w-auto mx-auto"
            />

            {!isFirst && (
              <button
                onClick={onPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/75 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            {!isLast && (
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/75 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ImageLightbox;