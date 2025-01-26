import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

function NewsletterSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    try {
      const response = await axios.get('/api/newsletter/subscribers');
      setSubscribers(response.data);
    } catch (error) {
      console.error('Error loading subscribers:', error);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Abonnés Newsletter
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Liste des personnes inscrites à la newsletter
        </p>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {subscribers.map((subscriber) => (
            <li key={subscriber._id} className="px-4 py-4 sm:px-6">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-900">{subscriber.email}</p>
                <p className="text-sm text-gray-500">
                  {new Date(subscriber.createdAt).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NewsletterSubscribers;