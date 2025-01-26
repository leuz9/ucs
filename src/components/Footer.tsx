import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram, Clock } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img 
                src="https://i.ibb.co/y40tRPm/ucs-logo.jpg"
                alt="UCS Logo"
                className="h-16 w-auto rounded-full bg-white p-1"
              />
            </div>
            <p className="text-gray-400 text-sm">
              L'Union du Clergé Sénégalais (UCS) est une association de prêtres diocésains du Sénégal, 
              fondée en 1973 pour promouvoir l'unité, la charité et la sainteté.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Navigation</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-white transition-colors">
                  Événements
                </Link>
              </li>
              <li>
                <Link to="/personalities" className="text-gray-400 hover:text-white transition-colors">
                  Personnalités
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Hours */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Horaires des Services</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-400">
                <Clock className="h-5 w-5 mr-3 text-blue-400" />
                <div>
                  <p className="font-medium">Dimanche</p>
                  <p className="text-sm">10h00 - 12h00</p>
                </div>
              </li>
              <li className="flex items-center text-gray-400">
                <Clock className="h-5 w-5 mr-3 text-blue-400" />
                <div>
                  <p className="font-medium">Mercredi</p>
                  <p className="text-sm">18h30 - 20h00</p>
                </div>
              </li>
              <li className="flex items-center text-gray-400">
                <Clock className="h-5 w-5 mr-3 text-blue-400" />
                <div>
                  <p className="font-medium">Vendredi</p>
                  <p className="text-sm">19h00 - 21h00</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-400">
                <MapPin className="h-5 w-5 mr-3 mt-1 text-blue-400" />
                <span>123 Rue de l'Église<br />75000 Paris, Sénégal</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-3 text-blue-400" />
                <span>+221 33 123 45 67</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-3 text-blue-400" />
                <a href="mailto:contact@ucs-church.org" className="hover:text-white transition-colors">
                  contact@ucs-church.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Union du Clergé Sénégalais. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;