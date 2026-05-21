import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-max mx-auto text-center">
        <main className="sm:flex sm:items-center">
          {/* Visual 404 Anchor */}
          <p className="text-7xl font-extrabold text-blue-600 sm:text-8xl sm:tracking-tight">
            404
          </p>

          <div className="sm:ml-6 sm:border-l sm:border-gray-300 sm:pl-6 text-left">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
              Page not found
            </h1>
            <p className="mt-2 text-base text-gray-500">
              Please check the URL in the address bar and try again.
            </p>
          </div>
        </main>

        {/* Action Buttons */}
        <div className="mt-10 flex space-x-3 justify-center sm:border-l sm:border-transparent sm:pl-6">
          <Link
            href="/"
            className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
