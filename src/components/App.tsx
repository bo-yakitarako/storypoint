import React from 'react';
import { Box, ChakraProvider, Flex, Image } from '@chakra-ui/react';
import { NameDialog } from './NameDialog';
import { Form } from './Form';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <NameDialog />
      <Flex
        justifyContent="center"
        alignItems="center"
        width="100%"
        minHeight="100vh"
      >
        <Box>
          <Form />
        </Box>
      </Flex>
      <Image
        alt="かわいいかわいいGopherくんかわいいねえかわいいよ"
        src="/images/gopher.png"
        position="fixed"
        bottom="0"
        right="-200px"
        width="600px"
        zIndex="-1"
      />
    </ChakraProvider>
  );
};

export { App };
