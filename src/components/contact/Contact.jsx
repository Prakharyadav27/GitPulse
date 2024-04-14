import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

export default function Contact() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [telephoneError, setTelephoneError] = useState(false);

  const handleSubmit = () => {
    if (!fullName.trim()) {
      setFullNameError(true);
    } else {
      setFullNameError(false);
    }

    if (!email.trim()) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (!telephone.trim()) {
      setTelephoneError(true);
    } else {
      setTelephoneError(false);
    }

    // Submit logic here (e.g., sending the form data to a server)
  };

  return (
    <Box p="8">
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
        gap={8}
        maxW="6xl"
        mx="auto"
        px={{ base: '4', md: '6', lg: '8' }}
      >
        <GridItem>
          <Box bg="gray.100" rounded="lg" p="6">
            <Heading size="xl" mb="4" color="gray.800">
              Get in touch:
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Fill in the form to start a conversation
            </Text>

            <Box mt="8">
              <Text color="gray.600" display="flex" alignItems="center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-12 h-14 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <Text ml="3" fontSize="md" fontWeight="semibold" w="50">
                  G.L.A. University, 17km Stone, NH-2, Mathura-Delhi Road, P.O. Chaumuhan, Mathura, Uttar Pradesh, India.
                </Text>
              </Text>

              <Text color="gray.600" display="flex" alignItems="center" mt="4">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <Text ml="4" fontSize="md" fontWeight="semibold" w="40">
                  +91 78170 60961
                </Text>
              </Text>

              <Text color="gray.600" display="flex" alignItems="center" mt="4">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <Text ml="10" fontSize="md" fontWeight="semibold" w="50">
                  Yprakher4@gmail.com
                </Text>
              </Text>
            </Box>
          </Box>
        </GridItem>
        <GridItem>
          <Box bg="white" rounded="lg" p="6">
            <FormControl isInvalid={fullNameError} mt="4">
              <FormLabel htmlFor="name">Full Name</FormLabel>
              <Input
                type="text"
                id="name"
                placeholder="Full Name"
                variant="filled"
                mt="2"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormControl>

            <FormControl isInvalid={emailError} mt="4">
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                variant="filled"
                mt="2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl isInvalid={telephoneError} mt="4">
              <FormLabel htmlFor="tel">Telephone Number</FormLabel>
              <Input
                type="tel"
                id="tel"
                placeholder="Telephone Number"
                variant="filled"
                mt="2"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </FormControl>

            <Button
              colorScheme="orange"
              mt="4"
              w="100%"
              onClick={handleSubmit}
              _hover={{ bg: 'orange.600' }}
            >
              Submit
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}
