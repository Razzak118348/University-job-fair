const Error = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
            <div className="text-center max-w-md">
                <h1 className="text-7xl font-bold text-red-600 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-6">
                    Sorry, the page you are looking for does not exist or has been moved.
                </p>
                <a
                    href="/"
                    className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
                >
                    Go to Homepage
                </a>
            </div>
        </div>
    );
};

export default Error;
