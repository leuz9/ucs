import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EventManager from './EventManager';
import PrayerRequests from './PrayerRequests';
import NewsletterSubscribers from './NewsletterSubscribers';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
            <nav className="bg-white shadow rounded-lg mb-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <Link
                      to="/admin/events"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-700"
                    >
                      Événements
                    </Link>
                    <Link
                      to="/admin/prayers"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-700"
                    >
                      Demandes de Prière
                    </Link>
                    <Link
                      to="/admin/newsletter"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-700"
                    >
                      Abonnés Newsletter
                    </Link>
                  </div>
                </div>
              </div>
            </nav>

            <Routes>
              <Route path="events" element={<EventManager />} />
              <Route path="prayers" element={<PrayerRequests />} />
              <Route path="newsletter" element={<NewsletterSubscribers />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;