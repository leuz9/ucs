import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, Phone, MapPin, Users } from 'lucide-react';

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone?: string;
  diocese?: string;
  photo?: string;
}

// Données de test
const mockMembers: Member[] = [
  {
    id: '1',
    firstName: 'Jean',
    lastName: 'Diatta',
    role: 'Prêtre',
    email: 'jean.diatta@ucs.org',
    phone: '+221 77 123 45 67',
    diocese: 'Dakar',
    photo: 'https://i.ibb.co/y40tRPm/ucs-logo.jpg'
  },
  {
    id: '2',
    firstName: 'Pierre',
    lastName: 'Sambou',
    role: 'Prêtre',
    email: 'pierre.sambou@ucs.org',
    phone: '+221 77 234 56 78',
    diocese: 'Saint-Louis',
    photo: 'https://i.ibb.co/y40tRPm/ucs-logo.jpg'
  },
  // Ajoutez d'autres membres ici
];

function Directory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiocese, setSelectedDiocese] = useState<string>('');

  const dioceses = ['Dakar', 'Saint-Louis', 'Thiès', 'Ziguinchor', 'Kolda', 'Tambacounda', 'Kaolack'];

  const filteredMembers = mockMembers.filter(member => {
    const matchesSearch = 
      `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.diocese?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDiocese = !selectedDiocese || member.diocese === selectedDiocese;
    
    return matchesSearch && matchesDiocese;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-900 text-white">
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1548625149-fc4a29cf7092')"
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
            <Users className="h-16 w-16 mx-auto mb-6 text-blue-300" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Annuaire des Membres
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-300">
              Retrouvez tous les membres de l'Union du Clergé Sénégalais
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un membre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedDiocese}
              onChange={(e) => setSelectedDiocese(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tous les diocèses</option>
              {dioceses.map((diocese) => (
                <option key={diocese} value={diocese}>{diocese}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={`${member.firstName} ${member.lastName}`}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-xl">
                          {member.firstName[0]}{member.lastName[0]}
                        </span>
                      </div>
                    )}
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {member.firstName} {member.lastName}
                      </h3>
                      <p className="text-blue-600">{member.role}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {member.diocese && (
                      <p className="text-gray-600 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                        {member.diocese}
                      </p>
                    )}
                    <p className="text-gray-600 flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-gray-400" />
                      <a href={`mailto:${member.email}`} className="hover:text-blue-600">
                        {member.email}
                      </a>
                    </p>
                    {member.phone && (
                      <p className="text-gray-600 flex items-center">
                        <Phone className="h-5 w-5 mr-2 text-gray-400" />
                        <a href={`tel:${member.phone}`} className="hover:text-blue-600">
                          {member.phone}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Directory;