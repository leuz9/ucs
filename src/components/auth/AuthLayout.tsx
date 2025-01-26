import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  linkText: string;
  linkTo: string;
}

export default function AuthLayout({ children, title, subtitle, linkText, linkTo }: AuthLayoutProps) {
  return (
    <div className="min-h-screen relative flex flex-col justify-center">
      {/* Vidéo d'arrière-plan */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover"
        >
          <source 
            src="https://cdn.pixabay.com/video/2020/09/08/49381-459436778_large.mp4" 
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <img 
              src="https://i.ibb.co/y40tRPm/ucs-logo.jpg"
              alt="UCS Logo"
              className="h-24 w-auto rounded-full bg-white p-2"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            {subtitle}{' '}
            <Link to={linkTo} className="font-medium text-blue-400 hover:text-blue-300">
              {linkText}
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/90 backdrop-blur-sm py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}