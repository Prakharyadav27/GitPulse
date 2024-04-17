import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Divider,
  VStack,
  Tag,
  Link,
  Code,
  Flex,
  Button,
  useColorModeValue,
  Avatar,
  Spinner,
} from '@chakra-ui/react';

const authToken = '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'; // Replace 'your_auth_token_here' with your actual GitHub personal access token

function ViewRepo({ username, repoName }) {
  const [readme, setReadme] = useState('');
  const [commits, setCommits] = useState([]);
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/readme`, {
          headers: {
            Authorization: `token ${authToken}`,
          },
        });
        const data = await response.json();
        const decodedContent = atob(data.content);
        setReadme(decodedContent);
      } catch (error) {
        console.error('Error fetching README:', error);
      }
    };

    const fetchCommits = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/commits`, {
          headers: {
            Authorization: `token ${authToken}`,
          },
        });
        const data = await response.json();
        setCommits(data);
      } catch (error) {
        console.error('Error fetching commits:', error);
      }
    };

    const fetchIssues = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/issues`, {
          headers: {
            Authorization: `token ${authToken}`,
          },
        });
        const data = await response.json();
        setIssues(data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    Promise.all([fetchReadme(), fetchCommits(), fetchIssues()])
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [username, repoName]);

  const handleClick = (username, repoName) => {
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

  const InfoCard = ({ title, children }) => {
    return (
      <Box
        p="4"
        bg={useColorModeValue('white', 'gray.700')}
        borderRadius="lg"
        borderWidth="1px"
        boxShadow="sm"
        mt="4"
      >
        <Heading as="h3" size="md" mb="2">
          {title}
        </Heading>
        {children}
      </Box>
    );
  };

  const CommitItem = ({ commit }) => {
    return (
      <Box display="flex" alignItems="center" mb="2">
        <Avatar size="sm" name={commit.commit.author.name} src={commit.author?.avatar_url} />
        <VStack spacing={0} ml={2}>
          <Text fontWeight="bold">{commit.commit.author.name}</Text>
          <Text>{commit.commit.message}</Text>
        </VStack>
      </Box>
    );
  };

  const IssueItem = ({ issue }) => {
    return (
      <Box mb="4">
        <Heading as="h4" size="sm" mb="1">
          {issue.title}
        </Heading>
        <Text>{issue.body}</Text>
        {/* <Tag variant="solid" colorScheme="blue">
          {issue.labels.map(label => label.name).join(', ')}
        </Tag> */}
        <Button as={Link} href={issue.html_url} isExternal colorScheme="blue" mt="2">
          View Issue
        </Button>
      </Box>
    );
  };

  return (
    <Box p="6" bg={useColorModeValue('gray.100', 'gray.700')} borderWidth="1px" borderRadius="lg" overflowY="auto">
      <Heading as="h2" size="lg" mb="4">
        {repoName}
      </Heading>
      <Divider />
      <VStack spacing="4" mt="4">
        <InfoCard title="README">
          {isLoading ? (
            <Flex justifyContent="center" alignItems="center" minHeight="100px">
              <Spinner size="lg" />
            </Flex>
          ) : (
            <Code whiteSpace="pre-wrap" overflowWrap="break-word">
              {readme}
            </Code>
          )}
        </InfoCard>
        <InfoCard title="Recent Commits">
          {isLoading ? (
            <Flex justifyContent="center" alignItems="center" minHeight="100px">
              <Spinner size="lg" />
            </Flex>
          ) : (
            <VStack spacing="2">
              {commits.map(commit => (
                <CommitItem key={commit.sha} commit={commit} />
              ))}
            </VStack>
          )}
        </InfoCard>
        <InfoCard title="Open Issues">
          {isLoading ? (
            <Flex justifyContent="center" alignItems="center" minHeight="100px">
              <Spinner size="lg" />
            </Flex>
          ) : (
            <VStack spacing="2">
              {issues.map(issue => (
                <IssueItem key={issue.id} issue={issue} />
              ))}
            </VStack>
          )}
        </InfoCard>
        <Box mt="4">
          {/* <Button colorScheme="blue">View Repository</Button> */}
  
        </Box>
      </VStack>
    </Box>
  );
}

export default ViewRepo;
