'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
        <div className="max-w-md text-center">
          <h1 className="text-9xl font-bold text-blue-500 mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
          <p className="text-gray-400 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
          >
            Return to Homepage
          </Link>
        </div>
      </main>
  );
}