import { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';

interface EventLayoutProps {
  children: ReactNode;
}

export function EventLayout({ children }: EventLayoutProps) {
  const { eventId } = useParams();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <div className="mr-6 flex items-center space-x-2">
              <Link className="link" to={`/event/${eventId}/producer`}>Event ID: {eventId}</Link>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-6">
        <div className="flex-1 space-y-4 p-8 pt-6">
          {children}
        </div>
      </main>
    </div>
  );
}
