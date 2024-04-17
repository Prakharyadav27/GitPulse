import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

function Contributor() {
  const location = useLocation();
  if (!location.state) {
    return <div>Error: Location state is not available</div>;
  }
  const { username, repoName } = location.state;
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/contributors`);
        if (!response.ok) {
          throw new Error('Failed to fetch contributors');
        }
        const data = await response.json();
        setContributors(data);
      } catch (error) {
        console.error('Error fetching contributors:', error);
      }
    };
    fetchContributors();
  }, [username, repoName]);

  return (
    <div className='m-10'>
      <h1 className='font-bold text-4xl'>Contributors for {username}/{repoName}</h1>
      <div className='m-10 border-double border-4 border-black shadow-2xl'>
        {contributors.map(contributor => (
          <div key={contributor.id} className='flex justify-between items-center border-b-2 p-2'>
            <div>
              <h1 className='font-bold text-lg'>{contributor.login}</h1>
              <p>{contributor.contributions} contributions</p>
            </div>
            <div>
              <Link
                to={contributor.login ? `/about/${contributor.login}` : '#'}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full max-w-md ${!contributor.login && 'pointer-events-none'}`}
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contributor;
