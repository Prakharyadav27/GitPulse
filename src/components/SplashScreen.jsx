import React from 'react';

const SplashScreen = () => {
  return (
    <div className=" fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
      <div className="animate-bounce">
        <img
          className="object-cover  w-23 h-23 md:w-32 md:h-32 lg:w-48 lg:h-48" // Adjust sizes as needed
          src="src/assets/Logo.png"
          alt="Git Analytics Logo"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
