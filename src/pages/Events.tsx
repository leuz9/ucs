import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import EventHero from '../components/events/EventHero';
import EventList from '../components/events/EventList';
import NewsletterCTA from '../components/events/NewsletterCTA';
import { Event } from '../types/events';

function Events() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const q = query(collection(db, 'events'), orderBy('date', 'asc'));
      const snapshot = await getDocs(q);
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Event[];
      
      setEvents(eventsData);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EventHero />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EventList events={events} />
        </div>
      </section>

      <NewsletterCTA />
    </div>
  );
}

export default Events;