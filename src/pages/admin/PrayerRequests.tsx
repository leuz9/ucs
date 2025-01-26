import React, { useState, useEffect } from 'react';
import { getPrayers } from '../../api/prayers';
import { Prayer } from '../../types';

function PrayerRequests() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);

  useEffect(() => {
    loadPrayers();
  }, []);

  const loadPrayers = async () => {
    try {
      const data = await getPrayers();
      setPrayers(data);
    } catch (error) {
      console.error('Error loading prayers:', error);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Demandes de Prière
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {prayers.map((prayer) => (
            <li key={prayer._id} className="px-4 py-4 sm:px-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-900">{prayer.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(prayer.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm text-gray-600">{prayer.request}</p>
                <p className="text-sm text-gray-500">{prayer.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PrayerRequests;