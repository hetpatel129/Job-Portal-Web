const Loader = ({ message = "Loading, this won’t take long..." }) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-2">
      {/* Bouncing Dots Animation */}
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            className="w-3 h-3 bg-purple-700 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></span>
        ))}
      </div>
      {/* Loading Message */}
      <p className="text-gray-700 text-md font-medium">{message}</p>
    </div>
  );
};

export default Loader;
