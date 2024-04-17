import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Image, Text, Link, Input, Select, Grid, GridItem, Button, Fade, Heading, Badge } from '@chakra-ui/react';
import ViewRepo from './ViewRepo'; // Import your ViewRepo component

function About() {
  const { username } = useParams();
  const [userData, setUserData] = useState({});
  const [repos, setRepos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const authToken = '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'; // Replace 'your_auth_token_here' with your actual GitHub personal access token

  useEffect(() => {
    if (!username) return;

    fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });

    fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `token ${authToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch repositories');
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format: repositories should be an array');
        }
        setRepos(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching repositories:', error);
        setLoading(false); // Set loading to false if there's an error
      });
  }, [username, authToken]);

  const sortRepos = (sortBy) => {
    const sortedRepos = [...repos].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'forks':
          return b.forks_count - a.forks_count;
        case 'open_issues':
          return b.open_issues_count - a.open_issues_count;
        default:
          return a.name.localeCompare(b.name);
      }
    });
    setRepos(sortedRepos);
  };

  const handleClick3 = (username, repoName) => {
    // Send multiple props using navigate
    navigate(`/Graph/${username}/${repoName}`, {
      state: {
        username: username,
        repoName: repoName,
        // Add more props as needed
      }
    });
  };


  const handleClick2 = (username, repoName) => {
    // Send multiple props using navigate
    navigate(`/Contributor/${username}/${repoName}`, {
      state: {
        username: username,
        repoName: repoName,
        // Add more props as needed
      }
    });
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchText)
  );

  function getProfileImprovementTips(userData) {
    const tips = [];

    // Tip 1: Add a profile picture
    if (!userData.avatar_url) {
      tips.push("Add a profile picture to make your profile more personal.");
    }

    // Tip 2: Write a bio
    if (!userData.bio) {
      tips.push("Write a bio to introduce yourself to others.");
    }

    // Tip 3: Add your location
    if (!userData.location) {
      tips.push("Add your location to let others know where you're based.");
    }

    // Tip 4: Link your blog or website
    if (!userData.blog) {
      tips.push("Link your blog or website to provide more information about yourself.");
    }

    // Tip 5: Follow and contribute to interesting repositories
    tips.push("Follow and contribute to interesting repositories to build your profile.");

    // Tip 6: Create a pinned repository
    if (userData.public_repos > 0) {
      tips.push("Create a pinned repository to showcase your best work on your profile.");
    }

    // Tip 7: Customize your profile with a README
    tips.push("Customize your profile with a README to provide an overview of your projects.");

    // Tip 8: Join GitHub organizations
    tips.push("Join GitHub organizations related to your interests to connect with like-minded individuals.");

    return tips;
  }

  const improvementTips = getProfileImprovementTips(userData);

  const handleClick = (repoName) => {
    setSelectedRepo(repoName); // Set the selected repository
  };

  return (
    <Box maxW="container.xl" mx="auto" p="4">
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Box textAlign="center" mb="8">
            <Image src={userData.avatar_url} alt="User Avatar" boxSize="150px" borderRadius="full" mx="auto" />
            <Text fontSize="3xl" fontWeight="bold" mt="4">{userData.name}</Text>
            <Text fontSize="lg" color="gray.600">{userData.bio}</Text>
            <Text fontSize="sm">Followers: {userData.followers} | Following: {userData.following}</Text>
            <Text fontSize="sm">Public Repositories: {userData.public_repos} | Location: {userData.location}</Text>
            {userData.blog && (
              <Text fontSize="sm">Website: <Link href={userData.blog} color="blue.500">{userData.blog}</Link></Text>
            )}
          </Box>
          <Fade in={improvementTips.length > 0}>
            <Box mt="4">
              <Heading as="h2" size="lg" mb="2">Profile Improvement Tips:</Heading>
              <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap="4">
                {improvementTips.map((tip, index) => (
                  <Fade key={index} in>
                    <Box p="3" borderWidth="1px" borderRadius="md" boxShadow="md">
                      <Badge variant="subtle" colorScheme="green" mb="2">Tip {index + 1}</Badge>
                      <Text>{tip}</Text>
                    </Box>
                  </Fade>
                ))}
              </Grid>
            </Box>
          </Fade>
          {selectedRepo ? (
            <ViewRepo username={username} repoName={selectedRepo} />
          ) : (
            <Box>
              <Text fontSize="xl" fontWeight="semibold">Repositories:</Text>
              <Input
                type="text"
                placeholder="Search Repositories"
                onChange={handleSearch}
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                p="2"
                mt="2"
                w="full"
                maxW="md"
                mx="auto"
              />
              <Select
                onChange={(e) => sortRepos(e.target.value)}
                mt="2"
                p="2"
                borderRadius="md"
                border="1px"
                borderColor="gray.300"
                w="full"
                maxW="md"
                mx="auto"
              >
                <option value="name">Sort by Name</option>
                <option value="stars">Sort by Stars</option>
                <option value="forks">Sort by Forks</option>
                <option value="open_issues">Sort by Open Issues</option>
              </Select>
              <Grid
                templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                gap="4"
                mt="4"
              >
                {filteredRepos.map((repo) => (
                  <GridItem
                    key={repo.id}
                    bg="white"
                    boxShadow="md"
                    p="4"
                    borderRadius="md"
                  >
                    <Text fontSize="xl">{repo.name}</Text>
                    <Text color="gray.600" fontSize="sm">{repo.description}</Text>
                    <Text fontSize="sm">Stars: {repo.stargazers_count}</Text>
                    <Text fontSize="sm">Forks: {repo.forks_count}</Text>
                    <Text fontSize="sm">Open Issues: {repo.open_issues_count}</Text>
               

                  <button className="bg-white text-black hover:bg-slate-400 font-bold text-md py-2 px-2 rounded-lg transition duration-300 ease-in-out border-dotted border-2 border-black m-2"  onClick={() => handleClick(repo.name)} >View repository</button>
                 
                    {/* <button className="bg-white text-black hover:bg-slate-400 font-bold text-md py-2 px-2 rounded-lg transition duration-300 ease-in-out border-dotted border-2 border-black m-2" onClick={() => handleClick3(username,repo.name)}>View Commit History</button> */}

                    <button className="bg-white text-black hover:bg-slate-400 font-bold text-md py-2 px-2 rounded-lg transition duration-300 ease-in-out border-dotted border-2 border-black m-2 " onClick={() => handleClick2(username,repo.name)}>View Contributors</button>
                  </GridItem>
                ))}
              </Grid>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}



export default About;
