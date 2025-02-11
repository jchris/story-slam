import { Link, Outlet } from 'react-router-dom';

export function TopLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto px-4 flex h-16 items-center">
          <div className="flex w-full">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold tracking-tight">
                <Link to="/">
                  Story Judging
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4">
        <main className="py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
