import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

const Graph = () => {
  const [commitData, setCommitData] = useState(null);
  const { username, repoName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/stats/commit_activity`);
        if (!response.ok) {
          throw new Error('Failed to fetch commit data');
        }
        const data = await response.json();
        setCommitData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [username, repoName]);

  if (!commitData) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: commitData.map(commit => new Date(commit.week * 1000).toLocaleDateString()),
    datasets: [
      {
        label: 'Commits',
        data: commitData.map(commit => commit.total),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>Commit Graph for {username}/{repoName}</h2>
      <Line data={chartData} />
    </div>
  );
};

export default Graph;
