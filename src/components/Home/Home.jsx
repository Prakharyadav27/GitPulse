import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

export default function Home() {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const handleInputChange = (e) => {
    setUsername(e.target.value);
    setErrorMessage(''); 
  };

  const handleSubmit = () => {
    if (!username) {
      setErrorMessage('Please enter a GitHub username.');
      return;
    }

   
    return <Link to={`/about/${username}`}>View About</Link>; 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-8 py-12">
      <img className='h-60 w-60 bg-blend-multiply' src = "src\assets\Logo.png" alt="" srcset="" />
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to GitPulse</h1>
      <p className="text-lg text-center text-gray-700 mb-8 leading-relaxed">
        GitPulse is your all-in-one analytics board for GitHub. It offers detailed insights into your repositories and activities, empowering you to monitor performance metrics, analyze user interactions, and enhance your development workflow.
      </p>
      <input
        type="text"
        placeholder="Enter GitHub Username"
        className="bg-white w-full max-w-md p-3 rounded-lg mb-4 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={username}
        onChange={handleInputChange}
      />
      {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full max-w-md"
      >
        Get Started
      </button>
    </div>
  );
}
