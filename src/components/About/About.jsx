import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Text, Link, Input, Select, Grid, GridItem } from '@chakra-ui/react';

function About() {
  const { username } = useParams();
  const [userData, setUserData] = useState({});
  const [repos, setRepos] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (!username) return;

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });

    fetch(`https://api.github.com/users/${username}/repos`)
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
      });
  }, [username]);

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

  const handleSearch = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchText)
  );

  return (
    <Box maxW="container.xl" mx="auto" p="4">
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
              <Link href={repo.html_url} color="blue.500" fontWeight="semibold" fontSize="lg">{repo.name}</Link>
              <Text color="gray.600" fontSize="sm">{repo.description}</Text>
              <Text fontSize="sm">Stars: {repo.stargazers_count}</Text>
              <Text fontSize="sm">Forks: {repo.forks_count}</Text>
              <Text fontSize="sm">Open Issues: {repo.open_issues_count}</Text>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default About;
