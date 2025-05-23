import React from "react";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" className="p-4 text-center bg-red-100 border border-red-400 text-red-700 rounded">
      <h2 className="text-xl font-bold">Something went wrong</h2>
      <p className="my-2">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorFallback;
