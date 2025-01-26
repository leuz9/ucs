import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="https://i.ibb.co/y40tRPm/ucs-logo.jpg"
                alt="UCS Logo"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400">
              Unité, Charité, Sainteté - Ensemble dans la foi et l'amour du Christ.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-white">
                  Événements
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Horaires des Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Dimanche: 10h00 - 12h00</li>
              <li>Mercredi: 18h30 - 20h00</li>
              <li>Vendredi: 19h00 - 21h00</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                123 Rue de l'Église, 75000 Paris
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                +33 1 23 45 67 89
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                contact@ucs-church.org
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} UCS Church. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;