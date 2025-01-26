import React from 'react';
import { Calendar } from 'lucide-react';
import EventCard from './EventCard';
import { Event } from '../../types/events';

interface EventListProps {
  events: Event[];
}

function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          Aucun événement à venir
        </h3>
        <p className="text-gray-600">
          Revenez bientôt pour découvrir nos prochains événements
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventList;