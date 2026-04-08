// src/components/NotFound.jsx

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Oops! Page Not Found</h2>
        <p className="mt-2 text-gray-500">
          The page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
